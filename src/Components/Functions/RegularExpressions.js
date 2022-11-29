const validateVariableCheck = (e) => /({{[a-zA-Z]+}})/gm.test(e);

export { validateVariableCheck };
