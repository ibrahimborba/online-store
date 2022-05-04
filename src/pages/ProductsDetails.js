import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as api from '../services/api';

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
    const { price, thumbnail, title, attributes, shipping } = pegarApi;
    this.setState({
      price,
      image: thumbnail,
      name: title,
      details: [...attributes],
      freeShipping: shipping.free_shipping });
  }

  onClickRating = ({ target }) => {
    this.setState({ rate: Number(target.value) });
  }

  onInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

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
  }

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
      savedEval } = this.state;
    const { handleClick, cartProducts, match: { params: { id } } } = this.props;
    return (
      <div>
        <Link
          to="/shoppingCart"
          data-testid="shopping-cart-button"
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABI
            CAMAAABiM0N1AAAAjVBMVEVHcExmdX9mdX9mdX8pLzNmdX9mdX9mdX9mdX8
            pLzMpLzMpLzNmdX9mdX8pLzNmdX9mdX9mdX9mdX9mdX9mdX+FjJCzur9mdX8
            pLzPG0Ndse4WAjZeZpq5ebHY0PEGTn6ifrLTh6O01Oz+zvsZPW2M4QUaGk5y
            suMC/xcqmsrp5h5EtMzjM1t2/ytG5xMvxlChcAAAAFXRSTlMAMO8Qv7/PQIBgI
            M+vj+9gcJ8gUN+h1hZ8AAAB1ElEQVR4Xu2W13LyMBBG3XADUn7iSu8l5f0f75c
            EyedotAjjveAi52pn1hxjn0GDcxt/xAV4c+/3+EWTAZco7PhowGHAlSKXwyRFIw5
            RKEQxh2iAbN2Ika0bI9ZsEVe254fL1uPJ1p6
            YyNYeIlt7iGyt8YyintjMPxRjNV6Qgu95LuYxRnOcV1yE6yHCHTAOyWz1WTQR48
            kkOol5ch5rMb4YRVEhqJRo3/ywPu/VVNE/qX9Fa3zHCEM0ZGsFounZ2oFodLadG
            HfNaki+s0VDtkv/sVk00aJR2dZKdGw018ajmtaIRmRb4LpKF1W40wLROmRDNJ5sQ
            5ZDEtGIbC1ANDob+qMa6iOaNZuqUuuiGmtEow9J9NdFqD9HNMsh+YkPyQnyL/p4B
            FHIEs3v8UTzw6IdPtOxFhOeZ7n04uhWrv4Z8VynO/i2DKKIT/RIjxbyvGzk5/lKi
            s22FGw3hYa2IzO7ntpNZ+WF2bQAxM4xmkLpeS9/eNdMhh31nsJC3BPMiiaGHZ05k
            YJVlufZSk6JZUcTSM9hKThIU2DZ0ZSCbKnI5HxtZxXlZ1EOEbHjEjE+Gv/L5s8P+
            mWDvnVHkz7B85TadzTpz337qWVnIwmkJkgsuwfmP7o+1cJrCT8WAAAAAElFTkSuQmCC"
            alt="Imagem do carrinho de compras"
          />
          <p data-testid="shopping-cart-size">{cartProducts.length}</p>
        </Link>
        <div>
          <h1 data-testid="product-detail-name">{name}</h1>
          <h3>{price}</h3>
          { freeShipping && <p data-testid="free-shipping">Frete Grátis</p>}
          <img
            src={ image }
            alt="imagem do produto"
          />
          { details.map((i) => (
            <p key={ i.id }>
              {i.name}
              {' '}
              {i.value_name}
            </p>))}
        </div>
        <button
          data-testid="product-detail-add-to-cart"
          id={ id }
          value={ `${name}___${price}___${image}` }
          type="button"
          onClick={ handleClick }
        >
          Comprar
        </button>
        <form onSubmit={ this.onSubmit }>
          <label htmlFor="email">
            Email
            <input
              data-testid="product-detail-email"
              id="email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.onInputChange }
            />
          </label>
          {
            rating.map((rateValue) => (
              <label
                key={ rateValue }
                htmlFor={ `rate-${rateValue}` }
              >
                <input
                  data-testid={ `${rateValue}-rating` }
                  id={ `rate-${rateValue}` }
                  type="radio"
                  value={ rateValue }
                  checked={ rateValue <= rate }
                  onChange={ this.onClickRating }
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
              value={ description }
              onChange={ this.onInputChange }
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
            <div key={ item.email }>
              <p>{ item.email }</p>
              <p>{ item.rate }</p>
              <p>{ item.description }</p>
            </div>))}
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
