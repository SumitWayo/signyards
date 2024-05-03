// pages/cart.js
import { useCart } from "../pages/context/Cartcontext";
import products from "../public/data/product";
const Cart = () => {
  const { cartItems, increaseQuantity, decreaseQuantity } = useCart();

  // Calculate the total value of the cart
  const totalValue = cartItems.reduce((acc, item) => {
    const product = products.find((p) => p.id === item.id);
    return acc + (product ? product.price * item.quantity : 0);
  }, 0);

  return (
    <div className="container mx-auto mt-10 p-5">
      <h1 className="text-2xl font-bold mb-8">Cart</h1>
      <div className="flex flex-col space-y-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => {
            const product = products.find((p) => p.id === item.id);
            if (!product) {
              return (
                <div
                  key={item.id}
                  className="bg-red-100 p-4 shadow-md rounded-lg"
                >
                  <p>
                    Product details unavailable for ID: {item.id}. This item may
                    have been removed.
                  </p>
                </div>
              );
            }
            const totalPrice = product.price * item.quantity;
            return (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 shadow-md rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt || "Product Image"}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <div className="text-lg font-medium">{product.name}</div>
                    <div className="flex items-center">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-2 py-1 border rounded"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-2 py-1 border rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-lg font-medium text-gray-700">
                  ₹{totalPrice}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500">Your cart is empty.</div>
        )}
        {cartItems.length > 0 && (
          <div className="flex justify-end mt-8">
            <div className="p-4 bg-gray-100 rounded-lg shadow-md w-auto">
              <h2 className="text-lg font-bold">Total: ₹{totalValue}</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
