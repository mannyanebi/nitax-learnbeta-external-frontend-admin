import axiosInstance from "@/utility/axiosInstance";
import { isAxiosError } from "axios";

// constants
import advertisement from "@/constants/advertisement";
import { setAdvertisements } from "@/store/slices/advertisement";

export const get_advertisement = async (dispatch: Function) => {
  try {
    // const response = await axiosInstance.get("");

    dispatch(setAdvertisements(advertisement));
  } catch (error) {
    if (isAxiosError(error)) console.log(error);
  }
};
