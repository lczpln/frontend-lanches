import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <header className="z-20 fixed select-none pin-t w-screen bg-orange shadow-lg p-2 flex h-12 justify-center items-center">
        <Link to="/" style={{textDecoration: 'none'}}>
          <img
            src={require('../../images/hambLogo.jpg')}
            alt="hambLogo.jpg"
            height={10}
            width={30}
          />
          <h1 className="inline ml-2 text-white font-semibold">Food App</h1>
        </Link>
      </header>
    );
  }
}
