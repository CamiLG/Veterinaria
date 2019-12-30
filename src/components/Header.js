import PropTypes from 'prop-types';
import React from 'react';
const Header = ({titulo}) => (
    <header>
        <h1 className="text-center">{titulo}</h1>
    </header>
  );
Header.propTypes= {
  titulo: PropTypes.string.isRequired
}
 
export default Header;