import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <form>
          <div className="input-1">
            <input type="text" name="input-1" />
            <input type="checkbox"  name="checkbox-1" />
          </div>
          <div className="input-2">
            <input type="text" name="input-2" />
            <input type="checkbox"  name="checkbox-2" />
          </div>
          <div className="input-3">
            <input type="text" name="input-3" />
            <input type="checkbox"  name="checkbox-3" />
          </div>
          <button className="btn_add">+</button>
          <button className="btn_subtract">-</button>
          <button className="btn_multiply">*</button>
          <button className="btn_divide">/</button>
        </form>
      <hr />
      <div className="error">Harap checklist 2 value!</div>
      <div>
        <div>Hasil:</div>
        <div className="result">1</div>
      </div>

      </div>
    </div>
  );
}

export default App;
