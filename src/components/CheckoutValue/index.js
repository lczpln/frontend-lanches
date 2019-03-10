import React, { Component } from 'react';

import { Link } from 'react-router-dom'

export default class CheckoutValue extends Component {
  render() {
    const { checkoutValue } = this.props;
    const checkoutStyle = 'text-green semibold text-lg text-center';
    return (
      <div className="bg-white w-full fixed pin-b p-2 border-t border-grey shadow-inner select-none flex items-center justify-between" style={{ height: '80px' }}>
        <Link to="/"><button className="cursor-pointer bg-red border-b-4 border-red-dark rounded px-4 py-2 text-white font-bold hover:bg-red-light focus:outline-none">CANCELAR</button></Link>
        <span className={checkoutStyle}>
          TOTAL <p>R$ {parseFloat(checkoutValue).toFixed(2)}</p>
          <p className="text-grey text-sm">10% de desconto</p>
        </span>
        {checkoutValue
          ? <button className="cursor-pointer bg-blue border-b-4 border-blue-dark rounded px-4 py-2 text-white font-bold hover:bg-blue-light focus:outline-none">CHECKOUT</button>
          : null
        }
      </div>
    );
  }
}
