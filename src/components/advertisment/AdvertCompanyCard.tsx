import React from "react";
import { Grid, Box, Text } from "@mantine/core";

export default function AdvertCompanyCard() {
  return (
    <Box className="w-full min-w-[75rem] rounded-t-lg">
      <Grid className="px-4">
        <Grid.Col className="3xl:max-w-none max-w-[18rem]" span="auto">
          <Text className='text-[#555555] truncate font-[500]'>
            Spotify
          </Text>

          <Text className='text-[#777777] text-sm truncate'>
            team@spotify.com
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[12rem]" span="auto">
          <Text className='text-[#555555] truncate font-[500]'>
            1 month
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[15rem]" span="auto">
          <Text className='text-[#555555] truncate font-[500]'>
            7,000 users
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[12rem]" span="auto">
          <Text className='text-[#555555] truncate font-[500]'>
            5000/7000
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[12rem]" span="auto">
          <Text className='text-[#555555] truncate font-[500]'>
            N12,000
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[6rem]" span="auto">
          <Box className="bg-blue-100 text-sm text-blue-400 font-semibold text-center py-1 rounded-md w-full">
            Running
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  )
}