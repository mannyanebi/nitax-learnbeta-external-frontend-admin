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

interface Props {
  student: any;
  index: number;
  currentPage: number;
  usersPerPage: number
}

const UserCard: React.FC<Props> = ({ student, index, currentPage, usersPerPage }) => {

  const pageNumber = (currentPage - 1) * usersPerPage + index + 1;

  return (
    <Box>
      <Grid>
        <Grid.Col className="3xl:max-w-none max-w-[6rem]" span="auto">
          <Text className='text-[#555555] truncate font-semibold'>
            {pageNumber}
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[14rem]" span="auto">
          <Text className='text-[#555555] truncate font-semibold'>
            {student.name}
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[18rem]" span="auto">
          <Text className='text-[#555555] truncate font-semibold'>
            {student.email}
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[13rem]" span="auto">
          <Text className='text-[#555555] truncate font-semibold'>
            {student.location}
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[15rem]" span="auto">
          <Text className='text-[#555555] truncate font-semibold'>
            {student.subscription?.subscription_plan ?
              student.subscription?.subscription_plan :
              'Not Subscribed'
            }
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-nonemax-w-[6rem]" span="auto">
          <Text className='text-[#555555] truncate font-semibold'>
            {student.grade_level ?
              student.grade_level :
              'Not Enrolled'
            }
          </Text>
        </Grid.Col>
      </Grid>
    </Box>
  )
}

export default UserCard