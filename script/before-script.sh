#!/bin/bash
set -eux

# Iniciando o X para nossos testes no browser
export DISPLAY=':99.0'
# Xvfb :99 -ac -screen 0 1280x1024x16 &
# /sbin/start-stop-daemon --start --quiet --pidfile /tmp/custom_xvfb_99.pid --make-pidfile --background --exec /usr/bin/Xvfb -- :99 -ac -screen 0 1280x1024x16
/sbin/start-stop-daemon --start --pidfile /tmp/custom_xvfb_99.pid --make-pidfile --background --exec /usr/bin/Xvfb -- :99 -ac -screen 0 1280x1024x16

# Criando o BD do app
npm run db:create
