import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ItemCard extends Component {
  render() {
    const {
      name,
      image,
      price,
      id,
      avaibleQuant,
      freeShipping,
      handleClick,
    } = this.props;
    return (
      <div data-testid="product">
        <Link
          to={`/productsDetails/${id}`}
          data-testid="product-detail-link"
        >
          <div>{name}</div>
          <img src={image} alt={name} />
          <div>{price}</div>
          { freeShipping && <p data-testid="free-shipping">Frete Grátis</p>}
        </Link>
        <button
          data-testid="product-add-to-cart"
          id={id}
          value={`${name}___${price}___${image}___${avaibleQuant}`}
          type="button"
          onClick={handleClick}
        >
          Comprar
        </button>
      </div>
    );
  }
}

ItemCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  avaibleQuant: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  freeShipping: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ItemCard;
