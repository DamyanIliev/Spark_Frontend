import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Rules extends Component {
  constructor(){
    super();
    this.state = {
      scrollOpen: false,
    }
  }
  __handleRulesView(){
    this.setState(prevState => {
      return {
        scrollOpen: !prevState.scrollOpen,
      }
    })
  }
  render() {
    const { scrollOpen } = this.state;
    return (
      <div>
        <Link className='text-[14px] text-white8 p-1 block' href= "javascript:void(0)" onClick={this.__handleRulesView.bind(this)}>{ !scrollOpen ? `Как се играе?` : `Затвори` }</Link>
        {
          scrollOpen ?
            <div className='  bg-black bg-opacity-55 p-1 w-[40%] m-auto text-left border border-radius-[20px]'>
                <p>Целта на тази игра е да познаете 4-цифрено число в рамките на възможно най-малко опити.</p>
                <p>При всяко предположение ще получите обратна връзка, показваща колко бикове и крави сте получили с предположението.</p>
                <p>Bull означава: една от цифрите е правилна и е на правилното място.</p>
                <p>Cow означава: една от цифрите е правилно число, но не на правилното място.</p>
                <p>При първия опит трябва да има поне една намерена крава или бик!</p>
            </div> : ''
        }
      </div>
    );
  }
}

export default Rules;