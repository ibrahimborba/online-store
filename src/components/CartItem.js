import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartItem extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
      disabled: false,
    };
  }

  sumProductQuantity = async () => {
    const { availability } = this.props;
    this.setState((prevState) => {
      if (availability <= prevState.quantity) {
        return {
          disabled: true,
        };
      } return {
        quantity: prevState.quantity + 1,
      };
    });
  };

  subProductQuantity = () => {
    this.setState((prevState) => {
      let nextQuantity = prevState.quantity - 1;
      if (prevState.quantity <= 1) nextQuantity = 0;
      return {
        quantity: nextQuantity,
      };
    });
  };

  render() {
    const {
      id, name, price, image, deleteProduct,
    } = this.props;
    const { quantity, disabled } = this.state;
    return (
      <div>
        <button
          id={id}
          type="button"
          onClick={deleteProduct}
        >
          X
        </button>
        <p data-testid="shopping-cart-product-name">{name}</p>
        <p>{ `${quantity * price}` }</p>
        <img src={image} alt={name} />
        <p data-testid="shopping-cart-product-quantity">{ quantity }</p>
        <button
          data-testid="product-decrease-quantity"
          type="button"
          id={id}
          onClick={this.subProductQuantity}
        >
          -
        </button>
        <button
          data-testid="product-increase-quantity"
          type="button"
          id={id}
          onClick={this.sumProductQuantity}
          disabled={disabled}
        >
          +
        </button>
      </div>
    );
  }
}

CartItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  availability: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};

export default CartItem;
