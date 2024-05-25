#!/bin/bash
sudo dnf install unzip -y
sudo mkdir -p /home/prodApp
sudo unzip /tmp/webapp.zip -d /home/prodApp/
cd /home/prodApp/ || exit
ls -al
pwd