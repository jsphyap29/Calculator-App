const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');

let input = "";

for (let key of keys) {
    const value = key.dataset.key;

    key.addEventListener('click', () => {
        if (value == "clear") {
            input = "";
            display_input.innerHTML = "0";
            display_output.innerHTML = "";
        } else if (value == "backspace") {
            input = input.slice(0, -1);
            display_input.innerHTML = Clean(input);
        } else if (value == "=") {
            let result = eval(PrepInput(input));

            display_output.innerHTML = Clean(result);
        } else if (value == "brackets") {
            if (input.indexOf("(") == -1 || 
                input.indexOf("(") != -1 && 
                input.indexOf("(") != -1 &&
                input.lastIndexOf("(") < input.lastIndexOf("(")
            ) {
                input += "(";
            }else if (
                input.indexOf("(") != -1 && 
                input.indexOf(")") == -1 ||
                input.indexOf("(") != -1 &&
                input.indexOf(")") != -1 &&
                input.lastIndexOf("(") > input.lastIndexOf(")")
                ) {
                input += ")"; 
            }

            display_input.innerHTML = Clean(input);
        } else {
            if (Validation(value)) {
                input += value;
                display_input.innerHTML = Clean(input);
            }
        }
    })
}

function Clean(input) {
    let array = input.split("");
    let array_length = array_length.length;

    for (let i = 0; i < array_length; i++) { 
        if (array[i] == "*") {
            array[i] = ` <span class="operator">x</
            span> `;
        }else if (array[i] == "/") {
            array[i] = ` <span class="operator">÷</
            span> `;
        }else if (array[i] == "+") {
            array[i] = ` <span class="operator">+</
            span> `;
        }else if (array[i] == "-") {
            array[i] = ` <span class="operator">-</
            span> `;
        }else if (array[i] == "(") {
            array[i] = ` <span class="brackets">(</
            span> `;
        }else if (array[i] == ")") {
            array[i] = ` <span class="brackets">)</
            span> `;
        }else if (array[i] == "%") {
            array[i] = ` <span class="percent">%</
            span> `;
        }
    }

    return array.join("");
}

function Clean(output) {
    let string_out = output.toString();
    let decimal = string_out.split(".")[1];
    string_out = string_out.split(".")[0];

    let array_out = string_out.split("");

    if (array_out.length > 3) {
        for(let i = array_out.length - 3; i > 0; i -= 3){
            array_out.splice(i, 0, "");
        }
    }

    if (decimal) {
        array_out.push(".");
        array_out.push(decimal);
    }

    return array_out.join("");
}

function Validation (value) {
    let input_last = input.slice(-1);
    let operators = ["+" , "-", "*", "/"];

    if (value == "." && input_last == ".") {
        return false;
    } 

    if (operators.includes(value)) {
        if (operators.includes(input_last)) {
            return false;
        }else {
            return true;
        }
    }

    return true;
}

function PrepInput (input) {
    let array_inp = input.split ("");

    for (let i = 0; i < array_inp.length; i++){
        if(array_inp[i] == "%") {
            array_inp[i] = "/100";
        }
    }

    return array_inp.join ("");
}