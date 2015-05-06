;(function () {
    'use strict';
	
	var fs = require('fs');
	var path = require('path');
    var util = require('util');
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
        return new Error(util.format('configsFolder %s not found or does not exists', configsFolder));
    }

    if(!fs.existsSync(path.join(configsFolder,  'global.js'))){
        return new Error(util.format('global.js environment file not found'));
    }

    if(!fs.existsSync(path.join(configsFolder, environment + '.js'))){
        return new Error(util.format('environment file not found for %s', environment));
    }

    var mergedEnvs = _.merge(
      require(path.join(configsFolder, 'global')),
      require(path.join(configsFolder, environment))
    );

    return mergedEnvs;
    };

}());

