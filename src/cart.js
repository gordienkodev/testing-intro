function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(arr, product, count) {
  if (count <= 0) throw new RangeError('Нельзя добавить количество товара ноль или меньше.'); 

  if (count > product.stock) throw new RangeError('Нельзя добавить больше товара, чем есть на складе.');
  
  const existingProduct = arr.find((item) => item.id === product.id);

  if (existingProduct) return arr.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + count } : item);

  return [...arr, { ...product, quantity: count }] 
}
function changeQuantity(cart, id, quantity) {
  const product = cart.find((item) => item.id === id);

  if (!product) return cart;

  if (quantity <= 0) throw new RangeError('Количество должно быть положительным.');

  if (quantity > product.stock) {
      throw new RangeError('Количество превышает остаток на складе.');
    }

  return cart.map((item) => item.id === id ? { ...item, quantity } : item);

 }
function removeFromCart(cart, id) { 
  return cart.filter((item) => item.id !== id);
 }
function calculateCartSubtotal(cart) { 
  return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
 }
function calculateOrderTotal(cart, promo) { 
  const subtotal = calculateCartSubtotal(cart);
  let subdelivery;
  let subdiscount;

  if (subtotal >= 50000) {
    subdelivery = 0;
  }
  else {
    subdelivery = 30000;
  }
  
  if (promo !== 'SAVE10' || subtotal < 20000) {
    subdiscount = 0;
  }
  else {
    subdiscount = subtotal * 0.1;
  }
  
  return { subtotal, discount: subdiscount, delivery: subdelivery, total: subtotal - subdiscount + subdelivery };
 }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
