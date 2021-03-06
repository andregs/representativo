#!/bin/bash
set -eux

if [ "${TRAVIS_PULL_REQUEST}" == "false" ] && [ $TRAVIS_BRANCH == 'master' ] ; then
  rm -rf .git
  cp package.json dist
  mkdir dist/script
  cp script/*.script.ts dist/script
  cp script/*.json dist/script
  cd dist
  echo "*.spec.js" > .gitignore
  echo "client" >> .gitignore
  echo "server/helpers" >> .gitignore
  echo "server/jasmine.js" >> .gitignore
  git init
  git remote add deploy "deploy@representativo.org:/var/www/representativo.org"
  git config user.name "Travis CI"
  git config user.email "andregs@users.noreply.github.com"
  git add .
  git commit -m "Deploy from Travis - build {$TRAVIS_BUILD_NUMBER}"
  git push --force deploy master
else
  echo "I don't deploy PRs or anything out of the master branch."
fi
