
/**
 * détermine le chemin racine de l'app
 */
var appRoot = require('app-root-path');

/**
 * Package pour pour gérer les logs
 */
var winston = require('winston');

/**
 * création des logs et  des erreurs dans les fichier spécifiés
 */
const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: `${appRoot}/monitoring/logs/activity.log`,
            level: 'info'
        }),
        new winston.transports.File({
            filename: `${appRoot}/monitoring/logs/error.log`,
            level: 'error'
        })
    ]
});

// @ts-ignore
/**
 * créer un objet de flux avec une fonction 'write' qui sera utilisée par le package 'morgan'
 */
logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    },
};

module.exports = logger;