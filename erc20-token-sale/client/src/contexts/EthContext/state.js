const actions = {
  init: "INIT",
  update_user_token: "UPDATE_USER_TOKEN",
  update_total_suppy: "UPDATE_TOTAL_SUPPY",
};

const initialState = {
  artifacts: null,
  web3: null,
  accounts: null,
  networkID: null,
  contracts: null,
  userTokens: 0,
  total_supply: 0,
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.init:
      return { ...state, ...data };
    case actions.update_user_token: 
      return {...state, userTokens: data}
    case actions.update_total_suppy:
      return {...state, total_supply: data}
    default:
      throw new Error("Undefined reducer action type");
  }
};

export { actions, initialState, reducer };
