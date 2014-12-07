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

    /*** variables ***/

    var defaultColorScheme = [{
        'background-color': 'white',
        'color': 'black'
    }, {
        'background-color': 'black',
        'color': 'white'
    }],
        schemeDefined = false,
        colorScheme = []

    /*** config ***/

    this.setConfig = function (config) {
        if(typeof config.colorScheme != 'undefined'){
            config.colorScheme.forEach(function(arg){
                colorScheme.push({
                    'background-color': arg[0],
                    'color': arg[1]
                })
            })

            schemeDefined = true
        }
    }

    /*** customizing colors ***/

    this.setDefaultColorSchemeForClass = function(c1, c2){
        jss.set("." + c1, defaultColorScheme[0])
        if(typeof c2 != 'undefined')
            jss.set("." + c2, defaultColorScheme[1])

        return this
    }

    this.setColorSchemeForClass = function(classes){
        var scheme

        if(schemeDefined)
            scheme  = colorScheme
        else
            scheme = defaultColorScheme

        classes.forEach(function(arg, i){
            if(i < scheme.length)
                jss.set("." + arg, scheme[i])
            else {
                console.log("Not enough color schemes available to be set...")
                if(i > 0)
                    jss.set("." + arg, scheme[0])
            }
        })

        return this
    }


    this.setConfig(config)

    return this
}

//module.exports = customize;