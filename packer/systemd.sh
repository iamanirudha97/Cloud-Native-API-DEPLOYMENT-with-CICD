#!/bin/bash
# sudo groupadd csye6225
# echo "##################################1"
# sudo useradd -m -s /usr/sbin/nologin -g csye6225 csye6225
# echo "##################################2"
# sudo chown -R csye6225:csye6225 /tmp
echo "##################################3"
sudo mv -f /tmp/csye6225.service /etc/systemd/system/csye6225.service