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
    totalDiscount: 0,
    activeDiscounts: [],
  }

  async componentDidMount() {
    const response = await api.get('/ingredients');

    if (!response) return false;

    await this.setState({ ingredients: response.data });

    if (this.props.location.ingredients) {
      this.props.location.ingredients.map(ingredient => (
        this.addIngredient(ingredient, this.getIngredientValue(ingredient))
      ))
    }
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
      ingredientList: [{
        id: Math.random(),
        value: ingredientValue,
        name: ingredientName,
        color: bgColor || "white",
        textColor: textColor || "inherit"
      }, ...this.state.ingredientList]
    })

    await this.setState({
      checkoutValue: Number(Number(this.state.checkoutValue) + ingredientValue).toFixed(2)
    });

    await this.setDiscount();
    this.discountValue();
  }

  setDiscount = async () => {
    const { activeDiscounts } = this.state;

    if (this.ingredientFilter('alface') > 0 && this.ingredientFilter('bacon') < 1 && this.discountFilter('light') < 1) {
      this.setState({
        activeDiscounts: [{ name: "light", bgColor: 'green-lighter' }, ...activeDiscounts]
      })
    } else if ((this.ingredientFilter('alface') < 1 || this.ingredientFilter('bacon') > 0) && this.discountFilter('light') > 0) {
      this.setState({
        activeDiscounts: activeDiscounts.filter(discount => discount.name !== 'light')
      })
    }

    if (this.ingredientFilter('hambúrguer de carne') >= 3 && this.discountFilter('carnivor') < 1) {
      this.setState({ activeDiscounts: [{ name: "carnivor", bgColor: 'orange-dark' }, ...activeDiscounts] })
    } else if (this.ingredientFilter('hambúrguer de carne') < 3 && this.discountFilter('carnivor') > 0) {
      this.setState({ activeDiscounts: activeDiscounts.filter(discount => discount.name !== 'carnivor') })
    }

    if (this.ingredientFilter('queijo') >= 3 && this.discountFilter('x-plosion') < 1) {
      this.setState({ activeDiscounts: [{ name: "x-plosion", bgColor: 'yellow-light' }, ...activeDiscounts] })
    } else if (this.ingredientFilter('queijo') < 3 && this.discountFilter('x-plosion') > 0) {
      this.setState({ activeDiscounts: activeDiscounts.filter(discount => discount.name !== 'x-plosion') })
    }

  }

  discountFilter = (target) => {
    const { activeDiscounts } = this.state;
    let count = 0;

    activeDiscounts.filter(discount => discount.name === target ? count++ : false);

    return count;
  }

  removeIngredient = async (target) => {
    const { ingredientList } = this.state;

    const item = ingredientList.find(ingredient => ingredient.name === target);

    await this.setState({ checkoutValue: this.state.checkoutValue - item.value });

    await this.setState({
      ingredientList:
        ingredientList.filter(ingredient => ingredient.id !== item.id)
    })

    await this.setDiscount();
    this.discountValue();
  }

  ingredientFilter = (target) => {
    const { ingredientList } = this.state;
    let count = 0;

    ingredientList.filter(ingredient => ingredient.name === target ? count++ : false);

    return count;
  }

  getIngredientValue = (target) => {
    const { ingredients } = this.state;

    const value = ingredients.find(ingredient => ingredient.name === target).value;

    return value;
  }

  discountValue = () => {
    const { checkoutValue } = this.state;

    let value = checkoutValue;

    if (this.discountFilter('carnivor') > 0) {
      const totalItems = this.ingredientFilter('hambúrguer de carne') / 3;

      value = value - (this.getIngredientValue('hambúrguer de carne') * totalItems);
    }

    if (this.discountFilter('x-plosion') > 0) {
      const totalItems = this.ingredientFilter('queijo') / 3;

      value = value - (this.getIngredientValue('queijo') * totalItems);
    }

    if (this.discountFilter('light') > 0) {
      value = value * 0.9
    }

    return this.setState({ totalDiscount: Number(value).toFixed(2) });
  }

  render() {
    const { ingredientList, activeDiscounts } = this.state;
    const breadTop = require('../../images/breadTop.jpg');
    const breadBottom = require('../../images/breadBottom.jpg');

    return (
      <React.Fragment>
        <div className="mt-10 select-none w-full h-full max-w-md animated fadeInUp mx-auto p-10" style={{ marginBottom: '300px' }}>
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
                    className={`bg-${discount.bgColor} animated rubberBand mt-1 rounded-lg px-2 capitalize text-center shadow-md`}>
                    {discount.name}
                  </p>
                ))}
              </span>
            </div>
            <ul className="list-reset">
              {!ingredientList.length ?
                <li
                  className={`rounded-full uppercase mx-auto mb-1 justify-center font-bold h-6 flex items-center`}
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
          addIngredient={this.addIngredient.bind(this)}
          ingredientFilter={this.ingredientFilter.bind(this)}
          removeIngredient={this.removeIngredient.bind(this)}
          discountValue={this.discountValue.bind(this)}
        />
        <CheckoutValue
          activeDiscounts={this.state.activeDiscounts}
          checkoutValue={this.state.checkoutValue}
          discountFilter={this.discountFilter.bind(this)}
          totalDiscount={this.state.totalDiscount}
        />
      </React.Fragment>
    );
  }
}
