/**
 * Created by Stephan on 08.12.2014.
 */

describe("Customize JS test suite", function(){
    var cm = Customize() //empty customizer

    it("should include customizeJS", function() {
        expect(Customize).not.toBeUndefined()
    })

    describe("configuration of customize object", function(){

        it("should run without configs specified", function() {
            expect(cm).not.toBeUndefined()
        })

        it("should set colorScheme from config", function() {
            var scheme = [['black', 'white']],
                cm = Customize({colorScheme: scheme})

            expect(cm.getColorScheme()).toEqual(scheme)
        })

        it("should set watchedClasses from config", function() {
            var classes = ["class1", "class2"],
                cm = Customize({watchedClasses: classes})

            expect(cm.getWatchedClasses()).toEqual(classes)
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
                div1 = $('<div>').addClass("test-class1"),
                div2 = $('<div>').addClass("test-class2")
            body.append(div1)
            body.append(div2)

            Customize({watchedClasses: ["test-class1", "test-class2"]})

            expect(div1.css("background-color")).toEqual("rgb(255, 255, 255)")
            expect(div2.css("background-color")).toEqual("rgb(0, 0, 0)")

            div1.remove()
            div2.remove()
        })

        it("should initialize the color pickers with spectrum", function(){

            expect($("#cm-dialog").children(".sp-replacer").length).toEqual(2)
        })
    })

    describe("setter", function(){
        it("should set watched classes from array", function(){
            var classes = ["class1", "class2"]
            cm.setWatchedClasses(classes)

            expect(cm.getWatchedClasses()).toEqual(classes)
        })

        it("should set watched classes from string", function(){
            var classes = "class1 class2"
            cm.setWatchedClasses(classes)

            expect(cm.getWatchedClasses()).toEqual(["class1", "class2"])
        })

        it("should set default color scheme if none specified", function(){
            cm.setColorScheme()
            expect(cm.getColorScheme()[0]).toEqual(['white','black'])
        })

        it("should set color scheme", function(){
            var colorScheme = [["red", "blue"],["blue","red"]]
            cm.setColorScheme(colorScheme)
            expect(cm.getColorScheme()).toEqual(colorScheme)
        })
    })
})