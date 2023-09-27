import React, { useEffect, useState } from "react";
import { Box, Grid, Text, Flex, Radio, Pagination, Popover, UnstyledButton, Center } from "@mantine/core";
import Image from "next/image";
import filter_icon from '../../assets/svgs/filter.svg'
import emptyState from '../../assets/svgs/empty_state.svg'
import UserCard from "./UserCard";
import Input from "../custom/Input";

export const UserTableEmpty = () => {
  return (
    <Box>
      <Center>
        <Box>
          <Image
            alt='empty state icon'
            src={emptyState}
            className='w-40 h-40 animate-pulse mx-auto'
          />

          <Text className='text-[#555555] text-xl mt-5 text-center font-semibold'>
            No Users Found
          </Text>
        </Box>
      </Center>
    </Box>
  )
}

export const NoMatch = () => {
  return (
    <Box>
      <Center>
        <Box>
          <Image
            alt='empty state icon'
            src={emptyState}
            className='w-40 h-40 animate-pulse mx-auto'
          />

          <Text className='text-[#555555] text-xl mt-5 text-center font-semibold'>
            No matching users found
          </Text>
        </Box>
      </Center>
    </Box>
  )
}

type Props = { students: any }

const UserTable: React.FC<Props> = ({ students }) => {
  const [users, setUsers] = useState<any>(students.data.data)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('')

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10; 

  useEffect(() => {
    filterUsers();
  }, [filter, query]);

  const filterUsers = () => {
    let filteredUsers = [...students.data.data];

    // Check if a filter is selected
    if (filter === 'grade') {
      // Filter based on grade_level
      filteredUsers = filteredUsers.filter((user) =>
        user.grade_level && user.grade_level.toLowerCase().includes(query.toLowerCase())
      );
    } else if (filter === 'location') {
      // Filter based on location
      filteredUsers = filteredUsers.filter((user) =>
        user.location && user.location.toLowerCase().includes(query.toLowerCase())
      );
    } else if (filter === 'plan') {
      // Filter based on subscription_plan (if available)
      filteredUsers = filteredUsers.filter((user) =>
        user.subscription &&
        user.subscription.subscription_plan &&
        user.subscription.subscription_plan.toLowerCase().includes(query.toLowerCase())
      );
    }

    setUsers(filteredUsers);

    setCurrentPage(1); // Reset to the first page when filters change
  };

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  return (
    <React.Fragment>
      <Box>
        <Box className="w-full min-w-[75rem]">
          <Grid className="bg-[#FFF6E8] rounded-lg py-2">
            <Grid.Col span={1}>
              <Text className='text-[#555555] font-semibold'>
                S/N
              </Text>
            </Grid.Col>

            <Grid.Col span={2}>
              <Text className='text-[#555555] font-semibold'>
                Name
              </Text>
            </Grid.Col>

            <Grid.Col span={3}>
              <Text className='text-[#555555] font-semibold'>
                Email
              </Text>
            </Grid.Col>

            <Grid.Col span={2}>
              <Text className='text-[#555555] font-semibold'>
                Location
              </Text>
            </Grid.Col>

            <Grid.Col span={2}>
              <Text className='text-[#555555] font-semibold'>
                Subscription Plan
              </Text>
            </Grid.Col>

            <Grid.Col span={2}>
              <Flex className='justify-between mr-5'>
                <Text className='text-[#555555] font-semibold'>
                  Class
                </Text>

                <Box className="relative">
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
                              value={query}
                              onChange={({ target }) => {
                                setQuery(target.value)
                              }}
                              placeholder="Enter grade"
                              className="w-28 border-[#E2E2E2] focus:outline-[#FAA61A] border-2 px-2 py-1 rounded-sm text-[#555555] placeholder:text-sm mt-2 transition duration-75 delay-75 ease-linear placeholder:text-[#555555]"
                            />
                          }

                          <Radio
                            label="Location"
                            value='location'
                            color="yellow"
                          />

                          {filter === 'location' &&
                            <Input
                              type="text"
                              value={query}
                              onChange={({ target }) => {
                                setQuery(target.value)
                              }}
                              placeholder="Enter location"
                              className="w-28 border-[#E2E2E2] focus:outline-[#FAA61A] border-2 px-2 py-1 rounded-sm text-[#555555] placeholder:text-sm mt-2 transition duration-75 delay-75 ease-linear placeholder:text-[#555555]"
                            />
                          }

                          <Radio
                            label="Subscriptiion Plan"
                            value='plan'
                            color="yellow"
                          />

                          {filter === 'plan' &&
                            <Input
                              type="text"
                              value={query}
                              onChange={({ target }) => {
                                setQuery(target.value)
                              }}
                              placeholder="Enter plan"
                              className="w-28 border-[#E2E2E2] focus:outline-[#FAA61A] border-2 px-2 py-1 rounded-sm text-[#555555] placeholder:text-sm mt-2 transition duration-75 delay-75 ease-linear placeholder:text-[#555555]"
                            />
                          }
                        </Radio.Group>
                      </Box>

                      {filter &&
                        <Box className="mt-3">
                          <UnstyledButton
                            onClick={() => setFilter('')}
                            className="px-2 w-20 text-center text-sm font-bold transition duration-75 delay-75 ease-linear hover:bg-[#888888] text-[#888888] rounded-full py-2 bg-[#E2E2E2] hover:text-white"
                          >
                            Clear
                          </UnstyledButton>
                        </Box>
                      }
                    </Popover.Dropdown>
                  </Popover>
                  
                  {filter &&
                    <Box className="h-2 w-2 animate-ping rounded-full bg-yellow-500 absolute z-10 top-0 right-0" />
                  }
                </Box>
              </Flex>
            </Grid.Col>
          </Grid>
        </Box>

        <Box className="w-full min-w-[75rem] mt-5 space-y-5">
          {users.length === 0 ?
            (
              <Box className="mt-4 lg:mt-7 w-full">
                <NoMatch />
              </Box>
            ) :
            users.slice(startIndex, endIndex).map((student: any, index: number) => (
              <UserCard
                index={index}
                key={student.id}
                usersPerPage={usersPerPage}
                currentPage={currentPage}
                student={student}
              />
            ))
          }
        </Box>

        {users.length > 0 &&
          <Flex className="2xl:justify-end mt-8">
            <Pagination 
              total={Math.ceil(users.length / usersPerPage)} 
              onChange={(newPage) => setCurrentPage(newPage)}
              color="yellow" 
              radius="xl" 
            />
          </Flex>
        }
      </Box>
    </React.Fragment>
  )
}

export default UserTable