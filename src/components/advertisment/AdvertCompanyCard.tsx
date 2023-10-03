import React from "react";
import { Grid, Box, Text } from "@mantine/core";
import { IAdvertisementMini } from "@/store/@types/advertisement";

type IAdvertCompanyCard = {
  item: IAdvertisementMini;
};

const AdvertCompanyCard: React.FC<IAdvertCompanyCard> = ({ item }) => {
  return (
    <Box className="w-full min-w-[75rem] rounded-t-lg">
      <Grid className="px-4">
        <Grid.Col className="3xl:max-w-none max-w-[18rem]" span="auto">
          <Text className="text-[#555555] truncate font-[500]">
            {item.name}
          </Text>

          <Text className="text-[#777777] text-sm truncate">{item.mail}</Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[12rem]" span="auto">
          <Text className="text-[#555555] truncate font-[500]">
            {item.duration}
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[15rem]" span="auto">
          <Text className="text-[#555555] truncate font-[500]">
            {item.projected_reach}
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[12rem]" span="auto">
          <Text className="text-[#555555] truncate font-[500]">
            {item.reach}
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[12rem]" span="auto">
          <Text className="text-[#555555] truncate font-[500]">
            {item.cost}
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[6rem]" span="auto">
          <Box className="bg-blue-100 text-sm text-blue-400 font-semibold text-center py-1 rounded-md w-full">
            {item.status}
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default AdvertCompanyCard;
