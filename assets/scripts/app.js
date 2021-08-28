const btnNumbers = Array.from(document.querySelectorAll('.number'));
const btnOperators = Array.from(document.querySelectorAll('.operator'));
const btnAllClear = document.querySelector('.all-clear');
const btnClear = document.querySelector('.clear');
const btnEquals = document.querySelector('.equals');
const display = document.querySelector('.display-result-text');

let operandLog = [];
let operatorLog = [];
let operandOne = 0;
let operandTwo = 0;
let shouldCalculate = true;
let shouldResetDisplay = false;

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;
const modulo = (num1, num2) => num1 % num2;

const operate = (operator, num1, num2) => {
	if (operator === '+') {
		return add(num1, num2);
	} else if (operator === '-') {
		return subtract(num1, num2);
	} else if (operator === 'X') {
		return multiply(num1, num2);
	} else if (operator === '/') {
		return divide(num1, num2);
	} else if (operator === '%') {
		return modulo(num1, num2);
	}
};

const setDisplayToZero = () => {
	display.textContent = '0';
	operandOne = operandTwo = 0;
	operandLog = [];
};

const resetDisplay = () => {
	display.textContent = '';
};

const btnClearHandler = () => {
	if (shouldCalculate && display.textContent.length > 1)
		display.textContent = display.textContent.slice(0, -1);
	else display.textContent = 0;
};

const btnEqualsHandler = () => {
	// prevent the user from pressing equals repeatedly
	if (shouldCalculate) {
		operandOne = operandLog[0];
		operandTwo = Number.parseFloat(display.textContent);
		display.textContent = operate(operatorLog[0], operandOne, operandTwo);
		operandLog.unshift(Number.parseFloat(display.textContent));
	}
	shouldCalculate = false;
	shouldResetDisplay = true;
};

const appendNumber = value => {
	if (display.textContent === '0' || shouldResetDisplay) {
		resetDisplay();
		shouldResetDisplay = false;
	}
	display.textContent += value;
	shouldCalculate = true;
};

const calculatorLogic = operator => {
	let displayValue = Number.parseFloat(display.textContent);
	operatorLog.unshift(operator);
	if (operandLog.length === 0 && shouldCalculate) {
		operandLog.unshift(Number.parseFloat(display.textContent));
	} else if (operandLog.length === 1 && shouldCalculate) {
		operandLog.unshift(Number.parseFloat(display.textContent));
		operandOne = Number.parseFloat(operandLog[1]);
		operandTwo = Number.parseFloat(operandLog[0]);
		display.textContent = operate(operatorLog[1], operandOne, operandTwo);
		operandLog.unshift(Number.parseFloat(display.textContent));
	} else if (operandLog.length >= 3 && shouldCalculate) {
		calculatorLogic.bind('+');
		operandOne = Number.parseFloat(operandLog[0]);
		operandTwo = Number.parseFloat(display.textContent);
		operandLog.unshift(operandTwo);
		display.textContent = operate(operatorLog[1], operandOne, operandTwo);
		operandLog.unshift(Number.parseFloat(display.textContent));
	}
	shouldResetDisplay = true;
	shouldCalculate = false;
};

btnNumbers.forEach(btn => {
	btn.addEventListener('click', () => {
		appendNumber(btn.textContent);
	});
});

btnOperators.forEach(btn => {
	btn.addEventListener('click', () => {
		calculatorLogic.call(this, btn.textContent);
	});
});

btnAllClear.addEventListener('click', setDisplayToZero);
btnClear.addEventListener('click', btnClearHandler);
btnEquals.addEventListener('click', btnEqualsHandler);
