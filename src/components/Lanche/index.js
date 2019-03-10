import React, { Component } from 'react';

import Recheio from '../Recheio';
import IngredientTab from '../IngredientTab';
import CheckoutValue from '../CheckoutValue';

import api from '../../services/api';

export default class Lanche extends Component {
  state = {
    ingredients: [],
    ingredientList: [],
    checkoutValue: 0,
    descontoTotal: 0,
    activeDiscounts: [{ name: "Light", bgColor: 'green-lighter' }, { name: "Carnivor", bgColor: 'orange-dark' }, { name: "X-plosion", bgColor: 'yellow-light' }],
  }

  async componentDidMount() {
    const response = await api.get('/ingredients');

    if (!response) return false;

    this.setState({ ingredients: response.data });
  }

  addIngredient = async (ingredientName, ingredientValue, textColor) => {
    let bgColor;

    switch (ingredientName) {
      case 'alface':
        bgColor = 'alface.jpg'
        break;
      case 'bacon':
        bgColor = 'bacon.jpg'
        break;
      case 'hambúrguer de carne':
        bgColor = 'hamburguer.jpg'
        break;
      case 'ovo':
        bgColor = 'egg.jpg'
        break;
      case 'queijo':
        bgColor = 'cheese.jpg'
        break;
      default:
        bgColor = 'white'
        break;
    }

    
    await this.setState({
      ingredientList: [...this.state.ingredientList, {
        id: Math.random(),
        value: ingredientValue,
        name: ingredientName,
        color: bgColor || "white",
        textColor: textColor || "inherit"
      }, ]
    })

    await this.setState({ checkoutValue: Number(Number(this.state.checkoutValue) + ingredientValue).toFixed(2) });

    console.log(`Total: ${this.state.checkoutValue}`)

  }

  checkDiscount = () => {
    if (this.ingredientFilter('alface') > 0 && this.ingredientFilter('bacon') < 1) {

    }
  }

  removeIngredient = (target) => {
    const { ingredientList } = this.state;

    const item = ingredientList.find(ingredient => ingredient.name === target);

    this.setState({ checkoutValue: this.state.checkoutValue - item.value }, () => console.log(this.state.checkoutValue))

    this.setState({
      ingredientList:
        ingredientList.filter(ingredient => ingredient.id !== item.id)
    })
  }

  toggleIngredientTab = () => {
    this.setState({ ingredientTab: !this.state.ingredientTab });
  }

  ingredientFilter = (target) => {
    const { ingredientList } = this.state;
    let count = 0;

    ingredientList.filter(ingredient => ingredient.name === target ? count++ : false);

    return count;
  }
  render() {
    const { ingredientList, activeDiscounts } = this.state;
    const breadTop = require('../../images/breadTop.jpg');
    const breadBottom = require('../../images/breadBottom.jpg');
    return (
      <React.Fragment>
        <div className="w-full max-w-md animated fadeInUp mx-auto p-10 mt-10">
          <div className="w-full mx-auto p-2">
            <div
              className="relative rounded-full rounded-b-none mx-auto mb-1 justify-center font-bold h-12 flex items-center"
              style={{ background: `url(${breadTop}) no-repeat`, backgroundSize: 'cover', maxWidth: '250px', width: '100%' }}>
              <span
                className="absolute pin-r pin-t z-10"
                style={{ transform: 'rotate(45deg)' }}>
                {activeDiscounts.map(discount => (
                  <p
                    key={discount.name}
                    className={`bg-${discount.bgColor} mt-1 rounded-lg px-2 text-center shadow-md`}>
                    {discount.name}
                  </p>
                ))}
              </span>
            </div>
            <ul className="list-reset">
              {!ingredientList.length ?
                <li
                  className={`rounded-full uppercase mx-auto mb-1 justify-center font-bold h-10 flex items-center`}
                  style={{ maxWidth: '300px', width: '100%' }}>
                  vazio
                </li>
                :
                ingredientList.map(ingredient => (
                  <Recheio key={ingredient.id} id={ingredient.id} name={ingredient.name} color={ingredient.color} textColor={ingredient.textColor} />
                ))}
            </ul>
            <div
              className="rounded-lg rounded-t-none mx-auto w-2/3 justify-center font-bold h-10 flex items-center"
              style={{ background: `url(${breadBottom}) no-repeat`, backgroundSize: 'cover', maxWidth: '250px', width: '100%' }}
            />
          </div>
        </div>
        <IngredientTab
          ingredients={this.state.ingredients}
          addIngredient={this.addIngredient}
          ingredientFilter={this.ingredientFilter}
          removeIngredient={this.removeIngredient}
        />
        <CheckoutValue
          checkoutValue={this.state.checkoutValue}
        />
      </React.Fragment>
    );
  }
}
