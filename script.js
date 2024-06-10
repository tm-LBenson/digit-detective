'use strict';
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#sin form").addEventListener("submit", findSIN);
    document.querySelector("#upc form").addEventListener("submit", findUPC);
    document.querySelector("#isbn form").addEventListener("submit", findISBN);
});

function findSIN(event) {
    event.preventDefault();

    const SIN_NUMBER_LENGTH = 9;
    const sinInput = document.querySelector("#sin input").value.toLowerCase();

    if (!containX(sinInput)) {
        alert("There is no 'x' to find.");
        return;
    }

    if (!inputIsFilled(sinInput, SIN_NUMBER_LENGTH)) {
        alert("The input is not filled properly.");
        return;
    }

    const sinArray = Array.from(sinInput);
    let totalSum = 0;
    let checkDigit;
    let xIsCheckDigit = false;
    let doubleX = false;

    sinArray.forEach((char, index) => {
        let currentNumber = char;

        if (index + 1 === SIN_NUMBER_LENGTH) {
            if (currentNumber === "x") {
                xIsCheckDigit = true;
            } else {
                checkDigit = parseInt(currentNumber);
            }
        } else {
            if (isEven(index + 1)) {
                currentNumber = currentNumber === "x" ? 0 : parseInt(currentNumber) * 2;
                if (numberHasTwoDigits(currentNumber)) {
                    currentNumber = parseInt(currentNumber.toString()[0]) + parseInt(currentNumber.toString()[1]);
                }
                if (currentNumber === 0 && sinArray[index] === "x") doubleX = true;
            } else {
                currentNumber = currentNumber === "x" ? 0 : parseInt(currentNumber);
            }
            totalSum += currentNumber;
        }
    });

    let xValue;
    if (xIsCheckDigit) {
        xValue = (10 - (totalSum % 10)) % 10;
        alert("The x is the check digit and the value is: " + xValue);
    } else {
        xValue = doubleX ? (10 - ((totalSum + checkDigit) % 10)) / 2 : (10 - ((totalSum + checkDigit) % 10));
        if (!Number.isInteger(xValue)) {
            xValue = parseInt("1" + ((xValue * 2) - 1)) / 2;
        }
        alert("The x value is: " + xValue);
    }
}

function findUPC(event) {
    event.preventDefault();

    const UPC_NUMBER_LENGTH = 12;
    const upcInput = document.querySelector("#upc input").value.toLowerCase();

    if (!containX(upcInput)) {
        alert("There is no 'x' to find.");
        return;
    }

    if (!inputIsFilled(upcInput, UPC_NUMBER_LENGTH)) {
        alert("The input is not filled properly.");
        return;
    }

    const upcArray = Array.from(upcInput);
    let totalSum = 0;
    let checkDigit;
    let xIsCheckDigit = false;
    let tripleX = false;

    upcArray.forEach((char, index) => {
        let currentNumber = char;

        if (index + 1 === UPC_NUMBER_LENGTH) {
            if (currentNumber === "x") {
                xIsCheckDigit = true;
            } else {
                checkDigit = parseInt(currentNumber);
            }
        } else {
            if (!isEven(index + 1)) {
                currentNumber = currentNumber === "x" ? 0 : parseInt(currentNumber) * 3;
                if (currentNumber === 0 && upcArray[index] === "x") tripleX = true;
            } else {
                currentNumber = currentNumber === "x" ? 0 : parseInt(currentNumber);
            }
            totalSum += currentNumber;
        }
    });

    let xValue;
    if (xIsCheckDigit) {
        xValue = (10 - (totalSum % 10)) % 10;
        alert("The x is the check digit and the value is: " + xValue);
    } else {
        xValue = (10 - ((totalSum + checkDigit) % 10)) % 10;
        alert("The x value is: " + xValue);
    }
}

function findISBN(event) {
    event.preventDefault();

    const ISBN_NUMBER_LENGTH = 10;
    const isbnInput = document.querySelector("#isbn input").value.toLowerCase();

    if (!containX(isbnInput)) {
        alert("There is no 'x' to find.");
        return;
    }

    if (!inputIsFilled(isbnInput, ISBN_NUMBER_LENGTH)) {
        alert("The input is not filled properly.");
        return;
    }

    const isbnArray = Array.from(isbnInput);
    let totalSum = 0;
    let checkDigit;
    let xIsCheckDigit = false;
    let xMultiplication;
    let xValue;
    let foundX = false;

    isbnArray.forEach((char, index) => {
        let currentNumber = char;

        if (index + 1 === ISBN_NUMBER_LENGTH) {
            if (currentNumber === "x") {
                if (foundX) {
                    checkDigit = 10;
                } else {
                    xIsCheckDigit = true;
                }
            } else {
                checkDigit = parseInt(currentNumber);
            }
        } else {
            if (currentNumber === "x") {
                currentNumber = 0;
                xMultiplication = index + 1;
                foundX = true;
            } else {
                currentNumber = currentNumber * (index + 1);
            }
            totalSum += currentNumber;
        }
    });

    if (xIsCheckDigit) {
        xValue = (totalSum % 11 === 10) ? "X" : totalSum % 11;
        alert("The x is the check digit and the value is: " + xValue);
    } else {
        let congruentNumber = (checkDigit - (totalSum % 11));
        while (congruentNumber % xMultiplication !== 0) {
            congruentNumber += 11;
        }
        xValue = congruentNumber / xMultiplication;
        alert("The x value is: " + xValue);
    }
}

function validateInput(ths, event) {
    let pressedKey = event.key.toLowerCase();

    if (!isNumeric(pressedKey) && !isFirstX(pressedKey, ths.value) && !isSpecialKey(pressedKey)) {
        event.preventDefault();
    }
}

function validateISBNInput(ths, event) {
    let pressedKey = event.key.toLowerCase();

    if (!isNumeric(pressedKey) && !isFirstX(pressedKey, ths.value) && !xIsCheckDigit(pressedKey, ths.value) && !isSpecialKey(pressedKey)) {
        event.preventDefault();
    }
}

function isNumeric(key) {
    return !isNaN(parseFloat(key)) && isFinite(key);
}

function isFirstX(key, input) {
    return key === "x" && input.split("x").length === 1;
}

function xIsCheckDigit(key, input) {
    return input.length === 9 && key === "x";
}

function isSpecialKey(key) {
    return ["backspace", "arrowleft", "arrowright", "delete"].includes(key);
}

function containX(input) {
    return input.indexOf("x") !== -1;
}

function isEven(number) {
    return number % 2 === 0;
}

function inputIsFilled(input, max) {
    return input.length === max;
}

function numberHasTwoDigits(number) {
    return number.toString().length === 2;
}
