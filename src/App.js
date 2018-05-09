import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class ShrinkText extends Component {
  render() {
    return <div {...this.props}/>
  }
}
class App extends Component {
  state = {
    value: null,
    topVal: '0',
    waitingForOperand: false,
    operator: null
  }
  clearAll(){
    const {topVal} = this.state
    this.setState(
      {
        topVal: '0'
      }
    )
  }
  togglePosNeg(){
    const {topVal} = this.state
    if(topVal.indexOf('-') === -1){
      this.setState({
        topVal : '-' + topVal
      })
    } else {
      this.setState({
        topVal : topVal.substr(1)
      })
    }
  }
  inputDigit(digit){
    const { topVal, waitingForOperand } = this.state
    if(waitingForOperand){
      this.setState({
        topVal: String(digit),
        waitingForOperand: false
      })
    } else {
      this.setState({
        topVal: topVal === '0' ? String(digit) : topVal + digit
      })
    }

  }
  inputDec(){
    const {topVal, waitingForOperand} = this.state

    if (waitingForOperand){
      this.setState({
        topVal: '.',
        waitingForOperand: false
      })
    } else if(topVal.indexOf('.') === -1){
      this.setState({
        topVal : topVal + '.',
        waitingForOperand: false
      })
    }
  }
  makePer(){
    const{topVal} = this.state
    const val = parseFloat(topVal)
    this.setState({
      topVal : String(val / 100)
    })
  }
  performOp(nextOperator){
    const {topVal, operator, value} = this.state
    const nextValue = parseFloat(topVal)
    const operations = {
      '/' : (prevValue, nextValue) => prevValue / nextValue,
      '*' : (prevValue, nextValue) => prevValue * nextValue,
      '+' : (prevValue, nextValue) => prevValue + nextValue,
      '-' : (prevValue, nextValue) => prevValue - nextValue,
      '=' : (prevValue, nextValue) => nextValue,
    }

    if(value == null) {
      this.setState({
        value: nextValue
      })
    } else if (operator) {
      const currentValue = value || 0
      const computedValue = operations[operator](currentValue, nextValue)
      this.setState({
        value: computedValue,
        topVal: String(computedValue)
      })
    }
    // const prevValue = topVal
    // const computedValue =  operations[operator](prevValue, nextValue)


    this.setState({
      waitingForOperand: true,
      operator: nextOperator
    })
  }

  render() {
    const {topVal} = this.state
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>

      <div id="wrapper">
        <div id="top">
          <ShrinkText id="topVal">{topVal}</ShrinkText>
        </div>
        <div id="buttons">
          <button id="button-AC" class="colorlg" onClick={() => this.clearAll()}>AC</button>
          <button id="button-posNeg" class="colorlg" onClick={() => this.togglePosNeg()}>+/-</button>
          <button id="button-percent" class="colorlg" onClick={() => this.makePer()}>%</button>
          <button id="button-div" class="coloro" onClick={() => this.performOp('/')}>/</button>
          <button id="button-7" class="colordg" onClick={() => this.inputDigit(7)}>7</button>
          <button id="button-8" class="colordg" onClick={() => this.inputDigit(8)}>8</button>
          <button id="button-9" class="colordg" onClick={() => this.inputDigit(9)}>9</button>
          <button id="button-mult" class="coloro" onClick={() => this.performOp('x')}>x</button>
          <button id="button-4" class="colordg" onClick={() => this.inputDigit(4)}>4</button>
          <button id="button-5" class="colordg" onClick={() => this.inputDigit(5)}>5</button>
          <button id="button-6" class="colordg" onClick={() => this.inputDigit(6)}>6</button>
          <button id="button-minus" class="coloro" onClick={() => this.performOp('-')}>-</button>
          <button id="button-1" class="colordg" onClick={() => this.inputDigit(1)}>1</button>
          <button id="button-2" class="colordg" onClick={() => this.inputDigit(2)}>2</button>
          <button id="button-3" class="colordg" onClick={() => this.inputDigit(3)}>3</button>
          <button id="button-plus" class="coloro" onClick={() => this.performOp('+')}>+</button>
          <button id="button-0" class="colordg" onClick={() => this.inputDigit(0)}>0</button>
          <button id="button-dec" class="colordg" onClick={() => this.inputDec()}>.</button>
          <button id="button-eq" class="coloro" onClick={() => this.performOp('=')}>=</button>
        </div>
      </div>
    );
  }
}

export default App;
