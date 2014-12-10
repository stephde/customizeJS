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
        watchedClasses = [],
        currentClass = 0

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

        $(".sp-replacer.sp-light").addClass("cm-colorPicker")
    }

    function initCustomize(){
        var container,
            dialog

        //check if dom has already bin initialized
        if($("#cm-container").length < 1) {
            //add container
            container = $('<div>', {
                id: "cm-container"
            })
            $("body").append(container)
            //add logo
            container.append($('<img>', {
                src: "img/logo.svg",
                alt: "customizeJS logo",
                onclick: "toggleCustomizeDialog()" //ToDo: adjust method call using events
            }).addClass("cm-logo"))

            //add dialog container
            dialog = ($('<div>', {
                id: "cm-dialog"
            }).addClass("cm-inactive"))
            container.append(dialog)

            var dialogHeader = $('<div>', {}).addClass("cm-dialogHeader")
            dialog.append(dialogHeader)

            dialogHeader.append($('<div>', {}).addClass("cm-arrowLeft"))
            dialogHeader.append($('<div>', {
                text: ""
            }).addClass("cm-currentClass"))
            dialogHeader.append($('<div>', {}).addClass("cm-arrowRight"))

            //add color Pickers
            var pc = $('<div>', {}).addClass("cm-colorPickerContainer")
            dialog.append(pc)
            pc.append($('<div>', {
                text: "Font Color"
            }).addClass("cm-colorPickerTitle"))
            pc.append($('<input>', {
                id: "cm-fontColorPicker",
                type: "text",
                value: colorScheme[0]['color']
            }).addClass("cm-colorPicker"))

            pc = $('<div>', {}).addClass("cm-colorPickerContainer")
            dialog.append(pc)
            pc.append($('<div>', {
                text: "Background Color"
            }).addClass("cm-colorPickerTitle"))
            pc.append($('<input>', {
                id: "cm-bgColorPicker",
                type: "text",
                value: colorScheme[0]['background-color']
            }).addClass("cm-colorPicker"))
        }

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

        //set class name in dialog
        if(classes.length > 0)
            $(document).ready(function(){
                $(".cm-currentClass").text(classes[0])
            })

        arr.forEach(function(elem){
            watchedClasses.push(elem)
        })

        return this
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

        updateColorScheme()

        return this
    }

    this.getColorScheme = function(){
        var scheme = []

        colorScheme.forEach(function(elem){
            scheme.push([elem['background-color'], elem['color']])
        })

        return scheme
    }

    this.setCurrentClass = function(index){
        if(index > 0 && index < watchedClasses.length) {
            //set name in dialogHeader
            $(".cm-currentClass").first().text(watchedClasses[index])
            currentClass = index

            //set color in ColorPickers
            $("#cm-fontColorPicker").spectrum("set", colorScheme[index]['color'])
            $("#cm-bgColorPicker").spectrum("set", colorScheme[index]['background-color'])
            //set other dialog properties
        }else{
            console.log("trying to set invalid index for currentclass: " + index,
                        " maxindex: " + watchedClasses.length)
            return false
        }

        return this
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

        return this
    }

    /*** event handling ***/

    this.onNextClass = function(){
        if(currentClass < watchedClasses.length)
            this.setCurrentClass(currentClass + 1)
        else
            this.setCurrentClass(0)
    }
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