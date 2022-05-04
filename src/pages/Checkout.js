import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CartItem from '../components/CartItem';
import CheckoutInput from '../components/CheckoutInput';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      fullname: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
    };
  }

  onInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  deleteProduct = ({ target }) => {
    console.log(target);
  }

  render() {
    const {
      fullname,
      email,
      cpf,
      phone,
      cep,
      address } = this.state;
    const { cartProducts } = this.props;

    return (
      <div>
        <Link to="/">
          <p>Voltar</p>
        </Link>
        {
          cartProducts.map((product) => (
            <CartItem
              key={ product.id }
              id={ product.id }
              name={ product.title }
              price={ product.price }
              image={ product.thumbnail }
              deleteProduct={ this.deleteProduct }
            />
          ))
        }
        <p>
          {
            cartProducts.reduce((acc, product) => {
              let totalPrice = 0;
              totalPrice = acc + product.price;
              return totalPrice;
            }, 0)
          }
        </p>
        <form>
          <CheckoutInput
            dataTestId="checkout-fullname"
            id="fullname"
            htmlFor="fullname"
            label="Nome Completo"
            type="text"
            name="fullname"
            value={ fullname }
            onChange={ this.onInputChange }
          />
          <CheckoutInput
            dataTestId="checkout-email"
            id="email"
            htmlFor="email"
            label="Email"
            type="email"
            name="email"
            value={ email }
            onChange={ this.onInputChange }
          />
          <CheckoutInput
            dataTestId="checkout-cpf"
            id="cpf"
            htmlFor="cpf"
            label="CPF"
            type="text"
            name="cpf"
            value={ cpf }
            onChange={ this.onInputChange }
          />
          <CheckoutInput
            dataTestId="checkout-phone"
            id="phone"
            htmlFor="phone"
            label="Telefone"
            type="text"
            name="phone"
            value={ phone }
            onChange={ this.onInputChange }
          />
          <CheckoutInput
            dataTestId="checkout-cep"
            id="cep"
            htmlFor="cep"
            label="CEP"
            type="text"
            name="cep"
            value={ cep }
            onChange={ this.onInputChange }
          />
          <CheckoutInput
            dataTestId="checkout-address"
            id="address"
            htmlFor="address"
            label="Endereço"
            type="text"
            name="address"
            value={ address }
            onChange={ this.onInputChange }
          />
          <button type="button">
            Comprar
          </button>
        </form>
      </div>
    );
  }
}

Checkout.propTypes = {
  cartProducts: PropTypes.oneOfType([
    PropTypes.array,
  ]).isRequired,
};

export default Checkout;
