let display = document.getElementById('display');
let currentOperand = '';
let previousOperand = '';
let operation = undefined;

function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteLast() {
    currentOperand = currentOperand.toString().slice(0, -1);
    updateDisplay();
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}

function appendOperator(operator) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculate();
    }
    operation = operator;
    previousOperand = currentOperand;
    currentOperand = '';
}

function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    currentOperand = computation;
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

function appendFunction(func) {
    if (currentOperand === '') return;
    switch (func) {
        case 'sqrt':
            currentOperand = Math.sqrt(parseFloat(currentOperand));
            break;
        case 'square':
            currentOperand = Math.pow(parseFloat(currentOperand), 2);
            break;
        case 'sin':
            currentOperand = Math.sin(parseFloat(currentOperand));
            break;
        case 'cos':
            currentOperand = Math.cos(parseFloat(currentOperand));
            break;
        case 'tan':
            currentOperand = Math.tan(parseFloat(currentOperand));
            break;
        case 'log':
            currentOperand = Math.log10(parseFloat(currentOperand));
            break;
        default:
            return;
    }
    updateDisplay();
}

function updateDisplay() {
    display.innerText = currentOperand || '0';
    if (operation != null) {
        display.innerText = `${previousOperand} ${operation} ${currentOperand}`;
    }
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key >= 0 && key <= 9) {
        appendNumber(key);
    } else if (key === '.') {
        appendNumber(key);
    } else if (key === '+') {
        appendOperator('+');
    } else if (key === '-') {
        appendOperator('-');
    } else if (key === '*') {
        appendOperator('*');
    } else if (key === '/') {
        appendOperator('/');
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});

document.getElementById('theme-switch').addEventListener('change', function() {
    document.body.classList.toggle('dark');
});
