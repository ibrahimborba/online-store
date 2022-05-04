import React, { Component } from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import ProductsDetails from './pages/ProductsDetails';
import Checkout from './pages/Checkout';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cartProductsIds: [],
      cartProducts: JSON.parse(localStorage.getItem('cartProducts')) || [],
    };
  }

  handleClick = async (event) => {
    const { target } = event;
    const { value } = target;
    const targetValuesArr = value.split('___');
    console.log(targetValuesArr);
    const product = {
      id: target.id,
      title: targetValuesArr[0],
      price: Number(targetValuesArr[1]),
      thumbnail: targetValuesArr[2],
      availability: Number(targetValuesArr[3]),
    };

    this.setState((prevState) => {
      const newProducts = [...prevState.cartProducts, product];
      localStorage.setItem('cartProducts', JSON.stringify(newProducts));
      return {
        cartProductsIds: [...prevState.cartProductsIds, target.id],
        cartProducts: newProducts,
      };
    });
  }

  render() {
    const { cartProductsIds, cartProducts } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/productsDetails/:id"
            render={ (props) => (<ProductsDetails
              { ...props }
              handleClick={ this.handleClick }
              cartProducts={ cartProducts }
            />) }
          />
          <Route
            exact
            path="/shoppingCart"
            render={ (props) => (<ShoppingCart
              { ...props }
              cartProductsIds={ cartProductsIds }
              cartProducts={ cartProducts }
            />) }
          />
          <Route
            exact
            path="/checkout"
            render={ (props) => (<Checkout
              { ...props }
              cartProductsIds={ cartProductsIds }
              cartProducts={ cartProducts }
            />) }
          />
          <Route
            exact
            path="/"
            render={ (props) => (<Home
              { ...props }
              handleClick={ this.handleClick }
              cartProducts={ cartProducts }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
