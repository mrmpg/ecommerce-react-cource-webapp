import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart();

  useEffect(() => {
    // Simulate fetching product details from an API
    const foundProduct = getProductById(id);
    console.log(foundProduct);
    if (!foundProduct) {
      navigate("/"); // Redirect to home page if product not found
      return;
    }

    setProduct(foundProduct);
  }, [id, navigate]);

  if (!product) {
    return <h1> Loading...</h1>;
  }
  const productInCart = cartItems.find((item) => item.id === product.id);
  const productQuantity = productInCart ? `(${productInCart.quantity})` : "";

  return (
    <div className="page">
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-detail-content">
            <h2 className="product-detail-name">{product.name}</h2>
            <p className="product-detail-price">
              Price: ${product.price.toFixed(2)}
            </p>
            <p className="product-detail-description">{product.description}</p>
            <button
              className="btn btn-primary"
              onClick={() => addToCart(product.id)}
            >
              Add to Cart {productQuantity}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
