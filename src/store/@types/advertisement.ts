import { ILoadingState } from "./misc";

export type IAdvertisementMini = {
  name: string;
  mail: string;
  duration: string;
  projected_reach: string;
  reach: string;
  cost: string;
  status: string;
};

export type IAdvertisementStatus = ILoadingState & {
  advertisements: IAdvertisementMini[];
  search: IAdvertisementMini[];
};
