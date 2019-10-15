/*
const express = require('express');
const routes = require('./routes');
*/
// If you install the dependence sucrase and nodemon, you can change the syntax of module importantion
import express from 'express';
import routes  from './routes';

class App {
	constructor() {
		this.server = express();
		this.middlewares();
		this.routes();
	}

	middlewares() {
		this.server.use(express.json());
	}

	routes() {
		this.server.use(routes);
	}
}

// module.exports = new App().server;
// If you install the dependence sucrase and nodemon, you can change the syntax of module exportation
export default new App().server;
