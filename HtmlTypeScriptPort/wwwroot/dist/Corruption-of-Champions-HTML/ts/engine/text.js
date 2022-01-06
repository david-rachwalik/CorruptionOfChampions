/**
 * This will clear the text on screen.
 */
let clearOutput = function () {
    const maintext = document.getElementById("maintext");
    if (maintext) {
        maintext.innerHTML = "";
    }
};
/**
 * This will output a text on screen.
 */
let outputText = function (text) {
    const maintext = document.getElementById("maintext");
    if (maintext) {
        maintext.innerHTML += text;
    }
};
export { clearOutput, outputText };
//# sourceMappingURL=text.js.map