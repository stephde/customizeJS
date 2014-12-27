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
        defaultBorderScheme = ['none', 'black', '0px'],
        defaultLogoPosition = {top: "15px", right: "15px"},
        defaultFontSize = "14px",
        colorScheme = [],
        borderScheme = [],
        watchedClasses = [],
        fontSizes = [],
        currentClass = 0,
        hideDialog = false

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

            if(typeof(config.borderScheme) != 'undefined') {
                this.setBorderScheme(config.borderScheme)
            }else
                this.setBorderScheme()

            if(typeof(config.hideDialog) != 'undefined') {
                hideDialog = config.hideDialog
            }

            if(typeof(config.logoPosition) != 'undefined') {
                this.setLogoPosition(config.logoPosition)
            }else
                this.setLogoPosition("top-right")

            if(typeof(config.fontSizes) != 'undefined') {
                this.setFontSizes(config.fontSizes)
            }

        }else {
            this.setColorScheme()
            this.setBorderScheme()
        }

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
                colorScheme[currentClass] = createColorCSS(
                    [$("#cm-bgColorPicker").spectrum("get").toHexString(),
                    $("#cm-fontColorPicker").spectrum("get").toHexString()]
                )

                if(currentClass < borderScheme.length )
                    if(borderScheme[currentClass]) {
                        borderScheme[currentClass]['border-color'] = $("#cm-borderColorPicker").spectrum("get").toHexString()
                    }

                updateColorScheme()
                updateBorderScheme()
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

            dialog.append(createDialogHeader())

            //add color Pickers
            dialog.append(createMenuItem("Font Color", $('<input>', {
                id: "cm-fontColorPicker",
                type: "text",
                value: colorScheme[0]['color']
            }).addClass("cm-colorPicker")))

            dialog.append(createMenuItem("Font Size", $('<input>',{
                id: "cm-fontSizeInput",
                type: "number",
                value: 14,
                min: 1,
                max: 100,
                onchange: "setFontSize(this)"
            }).addClass("cm-menuInput")))

            dialog.append(createMenuItem("Background Color", $('<input>', {
                id: "cm-bgColorPicker",
                type: "text",
                value: colorScheme[0]['background-color']
            }).addClass("cm-colorPicker")))

            var item = createMenuItem("Border Color")
            dialog.append(item)
            if(borderScheme.length > 0)
                item.append($('<input>', {
                    id: "cm-borderColorPicker",
                    type: "text",
                    value: borderScheme[0]['border-color'],
                    allowEmpty: true
                }).addClass("cm-colorPicker"))
            else
                item.append($('<input>', {
                    id: "cm-borderColorPicker",
                    type: "text",
                    allowEmpty: true
                }).addClass("cm-colorPicker"))

            dialog.append(createBorderStyleMenu())

            item = createMenuItem("Border Width")
            item.append($('<input>', {
                id: "cm-borderWidthInput",
                type: "number",
                value: 2,
                min: 1,
                max: 1000,
                onchange: "setBorderWidth(this)"
            }).addClass("cm-menuInput"))
            dialog.append(item)
        }

        initSpectrum()

        this.setCurrentClass(0)
        this.setHide(hideDialog)
        this.render()
    }

    function createDialogHeader(){
        var dialogHeader = $('<div>', {}).addClass("cm-dialogHeader")

        dialogHeader.append($('<div>', {
            onclick: "prevClass()"
        }).addClass("cm-arrowLeft"))
        dialogHeader.append($('<div>', {
            text: ""
        }).addClass("cm-currentClass"))
        dialogHeader.append($('<div>', {
            onclick: "nextClass()"
        }).addClass("cm-arrowRight"))

        return dialogHeader
    }

    function createMenuItem(name, child){
        var item = $('<div>', {}).addClass("cm-menuItemContainer")
        item.append($('<div>', {
            text: name
        }).addClass("cm-menuItemTitle"))

        if(typeof(child) != 'undefined' && !$.isEmptyObject(child))
            item.append(child)

        return item
    }

    function createBorderStyleMenu(){
        menu = $('<div>', {}).addClass("cm-menuItemContainer")

        menu.append($('<div>', {
            text: "Border Style",
            onclick: "toggleBorderStyleMenu()"
        })).addClass("cm-dropdownMenuTitle")

        borderStyleMenu = $('<ul>', {
            id: "cm-borderStyleMenu"
        }).addClass("cm-inactive")
        menu.append(borderStyleMenu)

        borderStyleMenu.append($('<li>', {
            text: "solid",
            onclick: "setBorderStyle(this)"
        }).addClass("cm-dropdownItem"))
        borderStyleMenu.append($('<li>', {
            text: "dashed",
            onclick: "setBorderStyle(this)"
        }).addClass("cm-dropdownItem"))
        borderStyleMenu.append($('<li>', {
            text: "dotted",
            onclick: "setBorderStyle(this)"
        }).addClass("cm-dropdownItem"))
        borderStyleMenu.append($('<li>', {
            text: "double",
            onclick: "setBorderStyle(this)"
        }).addClass("cm-dropdownItem"))
        borderStyleMenu.append($('<li>', {
            text: "groove",
            onclick: "setBorderStyle(this)"
        }).addClass("cm-dropdownItem"))
        borderStyleMenu.append($('<li>', {
            text: "inset",
            onclick: "setBorderStyle(this)"
        }).addClass("cm-dropdownItem"))
        borderStyleMenu.append($('<li>', {
            text: "ridge",
            onclick: "setBorderStyle(this)"
        }).addClass("cm-dropdownItem"))
        borderStyleMenu.append($('<li>', {
            text: "outset",
            onclick: "setBorderStyle(this)"
        }).addClass("cm-dropdownItem"))
        borderStyleMenu.append($('<li>', {
            text: "none",
            onclick: "setBorderStyle(this)"
        }).addClass("cm-dropdownItem"))

        return menu
    }

    /*** getter & setter ***/

    this.setWatchedClasses = function(classes){
        watchedClasses = []
        currentClass = 0
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
        if(typeof(scheme) != 'undefined' && isArray(scheme)) {
            scheme.forEach(function (arg) {
                colorScheme.push(createColorCSS([arg[0], arg[1]]))
            })
        }else
            this.setColorScheme(defaultColorScheme)

        updateColorScheme()

        return this
    }

    this.setColorSchemeForIndex = function(scheme, index){
        if(index >= 0 && index < colorScheme.length){
            if(isArray(scheme)){
                colorScheme[index] = createColorScheme(scheme)
            }
        }else{
            this.addColorScheme(scheme)
        }
    }

    this.addColorScheme = function(scheme){
        if(isArray(scheme) && scheme.length > 1)
            colorScheme.push(createColorCSS(scheme))
    }

    this.getColorScheme = function(){
        var scheme = []

        colorScheme.forEach(function(elem){
            scheme.push([elem['background-color'], elem['color']])
        })

        return scheme
    }

    this.setCurrentClass = function(index){
        if(index >= 0 && index < watchedClasses.length) {
            //set name in dialogHeader
            $(".cm-currentClass").first().text(watchedClasses[index])
            currentClass = index

            //set color in ColorPickers
            $("#cm-fontColorPicker").spectrum("set", colorScheme[index]['color'])
            $("#cm-bgColorPicker").spectrum("set", colorScheme[index]['background-color'])

            //set Border Properties
            if(index < borderScheme.length){
                $("#cm-borderColorPicker").spectrum("set", borderScheme[index]['border-color'])
                $("#cm-borderWidthInput").val(borderScheme[index]['border-width'].replace("px", ""))
            }
            //set Font Size
            if(index < fontSizes.length)
                $("#cm-fontSizeInput").val(fontSizes[index].replace("px",""))

        }else{
            console.log("trying to set invalid index for currentclass: " + index,
                        " maxindex: " + watchedClasses.length)
            return false
        }

        return this
    }

    this.setBorderScheme = function(scheme){
        borderScheme = []

        if(typeof(scheme) != 'undefined' && isArray(scheme)){
            scheme.forEach(function(arg){
                borderScheme.push(createBorderCSS(arg))
            })
        }

        updateBorderScheme()

        return this
    }

    this.getBorderScheme = function(){

        var scheme = []

        borderScheme.forEach(function(elem){
            scheme.push([elem['border-style'], elem['border-color'], elem['border-width']])
        })

        return scheme
    }

    this.setHide = function(val){
        hideDialog = val

        $('#cm-container').toggleClass("cm-inactive", val)

        return this
    }

    this.getHide = function(){
        return hideDialog
    }

    this.setLogoPosition = function(strPos){
        var logoPos

        switch(strPos){
            case "top-left":
                logoPos = {
                    top: "15px",
                    left: "15px"
                }
                break
            case "top-right":
                logoPos = {
                    top: "15px",
                    right: "15px"
                }
                break;
            case "bottom-left":
                logoPos = {
                    bottom: "15px",
                    left: "15px"
                }
                break
            case "bottom-right":
                logoPos = {
                    bottom: "15px",
                    right: "15px"
                }
                break
            default:
                logoPos = defaultLogoPosition
                console.log("no such position as: " + strPos)
        }

        jss.set("#cm-container", logoPos)
    }

    this.setFontSizes = function(sizes){
        fontSizes = sizes

        updateFontSizes()

        return this
    }

    this.getFontSizes = function(){
        return fontSizes
    }
    /*** customizing colors ***/

    this.update = function(){
        updateColorScheme()
        updateBorderScheme()
        updateFontSizes()
    }

    function updateColorScheme(){
        watchedClasses.forEach(function(arg, i){
            if(i < colorScheme.length)
                jss.set("." + arg, colorScheme[i])
            else {
                //create default color scheme
                colorScheme.push(createColorCSS())
                jss.set("." + arg, colorScheme[i])
            }
        })
    }

    function updateBorderScheme(){
        watchedClasses.forEach(function(arg, i){
            if(i < borderScheme.length)
                jss.set("." + arg, borderScheme[i])
            else {
                //create default border scheme
                borderScheme.push(createBorderCSS())
                jss.set("." + arg, borderScheme[i])
            }
        })
    }

    function updateFontSizes(){
        watchedClasses.forEach(function(arg, i){
            if(i < fontSizes.length)
                jss.set("." + arg, createFontSizeCSS(fontSizes[i]))
            else {
                jss.set("." + arg, createFontSizeCSS(defaultFontSize))
                fontSizes.push(defaultFontSize)
            }
        })
    }

    /*** render ***/

    this.render = function(){
        this.update()

        return this
    }

    /*** event handling ***/

    this.onNextClass = function(){
        if(currentClass < watchedClasses.length - 1)
            this.setCurrentClass(currentClass + 1)
        else
            this.setCurrentClass(0)
    }

    this.onPrevClass = function(){
        if(currentClass > 0)
            this.setCurrentClass(currentClass - 1)
        else {
            if (watchedClasses.length > 0)
                this.setCurrentClass(watchedClasses.length - 1)
        }
    }

    this.onSetBorderWidth = function(elem){
        var width = elem.value + "px"

        if(currentClass < borderScheme.length){
            borderScheme[currentClass]['border-width'] = width
        }

        updateBorderScheme()

        $("#cm-borderWidthInput").val(elem.value)
    }

    this.onSetBorderStyleFor = function(elem){
        if(currentClass < borderScheme.length){
            borderScheme[currentClass]['border-style'] = elem.innerText
        }

        updateBorderScheme()
    }

    this.onSetFontSize = function(elem){
        var size = elem.value + "px"

        if(currentClass < fontSizes.length){
            fontSizes[currentClass] = size
        }

        updateFontSizes()

        $("#cm-fontSizeInput").val(elem.value)
    }

    //currently called in example.html...

    /*** common functions ***/

    function isArray(obj){
        return Object.prototype.toString.call(obj) === '[object Array]'
    }

    function createColorCSS(colors){
        if(typeof(colors) != 'undefined' && isArray(colors))
            return {
                'background-color': colors[0],
                'color': colors[1]
            }
        else
            return {
                'background-color': defaultColorScheme[0][0],
                'color': defaultColorScheme[0][1]
            }
    }

    function createBorderCSS(params){
        if(typeof(params) != 'undefined' && isArray(params) && params.length >= 3){
            return {
                'border-style': params[0],
                'border-color': params[1],
                'border-width': params[2]
            }
        }else{
            return {
                'border-style': defaultBorderScheme[0],
                'border-color': defaultBorderScheme[1],
                'border-width': defaultBorderScheme[2]
            }
        }
    }

    function createFontSizeCSS(params){
        if(typeof(params) != 'undefined'){
            return {
                'font-size': params
            }
        }else{
            return {
                'font-size': defaultFontSize
            }
        }
    }

    this.setConfig(config)

    initCustomize()

    return this
}

//module.exports = Customize;