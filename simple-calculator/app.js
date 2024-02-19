const inputElement = document.getElementById('input');
const strCalculationsElement = document.getElementById('strCalculations');

const plusBtn = document.getElementById('plus');
const minusBtn = document.getElementById('minus');
const multiplyBtn = document.getElementById('multiply');
const divideBtn = document.getElementById('divide');
const sqrtBtn = document.getElementById('sqrt');
const percentBtn = document.getElementById('percent');
const backspaceBtn = document.getElementById('backspace');
const oppositeBtn = document.getElementById('opposite');
const squaredBtn = document.getElementById('squared');
const degreeBtn = document.getElementById('degree');
const calculateBtn = document.getElementById('calculate');
const cleanAllBtn = document.getElementById('cleanAll');
const cleanInputBtn = document.getElementById('cleanInput');

const num0 = document.getElementById('0');
const num1 = document.getElementById('1');
const num2 = document.getElementById('2');
const num3 = document.getElementById('3');
const num4 = document.getElementById('4');
const num5 = document.getElementById('5');
const num6 = document.getElementById('6');
const num7 = document.getElementById('7');
const num8 = document.getElementById('8');
const num9 = document.getElementById('9');

let firstNumber = 0;
let secondNumber = 0;
let strCalculations = '';
let action = ''
let result = 0;
let isPercent = false;

num0.onclick = () => appendInInputField(0);
num1.onclick = () => appendInInputField(1);
num2.onclick = () => appendInInputField(2);
num3.onclick = () => appendInInputField(3);
num4.onclick = () => appendInInputField(4);
num5.onclick = () => appendInInputField(5);
num6.onclick = () => appendInInputField(6);
num7.onclick = () => appendInInputField(7);
num8.onclick = () => appendInInputField(8);
num9.onclick = () => appendInInputField(9);

plusBtn.onclick = () => clickBtn('+');
minusBtn.onclick = () => clickBtn('-');
multiplyBtn.onclick = () => clickBtn('*');
divideBtn.onclick = () => clickBtn('/');
degreeBtn.onclick = () => clickBtn('^');

cleanAllBtn.onclick = () => {
    setNewInputElementValue('');
    firstNumber = 0;
    strCalculations = '';
    strCalculationsElement.innerHTML = strCalculations;
}

cleanInputBtn.onclick = () => {
    setNewInputElementValue('');
}

backspaceBtn.onclick = () => {
  let result = inputElement.value.slice(0, inputElement.value.length - 1);
  inputElement.value = result.length === 0 ? 0 : result;
}

oppositeBtn.onclick = () => {
    firstNumber = inputElement.value;
    inputElement.value = `${firstNumber / -1}`
    inputElement.focus();
}

squaredBtn.onclick = () => {
    createAndSaveStrHistoryCalculations('', '^ 2 =');
    let result = Math.pow(firstNumber, 2);
    setNewInputElementValue(result);
}

sqrtBtn.onclick = () => {
    firstNumber = inputElement.value;
    createAndSaveStrHistoryCalculations('&#8730;', '=');
    let result = Math.sqrt(firstNumber);
    setNewInputElementValue(result);
}

percentBtn.onclick = () => {
    if(firstNumber === 0) {
        return;
    }
    isPercent = true;
    calc();
}

calculateBtn.onclick = calc;

function clickBtn(typeAction) {
    action = typeAction;
    firstNumber = inputElement.value;
    createAndSaveStrHistoryCalculations('', typeAction);
    inputElement.value = '';
    inputElement.focus();
}

function createAndSaveStrHistoryCalculations(startAppendStr, endAppendStr) {
    strCalculations = `${startAppendStr} ${firstNumber} ${endAppendStr} `;
    strCalculationsElement.innerHTML = strCalculations;
}

function setNewInputElementValue(value) {
    inputElement.value = `${value}`;
    inputElement.focus();
}

function appendInInputField(number) {
    inputElement.value = inputElement.value == 0 ? number : `${inputElement.value}${number}`;
}

function calc() {
    if(strCalculations.endsWith('=')) {
        strCalculations = `${result} ${action}`;
        firstNumber = result;
    }else {
        secondNumber = Number.parseFloat(inputElement.value);

        secondNumber = isPercent ? secondNumber / 100 : secondNumber

        firstNumber = Number.parseFloat(firstNumber);
    }

    strCalculations = `${strCalculations} ${secondNumber} =`;
    strCalculationsElement.innerText = strCalculations;


    switch (action) {
        case '+' :
            result = firstNumber + secondNumber;
            setNewInputElementValue(result);
            return;
        case  '-':
            result = firstNumber - secondNumber;
            setNewInputElementValue(result);
            return;
        case  '*':
            result = firstNumber * secondNumber;
            setNewInputElementValue(result);
            return;
        case  '/':
            result = firstNumber / secondNumber;
            setNewInputElementValue(result);
            return;
        case  '^':
            result = Math.pow(firstNumber, secondNumber);
            setNewInputElementValue(result);
            return;
        default :
            return;
    }
}

