import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div className="mx-auto bg-grey-light flex justify-center mt-10 p-4">
        <div className="flex justify-around w-2/3">
          <Link to="/lanches">
            <button className="bg-orange px-3 py-1 font-bold rounded border-b-2 border-orange-dark hover:bg-orange-light">
              Lanches
            </button>
          </Link>
          <Link to="/lanche">
          <button className="bg-orange px-3 py-1 font-bold rounded border-b-2 border-orange-dark hover:bg-orange-light">
              Criar Lanche
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
