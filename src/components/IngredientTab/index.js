import React, { Component } from 'react';

export default class IngredientTab extends Component {
  render() {
    const { ingredients } = this.props;
    const buttonStyle = `focus:outline-none focus:bg-grey-light font-bold rounded-lg px-5 py-1 bg-grey-light border-b-4 border-grey hover:bg-grey-lightest`;
    return (
      <ul className="bg-white fixed list-reset w-full items-center flex flex-wrap overflow-x-hidden overflow-y-scroll border-t font-semibold" style={{ bottom: '80px', maxHeight: '300px', height: '20vh' }}>
        {ingredients.map(ingredient => (
          <li key={ingredient.name} className="relative mx-auto w-full flex shadow-inner items-center justify-between p-4" style={{ maxHeight: '100px', height: '10vh' }}>
            <div className="flex-col items-center justify-center w-2/5">
              <p className="uppercase text-center">{ingredient.name}</p>
              <p className="text-center">R$ {ingredient.value.toFixed(2)}</p>
            </div>
            <div className="flex justify-around items-center py-2 w-2/5">
              <button className={buttonStyle}
                onClick={() => this.props.removeIngredient(ingredient.name)}
                disabled={this.props.ingredientFilter(ingredient.name) < 1}>
                -
              </button>
              <span>{this.props.ingredientFilter(ingredient.name)}</span>
              <button className={buttonStyle}
                onClick={() => this.props.addIngredient(ingredient.name, ingredient.value)}>
                +
              </button>
            </div>
            <div className="flex items-center justify-end w-1/5">
              <span className="text-right text-green">R$ {parseFloat(this.props.ingredientFilter(ingredient.name) * ingredient.value).toFixed(2)}</span>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}
