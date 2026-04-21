import { useCart } from "../context/CartContext";

export default function CheckOut() {
  const {
    getCartItemsWithProducts,
    removeFromCart,
    updateCartItemQuantity,
    getCartTotal,
    clearCart,
  } = useCart();
  const cartItems = getCartItemsWithProducts();
  const cartTotal = getCartTotal();

  function placeOrder() {
    // Simulate placing the order (e.g., send data to an API)
    alert("Order placed successfully!");
    clearCart(); // Clear the cart after placing the order
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">CheckOut Page</h1>
      </div>
      <div className="checkout-container">
        <div className="checkout-items">
          <h2 className="checkout-section-title">Order Summary</h2>
          {cartItems.map((item) => (
            <div className="checkout-item" key={item.id}>
              <img
                src={item.product.image}
                alt={item.product.name}
                className="checkout-item-image"
              />
              <div className="checkout-item-details">
                <h3 className="checkout-item-name">{item.product.name}</h3>
                <p className="checkout-item-price">
                  Price: ${item.product.price.toFixed(2)} each
                </p>
              </div>

              <div className="checkout-item-controls">
                <div className="quantity-controls">
                  <button
                    className="qunatity-btn"
                    onClick={() =>
                      updateCartItemQuantity(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button
                    className="qunatity-btn"
                    onClick={() =>
                      updateCartItemQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <p className="checkout-item-total">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
                <button
                  className="btn btn-secondary btn-small"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="checkout-summary">
          <h2 className="checkout-section-title">Total</h2>
          <div className="checkout-total">
            <p className="checkout-total-label">Subtotal:</p>
            <p className="checkout-total-value">${cartTotal.toFixed(2)}</p>
          </div>

          <div className="checkout-total">
            <p className="checkout-total-label">Shipping:</p>
            <p className="checkout-total-value">$5.99</p>
          </div>
          <div className="checkout-total">
            <p className="checkout-total-label">Total:</p>
            <p className="checkout-total-value checkout-total-final">
              ${(cartTotal + 5.99).toFixed(2)}{" "}
            </p>
          </div>
          <button className="btn btn-primary btn-block" onClick={placeOrder}>
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
