
### ssh -i "/Users/anirudha/.ssh/digitalOcecean" root@64.23.176.158 to login into vm
### scp -i "/Users/anirudha/.ssh/digitalOcecean" Anirudha_Dudhasagare_\ 002697516_02.zip 
### env root@164.92.111.157:/home to copy files from local to vm

### dnf install unzip

### POSTGRES INSTALATION
### dnf module list postgresql
### sudo dnf module enable postgresql:12
### sudo dnf install postgresql-server
 
### PG CLUSTER CREATION
### sudo postgresql-setup --initdb
### sudo systemctl start postgresql (use restart to restart the instance
### sudo systemctl enable postgresql)
 
### SWITCHING TO PG ACC
### sudo -i -u postgres
 
### CREATE PG USER 
### createuser --interactive --pwprompt --superuser
 
### Manual createUser
### man createuser
 
### NODE JS INSTALLATION
### sudo dnf module list nodejs
### sudo dnf module enable nodejs: 20
### sudo dnf install nodejs
### node --version