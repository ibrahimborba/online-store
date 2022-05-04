import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Categories extends Component {
  render() {
    const { category, handleClick } = this.props;
    return (
      <button
        id={ category.id }
        data-testid="category"
        type="button"
        onClick={ handleClick }
      >
        {category.name}
      </button>
    );
  }
}

Categories.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Categories;
