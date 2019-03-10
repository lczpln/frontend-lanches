import React, { Component } from 'react';

import api from '../../services/api';

export default class MenuLanches extends Component {
  state = {
    lanches: []
  }

  async componentDidMount() {
    const response = await api.get('/lanches');

    if (!response) return false;

    this.setState({ lanches: response.data }, () => {
    })
  }

  render() {
    const { lanches } = this.state;

    return (
      <div>
        <ul className="mx-auto flex-col w-2/3 mt-10">
          {lanches.map(lanche => (
            <li className="list-reset bg-grey-light p-2 mb-2 rounded-lg">
              <h2 className="uppercase py-2">{lanche.name}</h2>
              <h3>Ingredientes</h3>
                <ul className="list-reset mt-2">
                  
                {lanche.ingredients.map(ingredient => (
                  <li className="text-grey-darktest">{ingredient}</li>
                ))}
                </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
