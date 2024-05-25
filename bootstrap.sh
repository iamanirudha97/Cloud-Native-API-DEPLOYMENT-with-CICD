#!/bin/bash
cd /home/prodApp/ || exit
npm i
pwd
ls -al
node migrations.js