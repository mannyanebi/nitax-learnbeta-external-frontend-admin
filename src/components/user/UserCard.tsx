import React from "react";
import { Box, Grid, Text, Skeleton } from "@mantine/core";

export const UserCardSkeleton = () => {
  return (
    <Box>
      <Grid>
        <Grid.Col className="3xl:max-w-none max-w-[6rem]" span="auto">
          <Skeleton className="h-4 w-full rounded-xl" />
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[14rem]" span="auto">
          <Skeleton className="h-4 w-full rounded-xl" />
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[18rem]" span="auto">
          <Skeleton className="h-4 w-full rounded-xl" />
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[13rem]" span="auto">
          <Skeleton className="h-4 w-full rounded-xl" />
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[15rem]" span="auto">
          <Skeleton className="h-4 w-full rounded-xl" />
        </Grid.Col>

        <Grid.Col className="3xl:max-w-nonemax-w-[6rem]" span="auto">
          <Skeleton className="h-4 w-full rounded-xl" />
        </Grid.Col>
      </Grid>
    </Box>
  )
}

const UserCard = () => {
  return (
    <Box>
      <Grid>
        <Grid.Col className="3xl:max-w-none max-w-[6rem]" span="auto">
          <Text className='text-[#555555] truncate font-semibold'>
            01
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[14rem]" span="auto">
          <Text className='text-[#555555] truncate font-semibold'>
            Malachi Mark
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[18rem]" span="auto">
          <Text className='text-[#555555] truncate font-semibold'>
            johndoe@gmail.com
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[13rem]" span="auto">
          <Text className='text-[#555555] truncate font-semibold'>
            Akwa Ibom, Nigeria
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[15rem]" span="auto">
          <Text className='text-[#555555] truncate font-semibold'>
            Premium Plan
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-nonemax-w-[6rem]" span="auto">
          <Text className='text-[#555555] truncate font-semibold'>
            Grade 5
          </Text>
        </Grid.Col>
      </Grid>
    </Box>
  )
}

export default UserCard