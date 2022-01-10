// The functions in this file allow for keyboard input.
// Top row of buttons = 12345
// Second row of buttions = 67890 OR qwerty
// Third row of buttons = asdfg
//
// Uncertain if these are implemented anywhere yet:
// Space will handle a screen with a Next button
// Y and N will handle a yes or No
// Also will register a shift depress.

import { liveData } from "../globalVariables"
import { GUI } from "./gui"

// https://developer.mozilla.org/en-US/docs/Web/Events
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
namespace Input {
    function keyPress(e: KeyboardEvent) {
        // let event = window.event ? window.event : e;
        // switch (event.key) {
        switch (e.key) {
            //Standard buttons
            case "1":
                pressButtonByKey(0)
                break
            case "2":
                pressButtonByKey(1)
                break
            case "3":
                pressButtonByKey(2)
                break
            case "4":
                pressButtonByKey(3)
                break
            case "5":
                pressButtonByKey(4)
                break
            case "6":
            case "q":
                pressButtonByKey(5)
                break
            case "7":
            case "w":
                pressButtonByKey(6)
                break
            case "8":
            case "e":
                pressButtonByKey(7)
                break
            case "9":
            case "r":
                pressButtonByKey(8)
                break
            case "0":
            case "t":
                pressButtonByKey(9)
                break
            case "a":
                pressButtonByKey(10)
                break
            case "s":
                pressButtonByKey(11)
                break
            case "d":
                pressButtonByKey(12)
                break
            case "f":
                pressButtonByKey(13)
                break
            case "g":
                pressButtonByKey(14)
                break
            //Next and yes/no
            case " ":
                pressNextByKey()
                break
            case "y":
                pressYesByKey()
                break
            case "n":
                pressNoByKey()
                break
            case "Shift":
                liveData.shiftKeyDown = true
                break
            default:
        }
    }
    function keyDepress(e: KeyboardEvent) {
        // let event = window.event ? window.event : e
        // switch (event.key) {
        switch (e.key) {
            case "Shift":
                liveData.shiftKeyDown = false
                break
            default:
        }
    }
    document.addEventListener("keydown", keyPress)
    document.addEventListener("keyup", keyDepress)

    function pressButtonByKey(index: number): void {
        const button = document.getElementById("button" + index)
        if (button && GUI.isButtonVisible(index)) {
            button.onclick()
        }
    }
    function pressNextByKey(): void {
        const button = document.getElementById("button0")
        if (button && button.innerHTML == "Next") {
            button.onclick()
        }
    }
    function pressYesByKey(): void {
        const button = document.getElementById("button0")
        if (button && button.innerHTML == "Yes") {
            button.onclick()
        }
    }
    function pressNoByKey(): void {
        const button = document.getElementById("button1")
        if (button && button.innerHTML == "No") {
            button.onclick()
        }
    }
}

export { Input }
