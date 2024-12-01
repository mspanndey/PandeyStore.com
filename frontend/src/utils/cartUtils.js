export const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2); // Fixed rounding
};

export const updateCart = (state) => {
  // Calculate item price
  state.itemsprice = addDecimal(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  ); // Fixed cartItems typo and added initial value for reduce

  // Calculate shipping price
  state.shippingprice = addDecimal(state.itemsprice > 100 ? 0 : 10);

  // Calculate the tax price
  state.taxprice = addDecimal(Number((0.18 * state.itemsprice).toFixed(2)));

  // Calculate the total price
  state.totalprice = (
    Number(state.itemsprice) +
    Number(state.shippingprice) +
    Number(state.taxprice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state)); // Fixed JSON.stringify

  return state;
};
