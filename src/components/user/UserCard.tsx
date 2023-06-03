import React from "react";
import { Box, Grid, Text, Skeleton } from "@mantine/core";

export const UserCardSkeleton = () => {
  return (
    <Box>
      <Grid>
        <Grid.Col className="w-24" span="content">
          <Skeleton className="h-4 w-full rounded-xl" />
        </Grid.Col>

        <Grid.Col className="w-56" span="content">
          <Skeleton className="h-4 w-full rounded-xl" />
        </Grid.Col>

        <Grid.Col className="w-72" span="content">
          <Skeleton className="h-4 w-full rounded-xl" />
        </Grid.Col>

        <Grid.Col className="w-52" span="content">
          <Skeleton className="h-4 w-full rounded-xl" />
        </Grid.Col>

        <Grid.Col className="w-60" span="content">
          <Skeleton className="h-4 w-full rounded-xl" />
        </Grid.Col>

        <Grid.Col className="w-24" span="auto">
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
        <Grid.Col className="w-24" span="content">
          <Text className='text-[#555555] truncate font-semibold'>
            01
          </Text>
        </Grid.Col>

        <Grid.Col className="w-56" span="content">
          <Text className='text-[#555555] truncate font-semibold'>
            Malachi Mark
          </Text>
        </Grid.Col>

        <Grid.Col className="w-72" span="content">
          <Text className='text-[#555555] truncate font-semibold'>
            johndoe@gmail.com
          </Text>
        </Grid.Col>

        <Grid.Col className="w-52" span="content">
          <Text className='text-[#555555] truncate font-semibold'>
            Akwa Ibom, Nigeria
          </Text>
        </Grid.Col>

        <Grid.Col className="w-60" span="content">
          <Text className='text-[#555555] truncate font-semibold'>
            Premium Plan
          </Text>
        </Grid.Col>

        <Grid.Col className="w-24" span="auto">
          <Text className='text-[#555555] truncate font-semibold'>
            Grade 5
          </Text>
        </Grid.Col>
      </Grid>
    </Box>
  )
}

export default UserCard