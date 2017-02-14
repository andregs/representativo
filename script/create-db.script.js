'use strict';

const config = require('../app-config');
const arangojs = require('arangojs');

const { rootpasswd, host, port, username, password } = config.arangodb;

const db = arangojs({
  url: `http://root:${rootpasswd}@${host}:${port}`
});

// data from http://www.tse.jus.br/eleicoes/estatisticas/repositorio-de-dados-eleitorais
const states = require('./states.json');
const cities = require('./cities.json');
const parties = require('./parties.json');

db.createDatabase("repres", [{ username, passwd: password }])
  .then(info => {
    db.useDatabase("repres");
    return db.graph('userGraph')
      .create({
        edgeDefinitions: [
          { from: ['user'], collection: 'liveIn', to: ['location'] },
        ]
      }
    );
  })
  .then(
    graph => db.graph(graph.name)
      .vertexCollection('user')
      .save({
        "_key": "admin",
        "email": "admin@example.com",
        "name": "Admin da Silva",
        "admin": true
      })
  )
  .then(
    doc => db.graph('qaGraph')
      .create({
        edgeDefinitions: [
          { from: ["user"], collection: "answer", to: ["question"] },
          { from: ["question"], collection: "questioner", to: ["user"] },
        ]
      })
  )
  .then(
    graph => db.graph('socialGraph')
      .create({
        edgeDefinitions: [
          { from: ["user"], collection: "follow", to: ["user"] },
        ]
      })
  )
  .then(
    graph => db.graph('worldGraph')
      .create({
        edgeDefinitions: [
          { from: ["location"], collection: "include", to: ["location"] },
        ]
      })
  )
  .then(
    graph => db.graph(graph.name)
      .vertexCollection('location')
      .save({ _key: 'BR', name: 'Brasil' })
  )
  .then(
    doc => db.graph('worldGraph')
      .vertexCollection('location')
      .import(states)
  )
  .then(res => {
    const vertexes = states.map(s => ({ _from: `location/BR`, _to: `location/${s._key}` }));
    return db.graph('worldGraph')
      .edgeCollection('include')
      .import(vertexes);
  })
  .then(res => {
    let cityId = 1;

    const promises = states.map(state => {
      const citiesOfState = cities
        .filter(city => city.uf === state._key)
        .map(c => ({ _key: `${cityId++}`, name: c.name }));

      return db.graph('worldGraph')
        .vertexCollection('location')
        .import(citiesOfState, { details: true })
        .then(res2 => {
          const edges = citiesOfState.map(
            city => ({ _from: `location/${state._key}`, _to: `location/${city._key}` })
          );
          return db.graph('worldGraph')
            .edgeCollection('include')
            .import(edges, { details: true });
        });
    });

    return Promise.all(promises);
  })
  .then(
    res => db.graph('partyGraph')
      .create({
        edgeDefinitions: [
          { from: ["party"], collection: "member", to: ["user"] },
          { from: ["user"], collection: "candidate", to: ["location"] },
        ]
      })
  )
  .then(graph => db.graph(graph.name).vertexCollection('party').import(parties))
  .then(res => {
    const members = parties.map(
      p => ({ _from: `party/${p._key}`, _to: `user/admin`, admin: true })
    );
    return db.graph('partyGraph').edgeCollection('member').import(members);
  });
