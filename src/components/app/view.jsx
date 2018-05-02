/* ---------------- imports --------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';
import classNames from 'classnames';
import { history } from '../../store';

/* ---------------- component view --------------------------------------------------------- */

export default function View({
  children,
  nav,
}) {
  const renderNav = (navItem) => {
    const navItemStyle = classNames({
      nav__item: true,
      active: history.getCurrentLocation().pathname === navItem.href,
    });
    return (
      <Link
        key={navItem.href}
        to={navItem.href}
        className={navItemStyle}
      >{navItem.label}</Link>
    );
  };
  return (
    <div className="app">
      <div className="nav">
        <Link
          className="nav__title"
          to={nav[0].href}
        >
          Eli<span>&#39;s Place</span>
        </Link>
        {nav.map(renderNav)}
      </div>
      {children}
    </div>
  );
}

View.propTypes = {
  children: PropTypes.element,
  nav: PropTypes.array.isRequired,
};

View.defaultProps = {
  children: null,
};
