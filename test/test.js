/**
 * Created by Stephan on 08.12.2014.
 */

describe("Customize JS test suite", function(){
    var cm = Customize(), //empty customizer
        classes = ["FirstClass", "Economy"],
        colorScheme = [["white", "white"], ["blue", "red"]],
        borderScheme = [["solid", "white", "3px"],["dashed", "steelblue", "5px"]]

    it("should include customizeJS", function() {
        expect(Customize).not.toBeUndefined()
    })

    describe("configuration of customize object", function(){

        it("should run without configs specified", function() {
            expect(cm).not.toBeUndefined()
        })

        it("should set colorScheme from config", function() {
            var cm = Customize({colorScheme: colorScheme})

            expect(cm.getColorScheme()).toEqual(colorScheme)
        })

        it("should set watchedClasses from config", function() {
            var cm = Customize({watchedClasses: classes})

            expect(cm.getWatchedClasses()).toEqual(classes)
        })

        it("should set borderScheme from config", function(){
            var cm = Customize({borderScheme: borderScheme})

            expect(cm.getBorderScheme()).toEqual(borderScheme)
        })
    })

    describe("initialization of Customize", function(){
        it("should exist exactly one cm-container", function(){
            var container = $("#cm-container")

            expect(container).toBeDefined()
        })

        it("should have an inactive dialog", function(){
            var dialog = $("#cm-dialog")

            expect(dialog.hasClass("cm-inactive")).toBeTruthy()
        })

        it("should have set defafult color scheme after initialization", function(){
            var body = $("body")
                div1 = $('<div>').addClass(classes[0]),
                div2 = $('<div>').addClass(classes[1])
            body.append(div1)
            body.append(div2)

            Customize({watchedClasses: classes})

            expect(div1.css("background-color")).toEqual("rgb(255, 255, 255)")
            expect(div2.css("background-color")).toEqual("rgb(0, 0, 0)")

            div1.remove()
            div2.remove()
        })

        it("should initialize the color pickers with spectrum", function(){

            expect($(".cm-colorPickerContainer").children(".sp-replacer").length).toEqual(2)
        })

        it("should set default or parameter colors on the colorpickers", function(){
            expect($("#cm-fontColorPicker").spectrum("get").toName()).toEqual(colorScheme[0][0])
            expect($("#cm-bgColorPicker").spectrum("get").toName()).toEqual(colorScheme[0][1])
        })
    })

    describe("setter", function(){
        it("should set watched classes from array", function(){
            cm.setWatchedClasses(classes)

            expect(cm.getWatchedClasses()).toEqual(classes)
        })

        it("should set watched classes from string", function(){
            var classesstr = "class1 class2"
            cm.setWatchedClasses(classesstr)

            expect(cm.getWatchedClasses()).toEqual(["class1", "class2"])
        })

        it("should set dialog title on setWatchedClasses", function(){
            cm.setWatchedClasses(classes)

            expect($(".cm-currentClass").first().text()).toEqual(classes[0])
        })

        it("should set default color scheme if none specified", function(){
            cm.setColorScheme()
            expect(cm.getColorScheme()[0]).toEqual(['white','black'])
        })

        it("should add color scheme at the tail", function(){
            cm.addColorScheme(colorScheme[0])
            expect(cm.getColorScheme()[colorScheme.length]).toEqual(colorScheme[0])
            expect(cm.getColorScheme()[colorScheme.length]).toEqual(colorScheme[0])
        })

        it("should set borderScheme", function(){
            cm.setBorderScheme(borderScheme)
            expect(cm.getBorderScheme()).toEqual(borderScheme)
        })
    })

    describe("event handling functions", function(){
        it("should change the dialog class in the title on next class", function(){
            cm.setWatchedClasses(classes)
            cm.onNextClass()

            expect($(".cm-currentClass").first().text()).toEqual(classes[1])
        })

        it("should set colors in the colorPickers on next class", function(){
            cm.setWatchedClasses(classes)
            cm.setColorScheme(colorScheme)
            cm.onNextClass()

            expect($("#cm-fontColorPicker").spectrum("get").toName()).toEqual(colorScheme[1][1])
            expect($("#cm-bgColorPicker").spectrum("get").toName()).toEqual(colorScheme[1][0])
        })
    })
})