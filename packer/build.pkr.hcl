build {
  name    = "packer-build"
  sources = ["source.googlecompute.centOS"]

  provisioner "file" {
    source      = "../webapp.zip"
    destination = "/tmp/webapp.zip"
  }

  provisioner "shell" {
    inline = [
      "sudo sed -i 's/^SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config",
      "sudo sed -i 's/^SELINUX=permissive/SELINUX=disabled/g' /etc/selinux/config",
      "sudo setenforce 0",
      "sudo groupadd csye6225",
      "sudo useradd -m -s /usr/sbin/nologin -g csye6225 csye6225",
    ]
  }

  provisioner "file" {
    source      = "./csye6225.service"
    destination = "/tmp/csye6225.service"
  }

  // provisioner "shell" {
  //   script = "./systemd.sh"
  // }

  provisioner "shell" {
    script = "./initial.sh"
  }

  // provisioner "file" {
  //   source      = "./pg_user_setup.exp"
  //   destination = "/tmp/pg_user_setup.exp"
  // }

  provisioner "shell" {
    script = "./unzip_script.sh"
  }

  provisioner "shell" {
    inline = [
      "sudo mv -f /tmp/csye6225.service /etc/systemd/system/csye6225.service",
      "sudo chown -R csye6225:csye6225 /home/prodApp/ /etc/systemd/system/csye6225.service",
      "ls -al",
      "sudo systemctl daemon-reload",
      "sudo systemctl enable csye6225.service"
    ]
  }

  provisioner "shell" {
    script = "./ops_Agent_installation.sh"
  }

  provisioner "file" {
    source      = "./config.yaml"
    destination = "/tmp/config.yaml"
  }

  provisioner "shell" {
    script = "./ops_Agent_vm_config.sh"
  }

  post-processor "manifest" {
    output     = "manifest.json"
    strip_path = true
  }

  // provisioner "shell" {
  //   inline = [
  //     "cd /tmp/",
  //     "ls -al",
  //     "pwd",
  //     "sudo chmod +x pg_user_setup.exp",
  //     "sudo expect pg_user_setup.exp ${var.pg_password}",
  //     "cd -",
  //     "sudo systemctl restart postgresql",
  //     "sudo setenforce 0"
  //   ]
  // }

  // provisioner "file" {
  //   source      = "./pg_hba.conf"
  //   destination = "/tmp/pg_hba.conf"
  // }

  // provisioner "shell" {
  //   inline = [
  //     "sudo mv -f /var/lib/pgsql/data/pg_hba.conf /var/lib/pgsql/data/pg_hba.conf.bak",
  //     "sudo mv -f /tmp/pg_hba.conf /var/lib/pgsql/data/pg_hba.conf",
  //     "sudo cat /var/lib/pgsql/data/pg_hba.conf",
  //     "sudo systemctl restart postgresql"
  //   ]
  // }

  // provisioner "shell" {
  //   script = "../bootstrap.sh"
  // }

  // provisioner "shell" {
  //   inline = [
  //     "sudo systemctl daemon-reload",
  //     "sudo systemctl enable csye6225.service"
  //     "sudo systemctl start csye6225.service",
  //     "sudo systemctl status csye6225.service",
  //     "journalctl -u csye6225.service"
  //   ]
  // }
}