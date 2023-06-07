import React from "react";
import Head from "next/head";
import { Box, Tabs, Text, Flex, UnstyledButton } from "@mantine/core";
import plus_icon from '../../assets/svgs/plus_icon.svg'
import Image from "next/image";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useDisclosure } from "@mantine/hooks";
import PlanCard, { PlanCardSkeleton, NoPlanCard } from "@/components/subscriptions/PlanCard";
import NewPlanModal from "@/components/subscriptions/NewPlanModal";
import NewVoucherModal from "@/components/subscriptions/NewVoucherModal";
import VoucherCard, { VoucherCardSkeleton } from "@/components/subscriptions/VoucherCard";

const Subscriptions = () => {
  const [openedPlan, { open: openPlan, close: closePlan }] = useDisclosure(false);
  const [openedVoucher, { open: openVoucher, close: closeVoucher }] = useDisclosure(false);

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard | Subscriptions</title>
      </Head>

      <Box className="px-4 sm:px-6 lg:px-8 mt-5 lg:mt-8">
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
              height: '60px'
            },
          })}
        >
          <Box className="p-1 w-fit mx-auto">
            <Tabs.List>
              <Tabs.Tab value="plans">
                Subscription Plans
              </Tabs.Tab>

              <Tabs.Tab value="vouchers">Vouchers</Tabs.Tab>
            </Tabs.List>
          </Box>

          <Tabs.Panel className="mt-5 lg:mt-8" value="plans" pt="xs">
            <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:max-w-[50rem] mx-auto">
              {[1, 2, 4, 5, 6].map((item, index) => (
                <PlanCard
                  key={index}
                  style={{ order: index === 2 ? -1 : index }}
                />
              ))}

              {/* {[1, 2].map((item, index) => (
                <PlanCardSkeleton 
                  key={index}
                />
              ))} */}

              {/* {[
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
              } */}

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
              {[1, 2, 4, 5, 6].map((item, index) => (
                <VoucherCard
                  key={index}
                  style={{ order: index === 2 ? -1 : index + 1 }}
                />
              ))}

              {/* {[1, 2].map((item, index) => (
                <VoucherCardSkeleton
                  key={index}
                />
              ))} */}

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

export default Subscriptions