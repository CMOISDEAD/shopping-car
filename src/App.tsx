import axios from "axios";
import { useEffect } from "react";
import { useShop } from "./store/useShop";
import { toast } from "react-hot-toast";
import { CardProduct } from "./components/CardProduct";
import { Cart } from "./components/Cart";

function App() {
  const { products, setProducts } = useShop((state) => state);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        const data = res.data.products;
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch products");
      });
  }, []);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 grid-flow-rows gap-4 py-20">
        {products.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>
      <Cart />
    </div>
  );
}

export default App;
