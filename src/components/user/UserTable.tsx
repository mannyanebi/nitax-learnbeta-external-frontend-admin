import React, { useState } from "react";
import { Box, Grid, Text, Flex, Radio, Pagination, Popover, UnstyledButton, Center } from "@mantine/core";
import Image from "next/image";
import filter_icon from '../../assets/svgs/filter.svg'
import emptyState from '../../assets/svgs/empty_state.svg'
import UserCard from "./UserCard";
import Input from "../custom/Input";
import { UserCardSkeleton } from "./UserCard";

const UserTableEmpty = () => {
  return (
    <Box>
      <Center>
        <Box>
          <Image
            alt='empty state icon'
            src={emptyState}
            className='w-40 h-40 animate-pulse'
          />

          <Text className='text-[#555555] text-xl mt-5 font-semibold'>
            No Users Found
          </Text>
        </Box>
      </Center>
    </Box>
  )
}

const UserTable = () => {
  const [filter, setFilter] = useState<any>()

  return (
    <React.Fragment>
      {/* <Box className="mt-10">
        <UserTableEmpty />
      </Box> */}

      <Box>
        <Box className="w-full min-w-[75rem]">
          <Grid className="bg-[#FFF6E8] rounded-lg py-2">
            <Grid.Col className="3xl:max-w-none max-w-[6rem]" span="auto">
              <Text className='text-[#555555] font-semibold'>
                S/N
              </Text>
            </Grid.Col>

            <Grid.Col className="3xl:max-w-none max-w-[14rem]" span="auto">
              <Text className='text-[#555555] font-semibold'>
                Name
              </Text>
            </Grid.Col>

            <Grid.Col className="3xl:max-w-none max-w-[18rem]" span="auto">
              <Text className='text-[#555555] font-semibold'>
                Email
              </Text>
            </Grid.Col>

            <Grid.Col className="3xl:max-w-none max-w-[13rem]" span="auto">
              <Text className='text-[#555555] font-semibold'>
                Location
              </Text>
            </Grid.Col>

            <Grid.Col className="3xl:max-w-none max-w-[15rem]" span="auto">
              <Text className='text-[#555555] font-semibold'>
                Subscription Plan
              </Text>
            </Grid.Col>

            <Grid.Col className="3xl:max-w-nonemax-w-[6rem]" span="auto">
              <Flex className='justify-between mr-5'>
                <Text className='text-[#555555] font-semibold'>
                  Class
                </Text>

                <Box>
                  <Popover 
                    width={210} 
                    position="bottom" 
                    withArrow 
                    shadow="md"
                  >
                    <Popover.Target>
                      <UnstyledButton
                        style={{ border: '1px solid' }} className="border-[#D9D9D9] rounded-md p-2">
                        <Image
                          src={filter_icon}
                          alt='filter icon'
                          className="w-3 h-3"
                        />
                      </UnstyledButton>                    
                    </Popover.Target>

                    <Popover.Dropdown>
                      <Text className='text-[#555555] font-semibold'>
                        Filter By
                      </Text>

                      <Box className="mt-3">
                        <Radio.Group 
                          className="space-y-3" 
                          name="filterBy"
                          value={filter}
                          onChange={(val) => setFilter(val)}
                        >
                          <Radio
                            label="Grade"
                            value='grade'
                            color="yellow"
                          />

                          {filter === 'grade' &&
                            <Input
                              type="text"
                              placeholder="Enter grade"
                              className="w-28 border-[#E2E2E2] focus:outline-[#FAA61A] border-2 px-2 py-1 rounded-sm text-[#555555] placeholder:text-sm mt-2 transition duration-75 delay-75 ease-linear placeholder:text-[#555555]"
                            />
                          }

                          <Radio
                            label="Location"
                            value='location'
                            color="yellow"
                          />

                          <Radio
                            label="Subscriptiion Plan"
                            value='subscriptionPlan'
                            color="yellow"
                          />
                        </Radio.Group>
                      </Box>

                      {filter &&
                        <Flex className="space-x-3 mt-3">
                          <UnstyledButton
                            onClick={() => setFilter(null)}
                            className="px-2 w-full text-center text-sm font-bold transition duration-75 delay-75 ease-linear hover:bg-[#888888] text-[#888888] rounded-full py-2 bg-[#E2E2E2] hover:text-white"
                          >
                            Clear
                          </UnstyledButton>

                          <UnstyledButton
                            className="px-2 w-full text-center text-sm font-bold transition duration-75 delay-75 ease-linear hover:bg-[#da9217] rounded-full py-2 bg-[#FAA61A] text-white"
                          >
                            Filter
                          </UnstyledButton>
                        </Flex>
                      }
                    </Popover.Dropdown>
                  </Popover>
                </Box>
              </Flex>
            </Grid.Col>
          </Grid>
        </Box>

        <Box className="w-full min-w-[75rem] mt-5 space-y-5">
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </Box>

        <Flex className="2xl:justify-end mt-8">
          <Pagination total={3} color="yellow" radius="xl" />
        </Flex>
      </Box>
    </React.Fragment>
  )
}

export default UserTable