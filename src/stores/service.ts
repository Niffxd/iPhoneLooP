import { create } from 'zustand';

type service = {
  device: string;
  listOfRepairments: [];
  price: number;
  delivery: string;
  setDevice: (name: string) => void;
  setListOfRepairments: (list: string) => void;
  setPrice: (price: number) => void;
  setDelivery: (chosenDelivery: string) => void;
};

export const useServiceStore = create(
  (set) =>
    ({
      device: '',
      listOfRepairments: [],
      price: 0,
      delivery: '',
      setDevice: (name) => set(() => ({ device: name })),
      setListOfRepairments: (list) => set(() => ({ listOfRepairments: list })),
      setPrice: (price) => set(() => ({ price: price })),
      setDelivery: (chosenDelivery) =>
        set(() => ({ delivery: chosenDelivery })),
    }) as service,
);
