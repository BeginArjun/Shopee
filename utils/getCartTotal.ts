type CartItems={
    id: number;
    product: string;
    qty: number;
    price: number;
}

const Total = (cart: CartItems[]) => {
  let sum = 0;
  cart.map((item) => {
    sum += item.qty * item.price;
  });
  return Number.parseInt(sum.toFixed(2));
}
