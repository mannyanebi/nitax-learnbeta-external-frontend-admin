import React, { useContext } from "react";
import Head from "next/head";
import { Box, Tabs, Text, Flex, UnstyledButton, Center } from "@mantine/core";
import { Icon } from "@iconify/react";
import plus_icon from '../../../assets/svgs/plus_icon.svg'
import Image from "next/image";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useDisclosure } from "@mantine/hooks";
import PlanCard, { PlanCardSkeleton, NoPlanCard } from "@/components/subscriptions/PlanCard";
import NewPlanModal from "@/components/subscriptions/NewPlanModal";
import NewVoucherModal from "@/components/subscriptions/NewVoucherModal";
import backArrow from '../../../assets/svgs/backarrow_icon.svg'
import Link from "next/link";
import VoucherCard, { VoucherCardSkeleton } from "@/components/subscriptions/VoucherCard";
import { AdminContext } from "@/contexts/AdminContext";
import { useQuery } from 'react-query'
import { getSubscriptionPlans, getVouchers } from "@/services/subscriptions";
import RefetchButton from "@/components/lessons/RefetchButton";

const NewSubscriptions = () => {
  const { admin } = useContext(AdminContext)
  const token = `Bearer ${admin?.data?.access_token}`
  const subscriptions = useQuery('subscriptions', () => getSubscriptionPlans(token))
  const vouchers = useQuery('vouchers', () => getVouchers(token))

  const [openedPlan, { open: openPlan, close: closePlan }] = useDisclosure(false);
  const [openedVoucher, { open: openVoucher, close: closeVoucher }] = useDisclosure(false);

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard | Subscriptions</title>
      </Head>

      <Box className="px-4 sm:px-8 md:pl-8 md:pr-14 lg:pr-20 mt-5 lg:mt-8">
        <Tabs
          unstyled
          defaultValue="plans"
          styles={(theme) => ({
            tab: {
              ...theme.fn.focusStyles(),
              color: '#777777',
              cursor: 'pointer',
              paddingLeft: '20px',
              paddingRight: '20px',
              fontFamily: "Montserrat Variable, sans-serif",
              fontSize: theme.fontSizes.sm,
              display: 'flex',
              alignItems: 'center',
              width: '180px',
              justifyContent: 'center',

              '&[data-active]': {
                backgroundColor: 'white',
                borderColor: 'white',
                fontWeight: 600,
                color: '#FAA61A',
                borderRadius: '9999px',
                boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }
            },

            tabsList: {
              display: 'flex',
              backgroundColor: '#F4F4F4',
              borderRadius: '9999px',
              padding: '5px',
              height: '50px'
            },
          })}
        >
          <Box className="w-fit">
            <Link href='/dashboard/subscriptions'>
              <Flex className=" mx-auto space-x-2">
                <Center className="bg-[#FEEDD1] rounded-full p-2">
                  <Image
                    src={backArrow}
                    alt='back icon'
                    className="w-2 h-2"
                  />
                </Center>

                <Text className="font-bold">Back</Text>
              </Flex>
            </Link>
          </Box>

          <Box className="p-1 w-fit mx-auto mt-3">
            <Tabs.List>
              <Tabs.Tab value="plans">
                Subscription Plans
              </Tabs.Tab>

              <Tabs.Tab value="vouchers">Vouchers</Tabs.Tab>
            </Tabs.List>
          </Box>

          <Tabs.Panel className="mt-5 lg:mt-8" value="plans" pt="xs">
            <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:max-w-[45rem] mx-auto">
              {subscriptions.data &&
                subscriptions.data.data.map((sub: any, index: number) => (
                <PlanCard
                  key={index}
                  sub={sub}
                  style={{ order: index === 2 ? -1 : index }}
                />
              ))}

              {subscriptions.isLoading &&
                [1, 2].map((num: number) => (
                  <PlanCardSkeleton 
                    key={num}
                  />
                ))
              }

              {subscriptions.data &&
                subscriptions.data.data.length < 1 &&
                [
                  {
                    color: 'purple',
                    header: 'Did you forget to add a plan?',
                    description: "Plans are necessary for market growth!"
                  },
                  {
                    color: 'yellow',
                    header: 'You have no active plans set. Look right!',
                    description: "Quick! Add a plan. We need revenue!"

                  }
                ].map((item, index) => (
                  <NoPlanCard
                      key={index}
                      item={item}
                      colorTheme={item.color}
                    />
                  ))
              }

              {subscriptions.isError &&
                <RefetchButton
                  retry={() => subscriptions.refetch()}
                  message="Failed to fetch subscription plans!"
                />
              }

              <UnstyledButton onClick={openPlan} className="h-full">
                <Box className="border-2 rounded-3xl flex items-center h-full border-[#E2E2E2] border-dashed p-5">
                  <Box className="w-full">
                    <Flex className="justify-center">
                      <Box>
                        <Text className="text-[#777777] font-semibold">
                          Create New Plan
                        </Text>

                        <Flex className="justify-center mt-4">
                          <Box className="h-[40px] w-[40px]">
                            <Image
                              alt='display icon'
                              src={plus_icon}
                              className='rounded-full h-[40px] w-[40px]'
                            />
                          </Box>
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              </UnstyledButton>
            </Box>

            <NewPlanModal
              close={closePlan}
              opened={openedPlan}
            />
          </Tabs.Panel>

          <Tabs.Panel className="mt-5 lg:mt-8" value="vouchers" pt="xs">
            <UnstyledButton onClick={openVoucher} className="h-full w-full sm:hidden">
              <Box className="border-2 rounded-3xl flex items-center h-full border-[#E2E2E2] border-dashed p-5">
                <Box className="w-full">
                  <Flex className="justify-center">
                    <Box>
                      <Text className="text-[#777777] font-semibold">
                        Create New Voucher
                      </Text>

                      <Flex className="justify-center mt-4">
                        <Box className="h-[40px] w-[40px]">
                          <Image
                            alt='display icon'
                            src={plus_icon}
                            className='rounded-full h-[40px] w-[40px]'
                          />
                        </Box>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </UnstyledButton>

            <Box className="grid grid-cols-1 sm:grid-cols-2 mt-6 sm:mt-0 gap-6 lg:max-w-[48rem] mx-auto">
              {vouchers.data &&
                vouchers.data.data.map((item: any, index: number) => (
                  <VoucherCard
                    item={item}
                    key={index}
                    style={{ order: index === 2 ? -1 : index + 1 }}
                  />
                ))
              }

              {vouchers.data && vouchers.data.data.length < 1 &&
                <Flex className="justify-center font-semibold w-full rounded-xl text-center animate-pulse text-[#777777] h-full p-5 mx-auto max-w-md border-2 border-[#E2E2E2]">
                  <Box>
                    <Icon icon="system-uicons:no-sign" color="#777" width="30" className="mx-auto" height="30" />

                    <Text className="mt-2">
                      No vouchers available
                    </Text>
                  </Box>
                </Flex>
              }

              {vouchers.isLoading &&
                [1, 2].map((item, index) => (
                  <VoucherCardSkeleton
                    key={index}
                  />
                ))
              }

              {vouchers.isError &&
                <RefetchButton
                  retry={() => vouchers.refetch()}
                  message="Failed to fetch vouchers!"
                />
              }

              <UnstyledButton onClick={openVoucher} className="h-full hidden sm:block">
                <Box className="border-2 rounded-3xl flex items-center h-full border-[#E2E2E2] border-dashed p-5">
                  <Box className="w-full">
                    <Flex className="justify-center">
                      <Box>
                        <Text className="text-[#777777] font-semibold">
                          Create New Voucher
                        </Text>

                        <Flex className="justify-center mt-4">
                          <Box className="h-[40px] w-[40px]">
                            <Image
                              alt='display icon'
                              src={plus_icon}
                              className='rounded-full h-[40px] w-[40px]'
                            />
                          </Box>
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              </UnstyledButton>
            </Box>

            <NewVoucherModal
              close={closeVoucher}
              opened={openedVoucher}
            />
          </Tabs.Panel>
        </Tabs>
      </Box>
    </DashboardLayout>
  )
}

export default NewSubscriptions