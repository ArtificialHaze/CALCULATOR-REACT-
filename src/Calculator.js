import React, { useState } from "react";
import { Container, Current, Previous, Screen, Button } from "./Main";

const Calculator = () => {
  const [current, setCurrent] = useState("");
  const [previous, setPrevious] = useState("");
  const [operations, setOperations] = useState("");

  const setValueHandler = (element) => {
    const value = element.target.getAttribute("data");
    if (value === "." && current.includes(".")) {
      return;
    }
    setCurrent(current + value);
  };

  const handleDelete = () => {
    setCurrent(String(current).slice(0, -1));
  };

  const handleAllClear = () => {
    setCurrent("");
    setOperations("");
    setPrevious("");
  };

  const compute = () => {
    let result;
    let previousNumber = parseFloat(previous);
    let currentNumber = parseFloat(current);
    if (isNaN(previousNumber) || isNaN(currentNumber)) return;
    switch (operations) {
      case "/":
        result = previousNumber / currentNumber;
        break;
      case "+":
        result = previousNumber + currentNumber;
        break;
      case "-":
        result = previousNumber - currentNumber;
        break;
      case "x":
        result = previousNumber * currentNumber;
        break;
      default:
        return;
    }
    return result;
  };

  const handleOperation = (element) => {
    if (current === "") return;

    if (previous !== "") {
      let value = compute();
      setPrevious(value);
    } else {
      setPrevious(current);
    }

    setCurrent("");
    setOperations(element.target.getAttribute("data"));
  };

  const handleResults = () => {
    let value = compute();
    if (value === undefined || value === null) {
      return;
    }
    setCurrent(value);
    setPrevious("");
    setOperations("");
  };

  return (
    <Container>
      <Screen>
        <Previous>
          {previous} {operations}
        </Previous>
        <Current>{current}</Current>
      </Screen>
      <Button gridSpan={2} control onClick={handleAllClear}>
        AC
      </Button>
      <Button onClick={handleDelete}>DEL</Button>
      <Button data={"/"} operation onClick={handleOperation}>
        /
      </Button>
      <Button data={7} onClick={setValueHandler}>
        7
      </Button>
      <Button data={8} onClick={setValueHandler}>
        8
      </Button>
      <Button data={9} onClick={setValueHandler}>
        9
      </Button>
      <Button data={"x"} operation onClick={handleOperation}>
        x
      </Button>
      <Button data={4} onClick={setValueHandler}>
        4
      </Button>
      <Button data={5} onClick={setValueHandler}>
        5
      </Button>
      <Button data={6} onClick={setValueHandler}>
        6
      </Button>
      <Button data={"+"} operation onClick={handleOperation}>
        +
      </Button>
      <Button data={1} onClick={setValueHandler}>
        1
      </Button>
      <Button data={2} onClick={setValueHandler}>
        2
      </Button>
      <Button data={3} onClick={setValueHandler}>
        3
      </Button>
      <Button data={"-"} operation onClick={handleOperation}>
        -
      </Button>
      <Button data={"."} control onClick={setValueHandler}>
        .
      </Button>
      <Button data={0} onClick={setValueHandler}>
        0
      </Button>
      <Button onClick={handleResults} gridSpan={2}>
        =
      </Button>
    </Container>
  );
};

export default Calculator;
