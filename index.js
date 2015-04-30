;(function () {
    'use strict';
	
	var fs = require('fs');
	var path = require('path');
	var _ = require('lodash');

    module.exports = function(environment, configsFolder){
    //default value for environment
    if (typeof environment === 'undefined') {
        environment = 'development';
    }

    //default value for configsFolder
    if (typeof configsFolder === 'undefined') {
        configsFolder = './configs';
    }

    if(!fs.existsSync(configsFolder)){
        var msg = 'configsFolder ' + configsFolder + ' not found or does not exists';
        console.log(msg);
        return new Error(msg);
    }

    if(!fs.existsSync(path.join(configsFolder, environment + '.js'))){
        var msg = 'environment file not found for ' + environment;
        console.log(msg);
        return new Error(msg);
    }

    var mergedEnvs = _.merge(
      require(path.join(configsFolder, 'global')),
      require(path.join(configsFolder, environment))
    );

    return mergedEnvs;
    };

}());

