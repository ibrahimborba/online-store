import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as api from '../services/api';
import Categories from '../components/Categories';
import ItemCard from '../components/ItemCard';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      categoryId: '',
      query: '',
      searchedList: [],
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    this.setState(async () => {
      const categories = await api.getCategories();
      this.setState({
        categories: [...categories],
      });
    });
  }

  onInputChange({ target }) {
    const { value } = target;
    this.setState({
      query: value,
    });
  }

  updateSearchedList = async () => {
    const { categoryId, query } = this.state;
    await api.getProductsFromCategoryAndQuery(categoryId, query)
      .then((itens) => {
        this.setState({
          searchedList: itens.results,
        });
      });
  }

  onClickSearchButton = async () => {
    this.setState((prevState) => ({
      searchedList: prevState.searchedList,
    }), async () => {
      await this.updateSearchedList();
    });
  }

  onClickCategory = ({ target }) => {
    this.setState((prevState) => ({
      categoryId: target.id,
      searchedList: prevState.searchedList,
    }), async () => {
      await this.updateSearchedList();
    });
  }

  render() {
    const { categories, query, searchedList } = this.state;
    const { handleClick, cartProducts } = this.props;
    return (
      <div>
        <label htmlFor="search">
          <input
            id="search"
            type="text"
            data-testid="query-input"
            onChange={ this.onInputChange }
            value={ query }
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.onClickSearchButton }
          >
            Pesquisar
          </button>
        </label>
        { query.length === 0
          && (
            <p
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>)}
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
        <aside>
          <p>Categorias</p>
          <ul>
            {categories.map((category) => (
              <li key={ category.id }>
                <Categories
                  category={ category }
                  handleClick={ this.onClickCategory }
                />
              </li>
            ))}
          </ul>
        </aside>
        { query.length !== 0
          && searchedList.length === 0
          ? <p>Nenhum produto foi encontrado</p>
          : (
            searchedList.map((item) => (
              <ItemCard
                key={ item.id }
                id={ item.id }
                name={ item.title }
                image={ item.thumbnail }
                price={ item.price }
                avaibleQuant={ item.available_quantity }
                freeShipping={ item.shipping.free_shipping }
                data-testid="product"
                handleClick={ handleClick }
              />
            ))
          )}
      </div>
    );
  }
}

Home.propTypes = {
  handleClick: PropTypes.func.isRequired,
  cartProducts: PropTypes.oneOfType([
    PropTypes.array,
  ]).isRequired,
};

export default Home;
