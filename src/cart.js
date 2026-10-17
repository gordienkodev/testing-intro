function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(arr, product, count) {
  if (count === 0) throw new RangeError('Нельзя добавить нулевое количество товара.'); 

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
function calculateCartSubtotal() { return notImplemented(); }
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
