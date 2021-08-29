//create DOM bindings
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
let shouldResetLog = false;

//functions to perform basic arithematics
const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => (num1 / num2).toFixed(5);
const modulo = (num1, num2) => num1 % num2;

//fucntion to perform operation between operands
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

//btnAllClearHandler - when the user hits AC button, clear the text content
//and operand log array.
const setDisplayToZero = () => {
	display.textContent = '0';
	operandLog = [];
};

//clear display content
const resetDisplay = () => {
	display.textContent = '';
};

//backspace functionality - when user clicks 'C' button, delete the last
//character from the display.textContent string if its length is more
//than one, otherwise set it to zero
const btnClearHandler = () => {
	if (shouldCalculate && display.textContent.length > 1)
		display.textContent = display.textContent.slice(0, -1);
	else display.textContent = 0;
};

const btnEqualsHandler = () => {
	// if shouldcalculate is true, evaluate the if block. This prevents the
	//user from evaluating the operandLog repeatedly by clicking on equals.
	//Set it to false before function return. Set it to true after a number
	//has been appended to display area.
	if (shouldCalculate) {
		operandOne = operandLog[0];
		operandTwo = Number.parseFloat(display.textContent);
		display.textContent = operate(operatorLog[0], operandOne, operandTwo);
		operandLog.unshift(Number.parseFloat(display.textContent));

		operandOne = operandTwo = 0;
	}
	shouldCalculate = false;
	shouldResetDisplay = true;
	shouldResetLog = true;
};

//function to populate the display area
const appendNumber = value => {
	if (shouldResetLog) {
		operandLog = [];
	}
	if (display.textContent === '0' || shouldResetDisplay) {
		resetDisplay();
		shouldResetDisplay = false;
	}
	display.textContent += value;
	shouldCalculate = true;
};

//calculator button click logic
const calculatorLogic = operator => {
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
	shouldResetLog = false;
};

//bind event listeners to all the buttons
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
