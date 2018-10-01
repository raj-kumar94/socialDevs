```
"scripts": {
    "client-install": "npm install --prefix client",
    "start": "node server.js",
    "server": "nodemon server.js",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  }
```


`"client-install": "npm install --prefix client"` ==> go to client folder and run npm install


`"dev": "concurrently \"npm run server\" \"npm run client\""`  ==> run server and client script concurrently


# PropTypes

Any property you have in component, you should map it to PropTypes