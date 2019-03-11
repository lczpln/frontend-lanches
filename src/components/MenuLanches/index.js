import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import api from '../../services/api';

export default class MenuLanches extends Component {
  state = {
    lanches: []
  }

  async componentDidMount() {
    const response = await api.get('/lanches');

    if (!response) return false;

    this.setState({ lanches: response.data });
  }

  render() {
    const { lanches } = this.state;

    return (
      <div>
        <ul className="select-none animated fadeInDown mx-auto flex-col justify-center items-center mt-16 p-4" style={{ width: '100%', maxWidth: '650px' }}>
          {lanches.map(lanche => (
            <Link
              to={{ pathname: `/lanches/${lanche.name}`, name: lanche.name, ingredients: lanche.ingredients, url: lanche.url }}
              key={lanche.name}
              className="no-underline"
              onClick={() => window.scrollTo(0, 0)}>
              <li
                className="animated fadeIn shadow-lg cursor-pointer w-full list-reset bg-orange p-2 mb-2 h-48 rounded-lg flex-col justify-center items-center"
                style={{ display: 'flex', flexDirection: 'column' }}>
                <img
                  className="rounded-full mb-2"
                  src={`${lanche.url}`} width={120} height={120} alt={lanche.name}
                />
                <h3 className="uppercase py-2" style={{ color: '#000' }}>{lanche.name}</h3>
              </li>
            </Link>
          ))}
        </ul>
        <div className="flex justify-center items-center mx-auto py-4">
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            <button className="cursor-pointer bg-blue border-b-4 border-blue-dark rounded px-4 py-2 text-white font-bold hover:bg-blue-light focus:outline-none text-sm">
              VOLTAR
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
