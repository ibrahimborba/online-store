import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';
import Header from '../components/Header';

class ProductsDetails extends Component {
  constructor() {
    super();
    const RATE_ONE = 1;
    const RATE_TWO = 2;
    const RATE_THREE = 3;
    const RATE_FOUR = 4;
    const RATE_FIVE = 5;
    this.state = {
      name: '',
      details: [],
      image: '',
      price: '',
      freeShipping: false,
      rating: [RATE_ONE, RATE_TWO, RATE_THREE, RATE_FOUR, RATE_FIVE],
      rate: 0,
      email: '',
      description: '',
      savedEval: JSON.parse(localStorage.getItem('savedEval')) || [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const pegarApi = await api.getDetailsProducts(id);
    const {
      price, thumbnail, title, attributes, shipping,
    } = pegarApi;
    this.setState({
      price,
      image: thumbnail,
      name: title,
      details: [...attributes],
      freeShipping: shipping.free_shipping,
    });
  }

  onClickRating = ({ target }) => {
    this.setState({ rate: Number(target.value) });
  };

  onInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.setState((prevState) => {
      const prevEval = {
        email: prevState.email,
        description: prevState.description,
        rate: prevState.rate,
      };
      const newEval = [...prevState.savedEval, prevEval];
      localStorage.setItem('savedEval', JSON.stringify(newEval));
      return {
        savedEval: newEval,
      };
    });
  };

  render() {
    const {
      price,
      image,
      name,
      details,
      freeShipping,
      rating,
      rate,
      email,
      description,
      savedEval,
    } = this.state;
    const { handleClick, cartProducts, match: { params: { id } } } = this.props;
    return (
      <div>
        <Header cartProducts={cartProducts} />
        <div>
          <h1 data-testid="product-detail-name">{name}</h1>
          <h3>{price}</h3>
          { freeShipping && <p data-testid="free-shipping">Frete Grátis</p>}
          <img
            src={image}
            alt="imagem do produto"
          />
          { details.map((i) => (
            <p key={i.id}>
              {i.name}
              {' '}
              {i.value_name}
            </p>
          ))}
        </div>
        <button
          data-testid="product-detail-add-to-cart"
          id={id}
          value={`${name}___${price}___${image}`}
          type="button"
          onClick={handleClick}
        >
          Comprar
        </button>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="email">
            Email
            <input
              data-testid="product-detail-email"
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={this.onInputChange}
            />
          </label>
          {
            rating.map((rateValue) => (
              <label
                key={rateValue}
                htmlFor={`rate-${rateValue}`}
              >
                <input
                  data-testid={`${rateValue}-rating`}
                  id={`rate-${rateValue}`}
                  type="radio"
                  value={rateValue}
                  checked={rateValue <= rate}
                  onChange={this.onClickRating}
                />
              </label>
            ))

          }
          <label htmlFor="description">
            Avaliação
            <input
              data-testid="product-detail-evaluation"
              id="description"
              type="text"
              name="description"
              value={description}
              onChange={this.onInputChange}
            />
          </label>
          <button
            data-testid="submit-review-btn"
            type="submit"
          >
            Avaliar
          </button>
        </form>
        <div>
          { savedEval.map((item) => (
            <div key={item.email}>
              <p>{ item.email }</p>
              <p>{ item.rate }</p>
              <p>{ item.description }</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
ProductsDetails.propTypes = {
  match: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
  handleClick: PropTypes.func.isRequired,
  cartProducts: PropTypes.oneOfType([
    PropTypes.array,
  ]).isRequired,
};

export default ProductsDetails;
