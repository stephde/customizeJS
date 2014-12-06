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
    }],
       schemeDefined = false

    this.setConfig = function (config) {
        if(typeof config.colorScheme != 'undefined'){
            this.colorScheme = config.colorScheme
            schemeDefined = true
        }
    }

    this.setDefaultColorSchemeForClass = function(c1, c2){
        var scheme

        if(schemeDefined)
            scheme  = colorScheme
        else
            scheme = defaultColorScheme


        jss.set("." + c1, scheme[0])
        if(typeof c2 != 'undefined')
            jss.set("." + c2, scheme[1])

        return this
    }


    this.setConfig(config)

    return this
}

//module.exports = customize;