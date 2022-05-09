import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

class Header extends React.Component {
  render() {
    const { cartProducts } = this.props;
    return (
      <header
        data-testid="header-component"
        className={styles.header}
      >
        <Link to="/">
          <h1>
            online
            <b>store</b>
          </h1>
        </Link>
        <Link
          to="/shoppingCart"
          data-testid="shopping-cart-button"
          className={styles.header_cart}
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
      </header>
    );
  }
}

Header.propTypes = {
  cartProducts: PropTypes.oneOfType([
    PropTypes.array,
  ]).isRequired,
};

export default Header;
