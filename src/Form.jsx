import React from "react";
import "./Form.css";
import { useState } from "react";


function Form() {
  const [newInput, setNewInput] = useState("");
  const [selectOption, setSelectOption] = useState("");
  const [result, setResult] = useState(null);

  const handleTextChange = (e) => {
    setNewInput(e.target.value);
  }

  const handleSelectChange = (e) => {
    setSelectOption(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let numbers = newInput.split(',').map(Number);

    if (numbers.some(isNaN)) {
      setResult("Invalid input");
    } else {
    switch(selectOption) {
      case "sum":
        setResult(sum(numbers));
        break;
      case "average":
        setResult(average(numbers));
        break;
      case "mode":
        setResult(mode(numbers));
        break;
      default:
        console.log("No operation selected");
    }
  }
    setNewInput("");
    setSelectOption("");
  }


  const sum = (numbers) => {
    return numbers.reduce((a,b)=> a + b, 0);
  }

  const average = (numbers) => {
    return sum(numbers)/numbers.length;
  }

  const mode = (numbers) => {
    let counts = numbers.reduce(
      (acc, value) => ({ ...acc, [value]: (acc[value] || 0) + 1 }),
      {});
      let maxCount = Math.max(...Object.values(counts));
      let mode = Object.keys(counts).find(key => counts[key] === maxCount);
      return Number(mode);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input id="values" name="values" type="text" value={newInput} onChange={handleTextChange} htmlFor="operations" />
        <select id="operation" name="operation" value={selectOption} onChange={handleSelectChange}>
          <option value=""></option>
          <option value="sum">sum</option>
          <option value="average">average</option>
          <option value="mode">mode</option>
        </select>
        <button type="submit">Calculate</button>
      </form>
      <section id="result">
        <p>{result}</p>
      </section>
    </>
  );
}
export default Form;