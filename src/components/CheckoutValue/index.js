import React, { Component } from 'react';

import { Link } from 'react-router-dom'

export default class CheckoutValue extends Component {
  render() {
    const { checkoutValue, activeDiscounts, totalDiscount } = this.props;

    const checkoutStyle = `${
      activeDiscounts.length > 0
        ? 'line-through text-grey text-sm text-center'
        : 'antialiased text-center text-green text-center font-semibold'
      }`;

    return (
      <div className="animated fadeInUp bg-black sm:bg-white w-full fixed pin-b p-2 border-t border-grey shadow-inner select-none flex items-center justify-between" style={{ height: '80px' }}>
        <Link to="/">
          <button className="cursor-pointer bg-red border-b-4 border-red-dark rounded px-4 py-2 text-white font-bold hover:bg-red-light focus:outline-none text-sm">
            CANCELAR
          </button>
        </Link>
        <span>
          <span className={checkoutStyle}>
            <p>TOTAL</p>
            <p>R$ {parseFloat(checkoutValue).toFixed(2)}</p>
          </span>
          {activeDiscounts.length > 0
            ? <p className="text-center text-green text-md no-underline font-semibold uppercase">Promoção R$ {totalDiscount}</p>
            : null
          }
        </span>
        {checkoutValue
          ? <button className="cursor-pointer bg-blue border-b-4 border-blue-dark rounded px-4 py-2 text-white font-bold hover:bg-blue-light focus:outline-none text-sm">CHECKOUT</button>
          : null
        }
      </div>
    );
  }
}
