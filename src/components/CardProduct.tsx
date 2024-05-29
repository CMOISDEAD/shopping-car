import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { LiaShoppingBagSolid, LiaStar } from "react-icons/lia";
import { useShop } from "../store/useShop";
import { toast } from "react-hot-toast";

interface Props {
  product: ProductInterface;
}

export const CardProduct = ({ product }: Props) => {
  const [isAdded, setIsAdded] = useState(false);
  const { car, addProductToCar } = useShop((state) => state);

  useEffect(() => {
    const found = car.find((item) => item.id === product.id);
    setIsAdded(!!found);
  }, [car]);

  const handleAdd = () => {
    addProductToCar(product);
    setIsAdded(true);
    toast.success("Product added to cart");
  };

  return (
    <Card
      isBlurred
      isHoverable
      className={`border ${isAdded ? "border-success/40" : "border-transparent"} transition-all`}
    >
      <CardHeader>
        <Image isBlurred src={product.thumbnail} alt={product.title} />
      </CardHeader>
      <CardBody>
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-sm line-clamp-1 md:line-clamp-3">
          {product.description}
        </p>
      </CardBody>
      <CardFooter>
        <div className="flex content-center items-center justify-between gap-2 w-full">
          <div className="flex flex-col">
            <p className="text-xs">{product.price}</p>
            <p className="text-xs text-yellow-600 flex content-center items-center gap-1">
              <LiaStar />
              {product.rating}
            </p>
            <p className="text-xs text-yellow-600 flex content-center items-center gap-1">
              stock: {product.stock}
            </p>
            <p className="text-xs text-yellow-600 flex content-center items-center gap-1">
              category: {product.category}
            </p>
          </div>
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            color={"success"}
            onPress={handleAdd}
            disabled={isAdded}
            isDisabled={isAdded}
          >
            <LiaShoppingBagSolid />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
