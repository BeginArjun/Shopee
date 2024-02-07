type CartItems={
    id: number;
    product: string;
    qty: number;
    price: number;
}

export const getCartTotal = (cart: CartItems[]) => {
  let sum = 0;
  cart.map((item) => {
    console.log(item.qty)
    sum += item.qty * item.price;
    console.log(sum)
  });
  return Number.parseInt(sum.toPrecision());
}
