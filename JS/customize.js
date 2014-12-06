/**
 *
 * customizeJS by Stephan Detje
 *
 * dependencies
 *      - jss       /included
 *
 * @param config
 **/

//var jss = require("jss")

var customize = function(config){

    var defaultColorScheme = [{
        'background-color': 'white',
        'color': 'black'
    }, {
        'background-color': 'black',
        'color': 'white'
    }]

    this.setConfig = function (config) {

    }

    this.setDefaultColorSchemeForClass = function(c1, c2){
        jss.set("." + c1, defaultColorScheme[0])

        if(typeof c2 != 'undefined')
            jss.set("." + c2, defaultColorScheme[1])
    }


    this.setConfig(config)

    return this
}

//module.exports = customize;