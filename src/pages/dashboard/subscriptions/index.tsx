import React, { useContext, useState, useEffect } from "react";
import Head from "next/head";
import { Box, Text, Flex, Center, Grid, UnstyledButton, Select } from "@mantine/core";
import chevron_down from '../../../assets/svgs/chevron-down.svg'
import Image from "next/image";
import seetings_icon from '../../../assets/svgs/settings-18.svg'
import emptyState from '../../../assets/svgs/empty_state.svg'
import { AdminContext } from "@/contexts/AdminContext";
import DashboardLayout from "@/layouts/DashboardLayout";
import Link from "next/link";
import UserSubscriptionCard from "@/components/subscriptions/UserSubscriptionCard";
import { useQuery } from 'react-query'
import { getStudents } from "@/services/students";
import { UserCardSkeleton } from "@/components/user/UserCard";
import RefetchButton from "@/components/lessons/RefetchButton";

const Subscriptions = () => {
  const { admin } = useContext(AdminContext)
  const token = `Bearer ${admin?.data?.access_token}`
  const students = useQuery('students', () => getStudents(token))

  const [paymentMethod, setPaymentMethod] = useState('all');

  const [subscribedUsers, setSubscribedUsers] = useState<any>([]);

  useEffect(() => {
    if (students.data) {
      // Filter users with active subscriptions
      const activeSubscribedUsers = students.data.data.filter((user: any) => (
        user.subscription && !user.subscription.is_expired
      ));

      setSubscribedUsers(activeSubscribedUsers);
    }
  }, [students.data]);

  useEffect(() => {
    filterSubscribedUsers();
  }, [paymentMethod]);

  const filterSubscribedUsers = () => {
    if (students.data && Array.isArray(students.data.data)) {
      let filteredSubscribedUsers = [...students.data.data];

      // Apply filter by payment method if selected
      if (paymentMethod === 'paystack') {
        filteredSubscribedUsers = filteredSubscribedUsers.filter((user) =>
          user.subscription &&
          user.subscription.payment_method &&
          user.subscription.payment_method === 'PAYSTACK'
        );
        setSubscribedUsers(filteredSubscribedUsers);
      } else if (paymentMethod === 'voucher') {
        filteredSubscribedUsers = filteredSubscribedUsers.filter((user) =>
          user.subscription &&
          user.subscription.payment_method &&
          user.subscription.payment_method === 'VOUCHER'
        );
        setSubscribedUsers(filteredSubscribedUsers);
      } else if (paymentMethod === 'all') {
        const activeSubscribedUsers = students.data.data.filter((user: any) => (
          user.subscription && !user.subscription.is_expired
        ));

        setSubscribedUsers(activeSubscribedUsers);
      }
    }
  };

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard | Subscriptions</title>
      </Head>

      <Box className="px-4 sm:px-8 md:pl-8 md:pr-14 lg:pr-20 mt-5 lg:mt-8">
        <Flex className="items-center flex-col sm:flex-row justify-center text-center sm:justify-start sm:space-x-6">
          <Flex className="items-center sm:space-x-2">
            <Text className="font-semibold text-sm sm:text-base">
              Revenue Generated
            </Text>

            <Image
              alt='icon'
              width={20}
              height={20}
              src={chevron_down}
            />
          </Flex>

          <Text className="font-bold text-2xl mt-2 sm:mt-0 blur-md cursor-not-allowed" style={{ userSelect: 'none' }}>
            Classified
          </Text>
        </Flex>

        {!students.isLoading && 
          (
            <Flex className="mt-4 justify-end space-x-4 md:space-x-1 lg:space-x-4 items-center">
              <Box>
                <Select
                  placeholder='Payment Method'
                  value={paymentMethod}
                  onChange={(value) => {
                    if (value !== null) {
                      setPaymentMethod(value);
                    }
                  }}
                  disabled={students.isError}
                  data={[
                    { value: 'all', label: 'All' },
                    { value: 'paystack', label: 'Paystack' },
                    { value: 'voucher', label: 'Voucher' },
                  ]}
                  styles={() => ({
                    input: {
                      border: '2px solid #E9E5E5',
                      '&:focus-within': {
                        borderColor: '#FAA61A',
                      },
                      borderRadius: '0.5rem',
                      paddingTop: '0.5rem',
                      paddingBottom: '0.5rem',
                      paddingLeft: '1rem',
                      paddingRight: '1rem',
                      width: '11rem',
                      color: "#483D3D",
                      fontWeight: 500,
                      height: '2.5rem',
                      "::placeholder": {
                        color: "#483D3D",
                        fontWeight: 500,
                      },
                    },
                    item: {
                      '&[data-selected]': {
                        '&, &:hover': {
                          backgroundColor: '#FAA61A',
                          color: 'white',
                        },
                      }
                    },
                  })}
                />
              </Box>

              <Box>
                <Link href='/dashboard/subscriptions/new'>
                  <UnstyledButton style={{ border: '2px solid #E9E5E5' }} className='bg-white rounded-lg py-2 px-5'>
                    <Image
                      alt='icon'
                      width={20}
                      height={20}
                      src={seetings_icon}
                    />
                  </UnstyledButton>
                </Link>
              </Box>
            </Flex>
          )
        }

        <Box>
          {students.data &&
            subscribedUsers.length < 1 &&
            <Box className="mt-10 sm:mt-16">
              <Center>
                <Box>
                  <Image
                    alt='empty state icon'
                    src={emptyState}
                    className='w-60 h-60 animate-pulse mx-auto'
                  />

                  <Text className='text-[#555555] text-center text-xl mt-5 font-semibold'>
                    No active subscribers
                  </Text>
                </Box>
              </Center>
            </Box>
          }

          {students.isLoading &&
            <Box className="mt-8 rounded-lg space-y-3 py-5 px-3 border-2 border-[#E2E2E2]">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num: number) => (
                <UserCardSkeleton key={num} />
              ))
              }
            </Box>
          }

          {subscribedUsers.length > 0 &&
            <Box className="mt-8 px-2 overflow-x-scroll w-full max-h-[48.7rem] pb-4 no-scrollbar border-2 border-[#E2E2E2] rounded-lg">
              <Box className="w-full min-w-[75rem] rounded-t-lg sticky top-0">
                <Grid className="bg-[#FFF6E8] rounded-t-lg px-4 py-3">
                  <Grid.Col className="3xl:max-w-none max-w-[18rem]" span="auto">
                    <Text className='text-[#555555] font-semibold'>
                      User
                    </Text>
                  </Grid.Col>

                  <Grid.Col className="3xl:max-w-none max-w-[12rem]" span="auto">
                    <Text className='text-[#555555] font-semibold'>
                      Plan
                    </Text>
                  </Grid.Col>

                  <Grid.Col className="3xl:max-w-none max-w-[15rem]" span="auto">
                    <Text className='text-[#555555] font-semibold'>
                      Payment Method
                    </Text>
                  </Grid.Col>

                  <Grid.Col className="3xl:max-w-none max-w-[12rem]" span="auto">
                    <Text className='text-[#555555] font-semibold'>
                      Start Date
                    </Text>
                  </Grid.Col>

                  <Grid.Col className="3xl:max-w-none max-w-[12rem]" span="auto">
                    <Text className='text-[#555555] font-semibold'>
                      End Date
                    </Text>
                  </Grid.Col>

                  <Grid.Col className="3xl:max-w-none max-w-[6rem]" span="auto">
                    <Flex className='justify-between mr-5'>
                      <Text className='text-[#555555] whitespace-nowrap font-semibold'>
                        Days Left
                      </Text>
                    </Flex>
                  </Grid.Col>
                </Grid>
              </Box>

              <Box className="w-full min-w-[75rem] mt-4 space-y-3">
                {subscribedUsers.map((user: any) => (
                  <UserSubscriptionCard user={user} key={user.id} />
                ))
                }
              </Box>
            </Box>
          }

          {students.isError &&
            <Box className="mt-8">
              <RefetchButton
                retry={() => students.refetch()}
                message="Failed to fetch active subscribers!"
              />
            </Box>
          }
        </Box>
      </Box>
    </DashboardLayout>
  )
}

export default Subscriptions