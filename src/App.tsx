import { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState<number[]>([])
  const [value, setValue] = useState<number[]>([])
  const [isChecked, setIsChecked] = useState<boolean[]>([])
  const [result, setResult] = useState<number>()

  const handleInput = (e: any, index: number) => {
    setInput((prev: any) => {
      return [
        ...prev.slice(0, index),
        e.target.value,
        ...prev.slice(index+1),
      ]
    })
  }

  const handleCheckbox = (e: any, index: number) => {
    setIsChecked((prev: any) => {
      return [
        ...prev.slice(0, index),
        e.target.checked,
        ...prev.slice(index+1),
      ]
    })

    setValue((prev: any) => {
      return [
        ...prev.slice(0, index),
        input[index],
        ...prev.slice(index+1),
      ]
    })
  }

  const handleResult = (e:any, opt: string) => {
    e.preventDefault();
    switch(opt) {
      case "+": 
        setResult(value.reduce((a:number, b:number) => Number(a) + Number(b)));
        break;
      case "-": 
        setResult(value.reduce((a:number, b:number) => a-b));
        break;
      case "*": 
        setResult(value.reduce((a:number, b:number) => a*b));
        break;
      case "/": 
        setResult(value.reduce((a:number, b:number) => a/b));
        break;
    }
  }

  return (
    <div className="App">
      <div className="container">
        <form className="form">
          <div className="input-group">
            <input 
              type="number" 
              className="input-number"
              value={input[0]}  name="input-1" 
              onChange={(e:any) => handleInput(e, 0)} 
            />
            <input 
              type="checkbox" 
              name="checkbox-1" 
              checked={isChecked[0]} 
              disabled={!input[0]? true : false}
              onChange={(e:any) => handleCheckbox(e, 0)} />
          </div>
          <div className="input-group">
            <input 
              type="number" 
              value={input[1]}  
              name="input-2" 
              onChange={(e:any) => handleInput(e, 1)} 
            />
            <input 
              type="checkbox"  
              name="checkbox-2" 
              checked={isChecked[1]} 
              disabled={!input[1]? true : false}
              onChange={(e:any) => handleCheckbox(e, 1)} 
            />
          </div>
          <div className="input-group">
            <input 
              type="number" 
              value={input[2]}  
              name="input-3" 
              onChange={(e:any) => handleInput(e, 2)} 
            />
            <input 
              type="checkbox"  
              name="checkbox-3" 
              checked={isChecked[2]}
              disabled={!input[2]? true : false}
              onChange={(e:any) => handleCheckbox(e, 2)} 
              />
          </div>
          <div className="button-group">
            <button 
              className="btn_add" 
              disabled={input.length < 2}
              onClick={(e) => handleResult(e, "+")}
            >+
            </button>
            <button 
              className="btn_subtract" 
              disabled={input.length < 2}
              onClick={(e) => handleResult(e, "-")}
            >-
            </button>
            <button 
              className="btn_multiply" 
              disabled={input.length < 2}
              onClick={(e) => handleResult(e, "*")}
            >*
            </button>
            <button 
              className="btn_divide" 
              disabled={input.length < 2}
              onClick={(e) => handleResult(e, "/")}
            >/
            </button>
          </div>
        </form>
      <hr />
      {input.length < 1 && <div className="warning">Checklist hanya bisa dilakukan setelah nilai tersedia!</div>}
      {isChecked.length < 2 && <div className="error">Harap checklist 2 value!</div>}
      <div className="result">
        <div>Hasil:</div>
        <div className="result-value">{result}</div>
      </div>
      </div>
    </div>
  );
}

export default App;
