import { create } from "zustand";
import { featureOptionEnum } from "../common/constant.tsx";

const useSimpleStore = create((set) => ({
  activeMode: featureOptionEnum.LUCKY_WHEEL,
  setActiveMode: (mode) => set({ activeMode: mode }),
}));

export default useSimpleStore;
