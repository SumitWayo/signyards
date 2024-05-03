// pages/[id].js
import { useRouter } from "next/router";
import products from "../public/data/product";

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const product = products.find((p) => `${p.id}` === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{product.name}</h1>
      <img
        src={product.imageSrc}
        alt={product.imageAlt}
        className="w-full h-auto"
      />
      <p className="text-gray-700">Price: ₹{product.price}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetail;
