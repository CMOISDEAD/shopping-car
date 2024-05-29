import { useState } from "react";
import { Button, ButtonGroup, Card, CardBody, Image } from "@nextui-org/react";
import { LiaPlusSolid, LiaMinusSolid, LiaTrashAlt } from "react-icons/lia";
import { toast } from "react-hot-toast";
import { useShop } from "../store/useShop";

interface Props {
  product: ProductInterface;
}

export const CartProduct = ({ product }: Props) => {
  const { removeProductFromCar } = useShop((state) => state);
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    if (quantity <= product.stock) {
      setQuantity(quantity + 1);
    } else {
      toast.error("Product out of stock");
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      toast.error("Quantity must be greater than 0");
    }
  };

  return (
    <Card key={product.id}>
      <CardBody className="flex flex-col md:flex-row gap-2">
        <Image src={product.thumbnail} alt={product.title} />
        <div className="flex flex-col justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-xs">
              $ {product.price} x {quantity}
            </p>
          </div>

          <div className="flex justify-between content-center items-center gap-4">
            <ButtonGroup
              fullWidth
              isIconOnly
              size="sm"
              variant="flat"
              color="primary"
            >
              <Button onPress={decrement}>
                <LiaMinusSolid />
              </Button>
              <Button disabled={true} isDisabled={true}>
                {quantity}
              </Button>
              <Button onPress={increment}>
                <LiaPlusSolid />
              </Button>
            </ButtonGroup>

            <Button
              fullWidth
              isIconOnly
              size="sm"
              variant="flat"
              color="danger"
              onPress={() => removeProductFromCar(product)}
            >
              <LiaTrashAlt />
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
