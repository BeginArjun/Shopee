type CartItems={
    id: number;
    product: string;
    qty: number;
    price: number;
}

export const getCartTotal = (cart: CartItems[]) => {
  let sum = 0;
  cart.map((item) => {
    sum += item.qty * item.price;
  });
  return Number.parseInt(sum.toFixed(2));
}
