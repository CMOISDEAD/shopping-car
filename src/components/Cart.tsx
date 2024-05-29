import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useShop } from "../store/useShop";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { CartProduct } from "./CartProduct";
import { toast } from "react-hot-toast";

export const Cart = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { car } = useShop((state) => state);

  const handleCheckOut = (onClose: () => void) => {
    toast.success("Checkout successful");
    onClose();
  };

  return (
    <>
      <Button
        isIconOnly
        onPress={onOpen}
        variant="flat"
        color="success"
        className="fixed top-5 right-5 z-50"
      >
        <LiaShoppingBagSolid />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="h-4/6">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold">Cart ({car.length})</h3>
              </ModalHeader>
              <ModalBody className="overflow-auto">
                {car.length ? (
                  <div className="flex flex-col gap-2">
                    {car.map((product) => (
                      <CartProduct key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <p className="text-xl text-center text-gray-600">
                    No products in the cart
                  </p>
                )}
              </ModalBody>
              <ModalFooter className="flex flex-col gap-2">
                <div className="flex content-center items-center justify-between">
                  <p className="text-lg font-semibold">Subtotal</p>
                  <p>
                    $
                    {Math.round(
                      [...car].reduce((acc: any, item) => acc + item.price, 0),
                    )}
                  </p>
                </div>
                <Button
                  fullWidth
                  variant="flat"
                  color="success"
                  onPress={() => handleCheckOut(onClose)}
                >
                  CheckOut
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
