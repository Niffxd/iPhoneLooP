import { create } from 'zustand';

type service = {
  device: string | null;
  listOfRepairments: [] | null;
  price: number | null;
  delivery: string | null;
  setDevice: (name: string) => void;
  setListOfRepairments: (list: string) => void;
  setPrice: (price: number) => void;
  setDelivery: (chosenDelivery: string) => void;
};

export const useServiceStore = create(
  (set) =>
    ({
      device: null,
      listOfRepairments: null,
      price: null,
      delivery: null,
      setDevice: (name) => set(() => ({ device: name })),
      setListOfRepairments: (list) => set(() => ({ listOfRepairments: list })),
      setPrice: (price) => set(() => ({ price: price })),
      setDelivery: (chosenDelivery) =>
        set(() => ({ delivery: chosenDelivery })),
    }) as service,
);
