import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Categories.module.css';

class Categories extends Component {
  render() {
    const { category, handleClick } = this.props;
    return (
      <button
        id={category.id}
        data-testid="category"
        type="button"
        onClick={handleClick}
        className={styles.btnCategory}
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
