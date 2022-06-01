#!/usr/bin/env node

const axios = require('axios');

const DEFAULTS = {
	timeout: 15000,
    ip: 0000,
    port: 30120,
};

class fivemServer {
    constructor(ip, options) {
        
        if (!ip) {
            throw new Error('No IP address provided');
        }
        
        this.ip = ip || DEFAULTS.ip;
        this.port = options.port || DEFAULTS.port;
        this.options = Object.assign({}, DEFAULTS, options);
    }

    getServerStatus() {
        return new Promise((send, err) => {
            axios
                .get(`http://${this.ip}:${this.port}/info.json`, { timeout: this.options.timeout })
                .then(function(body) {
                    let server_status = {
                        online: true,
                    }
                    send(server_status);
                })
                .catch(function(error) {
                    let server_status = {
                        online: false,
                        url: error.config.url,
                        method: error.config.method
                    }
                    if (error.response == undefined) send(server_status)
                });
        });
    }

    getPlayerAmount() {
        return new Promise((send, err) => {
            axios
                .get(`http://${this.ip}:${this.port}/players.json`, { timeout: this.options.timeout })
                .then(function(body) {
                    let players = body.data;
                    send(players.length);
                })
                .catch(function(error) {
                    err(error);
                });
        });
    }	
}

module.exports.fivemServer = fivemServer;