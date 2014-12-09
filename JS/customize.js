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

var Customize = function(config){

    /*** variables ***/

    var defaultColorScheme = [  ['white','black'],
                                ['black','white']],
        colorScheme = [],
        watchedClasses = []

    /*** config ***/

    this.setConfig = function (config) {
        if(typeof(config) != 'undefined') {
            if (typeof(config.colorScheme) != 'undefined') {
                this.setColorScheme(config.colorScheme)
            }else
                this.setColorScheme()

            if (typeof(config.watchedClasses) != 'undefined') {
                this.setWatchedClasses(config.watchedClasses)
            }
        }else
            this.setColorScheme()

        return this
    }

    /*** init html and frameworks ***/

    function initSpectrum(){
        $(".cm-colorPicker").spectrum({
            color: "#f00",
            clickoutFiresChange: true,
            hide: function(color){
                $(".cm-dialog").addClass("cm-inactive")
            },
            change: function(color){
                colorScheme[0] = {
                    'background-color': $("#cm-fontColorPicker").spectrum("get").toHexString(),
                    'color': $("#cm-bgColorPicker").spectrum("get").toHexString()
                }
                colorScheme[1] = {
                    'background-color': $("#cm-bgColorPicker").spectrum("get").toHexString(),
                    'color': $("#cm-fontColorPicker").spectrum("get").toHexString()
                }

                updateColorScheme()
            }
        })
    }

    function initCustomize(){
        var container,
            dialog

        //add container
        container = $('<div>', {
            id: "cm-container"
        })
        $("body").append(container)
        //add logo
        container.append($('<img>', {
            src: "img/logo.svg",
            alt: "customizeJS logo",
            onclick: "toggleCustomizeDialog()" //ToDo: adjust method call
        }).addClass("cm-logo"))

        //add dialog container
        dialog = ($('<div>', {
            id: "cm-dialog"
        }).addClass("cm-inactive"))
        container.append(dialog)


        //add color Pickers
        dialog.append($('<input>', {
            id: "cm-fontColorPicker",
            type: "text"
        }).addClass("cm-colorPicker"))
        dialog.append($('<input>', {
            id: "cm-bgColorPicker",
            type: "text"
        }).addClass("cm-colorPicker"))

        initSpectrum()

        this.render()
    }

    /*** getter & setter ***/

    this.setWatchedClasses = function(classes){
        watchedClasses = []
        var arr = []

        if(!isArray(classes) && (classes.indexOf(" ") > -1))
            arr = classes.split(" ")
        else
            arr = classes

        arr.forEach(function(elem){
            watchedClasses.push(elem)
        })
    }

    this.getWatchedClasses = function(){
        return watchedClasses
    }

    this.setColorScheme = function(scheme){
        colorScheme = []

        //test if scheme is valid
        if(typeof(scheme) != 'undefined') {
            scheme.forEach(function (arg) {
                colorScheme.push({
                    'background-color': arg[0],
                    'color': arg[1]
                })
            })
        }else
            this.setColorScheme(defaultColorScheme)
    }

    this.getColorScheme = function(){
        var scheme = []

        colorScheme.forEach(function(elem){
            scheme.push([elem['background-color'], elem['color']])
        })

        return scheme
    }

    /*** customizing colors ***/

    function updateColorScheme(){
        watchedClasses.forEach(function(arg, i){
            if(i < colorScheme.length)
                jss.set("." + arg, colorScheme[i])
            else {
                console.log("Not enough color schemes available to be set...")
                if(i > 0)
                    jss.set("." + arg, colorScheme[0])
            }
        })
    }

    /*** render ***/

    this.render = function(){
        updateColorScheme()
    }

    /*** event handling ***/

    //currently in html...

    /*** common functions ***/

    function isArray(obj){
        return Object.prototype.toString.call(obj) === '[object Array]'
    }

    this.setConfig(config)

    initCustomize()

    return this
}

//module.exports = Customize;