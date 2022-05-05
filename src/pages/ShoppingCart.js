import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CartItem from '../components/CartItem';

class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    const { cartProducts } = this.props;
    this.setState({
      products: cartProducts,
    });
  }

  deleteProduct = ({ target }) => {
    const { products } = this.state;
    const productsFiltered = products.filter((product) => product.id !== target.id);
    this.setState({
      products: productsFiltered,
    });
  };

  render() {
    const { products } = this.state;
    return (
      <div>
        <Link to="/">
          <p>Voltar</p>
        </Link>
        {
          products.length === 0 ? (
            <h2
              data-testid="shopping-cart-empty-message"
            >
              Seu carrinho está vazio
            </h2>
          ) : (
            products.map((product) => (
              <CartItem
                key={product.id}
                id={product.id}
                name={product.title}
                price={product.price}
                image={product.thumbnail}
                availability={product.availability}
                deleteProduct={this.deleteProduct}
              />
            ))
          )
        }
        <Link to="/checkout">
          <button
            data-testid="checkout-products"
            type="button"
          >
            Finalizar Compra
          </button>
        </Link>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  cartProducts: PropTypes.oneOfType([
    PropTypes.array,
  ]).isRequired,
};

export default ShoppingCart;
