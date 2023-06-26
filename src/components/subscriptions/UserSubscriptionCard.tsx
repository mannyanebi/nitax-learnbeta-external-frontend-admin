import React from "react";
import { Grid, Box, Text } from "@mantine/core";

export default function UserSubscriptionCard() {
  return (
    <Box className="w-full min-w-[75rem] rounded-t-lg">
      <Grid className="px-4">
        <Grid.Col className="3xl:max-w-none max-w-[18rem]" span="auto">
          <Text className='text-[#555555] truncate font-[500]'>
            Erasmus Philip 
          </Text>

          <Text className='text-[#777777] text-sm truncate'>
            erasphilip@gmail.com
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[12rem]" span="auto">
          <Text className='text-[#555555] truncate font-[500]'>
            Premium
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[15rem]" span="auto">
          <Text className='text-[#555555] truncate font-[500]'>
            Airtime
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[12rem]" span="auto">
          <Text className='text-[#555555] truncate font-[500]'>
            12/2/2023
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[12rem]" span="auto">
          <Text className='text-[#555555] truncate font-[500]'>
            12/2/2023
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[6rem]" span="auto">
          <Box className="bg-blue-100 text-sm text-blue-400 font-semibold text-center py-1 rounded-md w-full">
            Paid
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  )
}