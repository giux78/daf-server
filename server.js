'use strict';

const Hapi = require('hapi');
const Path = require('path');

const server = Hapi.server({
    port: 4000,
    host: 'localhost',
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'public')
        },
	cors: {
	    origin: ['*'],
            credentials: true
	}
    }
});

const start = async () => {

    await server.register(require('inert'));

    server.route({
        method: 'GET',
        path: '/mappa/menu',
        handler: function (request, h) {
            return {'hello' : "ale" }//h.file('menu.json');
        }
    });

    server.route({
	method: 'GET',
	path: '/mappa/{city}/{file}',
	handler: function (request, h) {
	    return h.file(Path.join(request.params.city, request.params.file));
	}
    });

    await server.start();

    console.log('Server running at: ', server.info.uri);
};

start();
