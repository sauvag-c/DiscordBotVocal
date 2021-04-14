const { Connection } = require('./Connection');
const { Collection } = require('discord.js');

module.exports.ConnectionList = new class {
    constructor() {
        this.connections = new Collection();
        this.ontext = null;
    }

    getConnection(guild) {
        let ret = this.connections.get(guild);
        if (!ret) {
            ret = new Connection();
            ret.ontext = this.ontext;
            this.connections.set(guild, ret);
        }
        return ret;
    }
    
    disconnect(guild) {
        let connection = this.connections.get(guild);
        if (connection) {
            connection.disconnect();
            this.connections.delete(guild);
        }
    }
}