import { useRouter } from "next/router";
import products from "../../public/data/product";
import { useCart } from "../../pages/context/Cartcontext";
import Products from "@/components/Products";

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { cartItems, addToCart } = useCart();
  console.log(Products, "ddddd");

  const handleButtonClick = (product) => {
    const isInCart = cartItems.find((item) => item.id === product.id);
    if (isInCart) {
      router.push("/cart");
    } else {
      addToCart(product.id);

      console.log(`Product with ID ${product.id} added to cart`);
    }
  };

  const product = products.find((p) => `${p.id}` === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row p-4">
        <div className="flex-none md:w-1/2">
          <img
            src={product.imageSrc}
            alt={product.imageAlt}
            className="w-full h-auto max-w-md mx-auto"
          />
        </div>
        <div className="flex-grow md:w-1/2 md:pl-8">
          <h1 className="text-xl font-bold">{product.name}</h1>
          <p className="text-gray-700">Price: ₹{product.price}</p>
          <p>{product.description}</p>
          <button
            onClick={() => handleButtonClick(product)}
            className="mt-10 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {cartItems.find((item) => item.id === product.id)
              ? "Go to Cart"
              : "Add to Cart"}
          </button>
        </div>
      </div>
      <Products />
    </div>
  );
};

export default ProductDetail;
