import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export default class LancheInfo extends Component {

  componentWillMount() {
    if (!this.props.location.name) return this.props.history.push('/lanches');
  }

  render() {
    const { name, url, ingredients } = this.props.location;

    return (
      <React.Fragment>
        <div className="select-none animated fadeIn bg-orange mt-10 p-4 w-full" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', maxWidth: '100%' }}>
          <div className="animated fadeInDown rounded-lg">
            <img
              src={url}
              alt={name}
              style={{ width: '100%', maxWidth: '250px' }}
            />
          </div>
          <h1 className="animated fadeInUp text-center uppercase text-3xl py-4">{name}</h1>
          <ul className="animated fadeInUp list-reset text-1xl">
            <span className="slideInUp font-semibold text-2xl py-2">Ingredientes:</span>
            {ingredients
              ? ingredients.map(ingredient => (
                <li className="mt-2 capitalize" key={ingredient}>{ingredient}</li>
              ))
              : null
            }
          </ul>
          <div className="animated fadeInUp mt-6 flex justify-around p-2 w-full">
            <Link to="/lanches">
              <button className="cursor-pointer bg-red border-b-4 border-red-dark rounded px-4 py-2 text-white font-bold hover:bg-red-light focus:outline-none text-sm">
                CANCELAR
            </button>
            </Link>
            <Link to={{ pathname: `/personalizar`, ingredients: ingredients }}>
              <button className="cursor-pointer bg-blue border-b-4 border-blue-dark rounded px-4 py-2 text-white font-bold hover:bg-blue-light focus:outline-none text-sm">
                ESCOLHER
            </button>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
