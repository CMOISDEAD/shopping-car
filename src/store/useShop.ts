import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ShopState {
  car: ProductInterface[];
  products: ProductInterface[];
  setCar: (car: ProductInterface[]) => void;
  setProducts: (products: ProductInterface[]) => void;
  addProductToCar: (product: ProductInterface) => void;
  removeProductFromCar: (product: ProductInterface) => void;
}

export const useShop = create<ShopState>()(
  persist(
    (set) => ({
      car: [],
      products: [],
      setCar: (car) => set({ car }),
      setProducts: (products) => set({ products }),
      addProductToCar: (product) =>
        set((state) => ({ car: [...state.car, product] })),
      removeProductFromCar: (product) =>
        set((state) => ({
          car: state.car.filter((p) => p.id !== product.id),
        })),
    }),
    {
      name: "shop-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
