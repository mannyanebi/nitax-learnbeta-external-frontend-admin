import React from "react";
import { Grid, Box, Text } from "@mantine/core";
import { formatDate } from "@/helpers/functions/formatDate";

type Props = { user: any }

export default function UserSubscriptionCard({ user }: Props) {
  return (
    <Box className="w-full min-w-[75rem] rounded-t-lg">
      <Grid className="px-4">
        <Grid.Col className="3xl:max-w-none max-w-[18rem]" span="auto">
          <Text className='text-[#555555] truncate font-[500]'>
            {user.name}
          </Text>

          <Text className='text-[#777777] text-sm truncate'>
            {user.email}
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[12rem]" span="auto">
          <Text className='text-[#555555] truncate font-[500]'>
            {user.subscription?.subscription_plan ?
              user.subscription?.subscription_plan :
              'Not Subscribed'
            }
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[15rem]" span="auto">
          <Text className='text-[#555555] truncate font-[500]'>
            {user.subscription?.payment_method ?
              user.subscription?.payment_method :
              'N/A'
            }
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[12rem]" span="auto">
          <Text className='text-[#555555] truncate font-[500]'>
            {user.subscription?.start_date ?
              formatDate(user.subscription?.start_date) :
              'N/A'
            }
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[12rem]" span="auto">
          <Text className='text-[#555555] truncate font-[500]'>
            {user.subscription?.end_date ?
              formatDate(user.subscription?.end_date) :
              'N/A'
            }
          </Text>
        </Grid.Col>

        <Grid.Col className="3xl:max-w-none max-w-[6rem]" span="auto">
          <Text className="text-[#555555] truncate font-[500]">
            {user.subscription?.remaining_days ?
              user.subscription?.remaining_days :
              'N/A'
            }
          </Text>
        </Grid.Col>
      </Grid>
    </Box>
  )
}