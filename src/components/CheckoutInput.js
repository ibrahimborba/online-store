import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CheckoutInput extends Component {
  render() {
    const { dataTestId, id, htmlFor, type, name, label, value, onChange } = this.props;

    return (
      <label htmlFor={ htmlFor }>
        { label }
        <input
          data-testid={ dataTestId }
          id={ id }
          type={ type }
          name={ name }
          value={ value }
          onChange={ onChange }
        />
      </label>
    );
  }
}

CheckoutInput.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CheckoutInput;
