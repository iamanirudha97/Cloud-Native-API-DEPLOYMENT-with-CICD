#!/bin/bash
sudo dnf update -y
sudo dnf module enable nodejs:20 -y
sudo dnf install nodejs -y
sudo dnf install expect -y
# sudo dnf module enable postgresql:12 -y
# sudo dnf install postgresql-server -y
# sudo postgresql-setup --initdb
# sudo systemctl start postgresql
# sudo systemctl enable postgresql
