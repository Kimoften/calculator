"use client";

import React, { useState, useEffect } from "react";

const App: React.FC = () => {
  const [firstCalcNumber, setFirstCalcNumber] = useState<string>("");
  const [secondCalcNumber, setSecondCalcNumber] = useState<string>("");
  const [operator, setOperator] = useState<string>("");
  const [result, setResult] = useState<number | string>("");

  const onClickNumber = (number: string): void => {
    if (!operator) {
      setFirstCalcNumber((prev) => `${prev}${number}`);
    } else {
      setSecondCalcNumber((prev) => `${prev}${number}`);
    }
  };

  const onClickClear = (): void => {
    setOperator("");
    setFirstCalcNumber("");
    setSecondCalcNumber("");
    setResult("0");
  };

  const checkOperator = (): void => {
    if (!operator) {
      alert("연산기호를 입력해 주세요");
    }
  };

  const checkNumberZero = (): void => {
    if (!operator && firstCalcNumber !== "0") {
      onClickNumber("0");
    }
    if (operator && secondCalcNumber !== "0") {
      onClickNumber("0");
    }
  };

  const handleOperator = (): void => {
    const firstNumber = parseFloat(firstCalcNumber);
    const secondNumber = parseFloat(secondCalcNumber);

    if (operator === "+") {
      setResult(firstNumber + secondNumber);
    } else if (operator === "-") {
      setResult(firstNumber - secondNumber);
    } else if (operator === "X") {
      setResult(firstNumber * secondNumber);
    } else if (operator === "/") {
      setResult(secondNumber !== 0 ? firstNumber / secondNumber : "0으로 나눌 수 없습니다");
    }

    setOperator("");
    setSecondCalcNumber("");
  };

  useEffect(() => {
    if (result === 0) {
      onClickClear();
    }
    if (result === "Infinity") {
      alert("숫자값이 아닙니다");
      onClickClear();
    }
    if (typeof result === "string" && isNaN(Number(result))) {
      onClickClear();
      alert("숫자값이 아닙니다");
    }
  }, [result]);

  useEffect(() => {
    if (result) {
      setFirstCalcNumber(result.toString());
    }
  }, [result]);

  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-4">
          <input
            className="w-full text-center text-xl py-2 text-black"
            readOnly
            type="text"
            value={secondCalcNumber ? secondCalcNumber : firstCalcNumber}
          />
        </div>
        <button onClick={() => onClickNumber("1")}>1</button>
        <button onClick={() => onClickNumber("2")}>2</button>
        <button onClick={() => onClickNumber("3")}>3</button>
        <button onClick={() => { handleOperator(); setOperator("+"); }}>+</button>
  
        <button onClick={() => onClickNumber("4")}>4</button>
        <button onClick={() => onClickNumber("5")}>5</button>
        <button onClick={() => onClickNumber("6")}>6</button>
        <button onClick={() => { handleOperator(); setOperator("-"); }}>-</button>
  
        <button onClick={() => onClickNumber("7")}>7</button>
        <button onClick={() => onClickNumber("8")}>8</button>
        <button onClick={() => onClickNumber("9")}>9</button>
        <button onClick={() => { handleOperator(); setOperator("X"); }}>X</button>
  
        <button onClick={onClickClear}>AC</button>
        <button onClick={checkNumberZero}>0</button>
        <button onClick={() => { handleOperator(); checkOperator(); }}>=</button>
        <button onClick={() => { handleOperator(); setOperator("/"); }}>/</button>
      </div>
    </>
  );
};

export default App;
