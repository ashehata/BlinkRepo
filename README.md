Simple Webapp to upload/download file(s)

Development/Debug:
```
curl https://install.meteor.com/ | sh

git clone https://github.com/ashehata/BlinkRepo

cd BlinkRepo

meteor run
```

To build and run as NodeJs server:

Install mongodb (http://www.mongodb.org/downloads)

```
curl https://install.meteor.com/ | sh

git clone https://github.com/ashehata/BlinkRepo

cd BlinkRepo

meteor build ../

cd ..

tar -xf BlinkRepo.tar.gz 

cd bundle

(cd programs/server && npm install)

export MONGO_URL='mongodb://localhost:27017/meteor' 

export ROOT_URL='http://localhost:3000'

export PORT='3000'

node main.js
```

(Ensure latest version of node is installed)

