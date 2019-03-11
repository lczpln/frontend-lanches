import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <div className="text-white w-full p-4 flex-col items-center justify-center" style={{minHeight: '15vh', backgroundColor: '#000'}}>
        <p className="mb-5 text-xl sm:text-1xl md:text-2xl">Onde nos encontrar</p>
        <p className="text-lg sm:text-xl md:text-1xl">R: exemplo nº 000</p>
        <p className="text-lg sm:text-xl md:text-1xl">Telefone: (19) 0000-0000</p>
      </div>
    );
  }
}
