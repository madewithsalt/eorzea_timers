export const loadState = (version = 2.0) => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }

    const state = JSON.parse(serializedState);

    if(!state || !state.version || state.version < version) {
      clearState();
      return saveState({ version });
    }

    return state;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);

    return state;
  } catch (err) {
    // Ignore write errors.
  }
};


export const clearState = (state) => {
  try {
    localStorage.setItem('state', {});
  } catch(err) {

  }
}
