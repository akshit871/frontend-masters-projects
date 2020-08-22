// Build something like the calculator in google but for basic operations

const calcScreen = document.querySelector(".calc-screen");
const operators = ["÷", "×", "-", "+"];
const validOperations = ["+-", "×-", "÷-", "undefined-"];
let typedKeys = [];

// Lot of edge cases like 0/0 9/0 9/0+3 etc need to be handled

function isKeyOperator(key) {
  return operators.includes(key);
}

function performOperation(firstNum, operator, secondNum) {
  if (operator === "÷") result = firstNum / secondNum;
  else if (operator === "×") result = firstNum * secondNum;
  else if (operator === "+") result = firstNum + secondNum;
  else result = firstNum - secondNum;
  return result.toString();
}

/*
appends typed digits to form numbers, logic is erroneous
['1', '2', '-', '3', '5'] => ['12', '-', '35']
*/
function appendDigits(typedKeys) {
  let number = "";
  operandsAndOperators = [];
  // console.log(typedKeys);
  typedKeys.forEach(function (curKey, index) {
    // - is appended to number in cases like 6×-9
    prevKey = typedKeys[index - 1];
    if (!isKeyOperator(curKey) || (curKey === "-" && isKeyOperator(prevKey))) {
      number += curKey;
    } else {
      if (number !== "") {
        operandsAndOperators.push(number);
        number = "";
      }
      if (
        curKey === "-" &&
        ((isKeyOperator(prevKey) && prevKey !== "-") || prevKey === undefined)
      )
        number = curKey;
      else operandsAndOperators.push(curKey);
    }
  });
  operandsAndOperators.push(number);
  // console.log(operandsAndOperators);
  return operandsAndOperators;
}

document
  .querySelector(".calculator")
  .addEventListener("click", function (event) {
    if (event.target.innerText === "=") {
      // similar functionality as in google calculator
      if (isKeyOperator(typedKeys[typedKeys.length - 1])) {
        calcScreen.innerText = typedKeys.join("");
      } else {
        typedKeys = appendDigits(typedKeys);
        // array follows (operand operator operand) structure
        while (typedKeys.length >= 3) {
          let [firstNum, operator, secondNum] = typedKeys;
          typedKeys.splice(
            0,
            3,
            performOperation(parseInt(firstNum), operator, parseInt(secondNum))
          );
        }
        calcScreen.innerText = typedKeys[0];
      }
    } else if (event.target.innerText === "C") {
      typedKeys.splice(0, typedKeys.length);
      calcScreen.innerText = 0;
    } else if (event.target.innerText === "←") {
      if (typedKeys.length === 1 && typedKeys[0].length > 1) {
        typedKeys = typedKeys[0].split("");
      }
      typedKeys.pop();
      calcScreen.innerText = typedKeys.join("");
    } else if (event.target.className !== "calc-screen") {
      let prevKey = typedKeys[typedKeys.length - 1];
      let curKey = event.target.innerText;
      operation = `${prevKey}${curKey}`;
      // to handle invalid operations like 6÷×5, starting calculations with invalid operator like ÷, × etc
      if (
        !(
          (isKeyOperator(prevKey) || prevKey === undefined) &&
          isKeyOperator(curKey)
        ) ||
        validOperations.includes(operation)
      ) {
        typedKeys.push(curKey);
        calcScreen.innerText = typedKeys.join("");
      }
    }
  });
