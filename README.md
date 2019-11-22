# EMS (Entry Mangement Software

Web app to manage visitors entry. Powered by ExpressJs.

## Instructions to Run server
Requires [MongoDB](https://www.mongodb.com/download-center/community) Installed

Run MongoDB server on port 27017; (It's maybe the default port number)
```sh
$ git clone https://github.com/sanket143/EMS.git
$ cd EMS
$ npm install
$ npm start # visit http://localhost:3000 in your browser
```

## Features

* Keeps a record of visitors who checks in and out with proper timestamp.
* Stores data in MongoDB.
* Gives updates using mails.
* Keeps track of all visitors and their activity and info.
