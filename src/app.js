const express = require('express')
const Router = require('./api/routes/router.js')

class API{
    constructor(){
        this.app = express();
        this.port = 80;

        this.app.use('/', new Router());

        this.app.listen(this.port);
    }
}

new API();