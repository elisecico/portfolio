/* --------- initial state ------------------------------------------- */

const initialState = {
  nav: [
    {
      href: '/',
      label: 'Home',
    },
    {
      href: '/pokedex',
      label: 'Pokedex',
    },
    {
      href: '/contacts',
      label: 'Contatti',
    },
  ],
};

/* --------- actionTypes ------------------------------------------- */

const actionTypes = [];

/* --------- actions ------------------------------------------- */

const actions = {};

/* ---------------- api ----------------------------------------------- */

const moduleName = () => 'nav';
const stateNav = state => state.nav;

const api = {
  moduleName,
  nav: stateNav,
};

/* --------- reducer ------------------------------------------- */

const reducer = (state = initialState) => {
  return state;
};

/* ------------------------------------------------------------- */

const nav = { actionTypes, actions, api, reducer };

module.exports = nav;
