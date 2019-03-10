import React, { Component } from 'react';

export default class Recheio extends Component {
  render() {
    const img = require(`../../images/${this.props.color}`);
    return (
      <li
        id={`recheio-${this.props.id}`}
        className={`animated zoomInLeft rounded-sm uppercase mx-auto mb-1 text-${this.props.textColor} w-2/3 justify-center font-bold h-6 flex items-center`}
        style={{ background: `url(${img}) no-repeat`, backgroundSize: 'cover', maxWidth: '250px', width: '100%'}}>
        <span
          className="w-full h-full text-center flex justify-center items-center"
          style={{ backgroundColor: 'rgba(255, 255, 255, .1)', textShadow: '2px 1px 1px white' }}>
          {this.props.name}
        </span>
      </li>
    );
  }
}
