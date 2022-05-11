import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';
import Categories from '../components/Categories';
import ItemCard from '../components/ItemCard';
import Header from '../components/Header';
import styles from './Home.module.css';

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
  };

  onClickSearchButton = async () => {
    this.setState((prevState) => ({
      searchedList: prevState.searchedList,
    }), async () => {
      await this.updateSearchedList();
    });
  };

  onClickCategory = ({ target }) => {
    this.setState((prevState) => ({
      categoryId: target.id,
      searchedList: prevState.searchedList,
    }), async () => {
      await this.updateSearchedList();
    });
  };

  render() {
    const { categories, query, searchedList } = this.state;
    const { handleClick, cartProducts } = this.props;
    return (
      <div className={styles.appBody}>
        <Header cartProducts={cartProducts} className={styles.appBody_header} />
        <section className={styles.appBody_main}>
          <section className={styles.main_search}>
            <label htmlFor="search">
              <input
                id="search"
                type="text"
                data-testid="query-input"
                onChange={this.onInputChange}
                value={query}
              />
              <button
                type="button"
                data-testid="query-button"
                onClick={this.onClickSearchButton}
              >
                Pesquisar
              </button>
            </label>
          </section>
          { query.length === 0 && searchedList.length === 0
          && (
            <p
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )}
          <section className={styles.main_results}>
            { query.length !== 0
            && searchedList.length === 0
              ? <p>Nenhum produto foi encontrado</p>
              : (
                searchedList.map((item) => (
                  <ItemCard
                    key={item.id}
                    id={item.id}
                    name={item.title}
                    image={item.thumbnail}
                    price={item.price}
                    avaibleQuant={item.available_quantity}
                    freeShipping={item.shipping.free_shipping}
                    data-testid="product"
                    handleClick={handleClick}
                  />
                ))
              )}
          </section>
        </section>
        <aside className={styles.appBody_categories}>
          <h2>Categorias</h2>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                <Categories
                  category={category}
                  handleClick={this.onClickCategory}
                />
              </li>
            ))}
          </ul>
        </aside>
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
