// détermine le chemin racine de l'app
var appRoot = require('app-root-path');

// pour gérer les logs
var winston = require('winston');


const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: `${appRoot}/monitoring/logactivitiy.log`,
            level: 'info'
        }),
        new winston.transports.File({
            filename: `${appRoot}/monitoring/logserror.log`,
            level: 'error'
        })
    ]
});


//créer un objet de flux avec une fonction 'write' qui sera utilisée par `morgan`
logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    },
};

module.exports = logger;