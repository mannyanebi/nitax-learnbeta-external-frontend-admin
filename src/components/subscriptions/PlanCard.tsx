import React, { useState } from "react";
import { Skeleton, UnstyledButton, Modal, Box, Text, Flex } from "@mantine/core";
import Input from '../custom/Input';
import { useDisclosure } from "@mantine/hooks";
import { ItemCard } from "./NewPlanModal";
import Form from '../custom/Form';
import Image from 'next/image'
import plus_icon from '../../assets/svgs/plus.svg'

export const PlanCardSkeleton = () => {
  return (
    <Box className='w-full border-2 rounded-3xl border-[#E2E2E2] p-6 text-center space-y-5'>
      <Skeleton className="mx-auto w-40 h-3" />
      <Skeleton className="mx-auto w-full h-3" />
      <Skeleton className={`h-3 w-3 rounded-full mx-auto`} />
      <Box className='space-y-2'>
        <Skeleton className="mx-auto rounded-full w-full h-2" />
        <Skeleton className="mx-auto rounded-full w-40 h-2" />
        <Skeleton className="mx-auto rounded-full w-20 h-2" />
      </Box>
      <Skeleton className="mx-auto w-full h-8 rounded-full" />
    </Box>
  )
}

type NoPlanProps = { 
  colorTheme: string
  item: any
}

export const NoPlanCard: React.FC<NoPlanProps> = ({ colorTheme, item }) => {
  return (
    <Box className='w-full border-2 rounded-3xl border-[#E2E2E2] p-6 text-center space-y-5'>
      <Text className={`text-${colorTheme}-500 font-semibold text-lg`}>
        {item.header}
      </Text>

      <Text className="font-bold text-[#666666] text-2xl">
        🤔 🗣️ 😱
      </Text>

      <Box className={`h-3 w-3 bg-${colorTheme}-500 rounded-full mx-auto`} />

      <Text
        className="text-[#666666]"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {item.description}
      </Text>

      <Box className={`w-full h-10 bg-${colorTheme}-500 rounded-full animate-pulse`}/>
    </Box>
  )
}

interface Props {
  style: any
}

export const colors = [
  'red',
  'yellow',
  'green',
  'blue',
  'purple',
];

export function getRandomColor(colors: string[]) {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

const PlanCard: React.FC<Props> = ({ style }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [items, setItems] = useState<any>([])
  const [itemName, setItemName] = useState('')

  const handleAddItem = () => {
    const newItem = {
      name: itemName,
      id: items.length + 1
    }
    items.push(newItem)
    setItemName('')
  }

  const color = getRandomColor(colors)

  return (
    <React.Fragment>
      <Box style={style} className='w-full border-2 rounded-3xl border-[#E2E2E2] p-6 text-center space-y-5'>
        <Text className={`text-${color}-500 font-semibold text-lg`}>
          Premium Plan
        </Text>

        <Text className="font-bold text-[#666666] text-2xl">
          #5,000
        </Text>

        <Box className={`h-3 w-3 bg-${color}-500 rounded-full mx-auto`} />

        <Text
          className="text-[#666666]"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          Access to just one subjects and its lessons
        </Text>

        <Box className="hidden">
          <Box className="bg-red-500 text-red-500  hover:bg-red-500" />
          <Box className="bg-red-100" />
          <Box className="bg-yellow-500 text-yellow-500  hover:bg-yellow-500" />
          <Box className="bg-yellow-100" />
          <Box className="bg-green-500 text-green-500  hover:bg-green-500" />
          <Box className="bg-green-100" />
          <Box className="bg-blue-500 text-blue-500  hover:bg-blue-500" />
          <Box className="bg-blue-100" />
          <Box className="bg-purple-500 text-purple-500  hover:bg-purple-500" />
          <Box className="bg-purple-100" />
        </Box>

        <UnstyledButton onClick={open} className={`w-full text-center text-${color}-500 py-2 bg-${color}-100  hover:bg-${color}-500 rounded-full font-semibold hover:text-white hover:bg-${color}-400 transition duration-75 delay-75 ease-linear`}>
          Edit Plan
        </UnstyledButton>
      </Box>

      <Modal
        size='lg'
        radius={12}
        opened={opened}
        onClose={close}
        centered>
        <Box className='px-2 sm:px-8 md:px-10'>
          <Text className='font-semibold text-center text-lg'>
            Edit Plan
          </Text>

          <Form
            onSubmit={(e: any) => {
              e.preventDefault()
            }}
            className='my-10'
          >
            <Box>
              <Input
                type="text"
                // error={form.errors.email}
                label='Plan Name'
                placeholder="Enter Name for Plan"
                // disabled={mutation.isLoading}
                // ${form.errors.email ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'}
                className={`w-full border-2 px-3 py-5 text-[#555555] transition duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
              />
            </Box>

            <Box className='mt-5'>
              <Input
                type="number"
                // error={form.errors.email}
                label='Plan Price'
                placeholder="Enter Plan Price"
                // disabled={mutation.isLoading}
                // ${form.errors.email ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'}
                className={`w-full border-2 px-3 py-5 text-[#555555] transition duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
              />
            </Box>

            <Box className='mt-5 space-y-1'>
              <Text className="text-sm text-[#343434]">
                Plan Items
              </Text>

              {items.map((item: any) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  items={items}
                  setItems={setItems}
                />
              ))}

              <Flex className='w-full space-x-4 items-center'>
                <Box className='w-full'>
                  <Input
                    type="text"
                    value={itemName}
                    onChange={({ target }) => {
                      setItemName(target.value)
                    }}
                    placeholder="Enter item"
                    className={`w-full border-2 px-3 py-5 text-[#555555] transition duration-75 border-[#E2E2E2] focus:outline-[#FAA61A] rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
                  />
                </Box>

                <Box>
                  <UnstyledButton
                    type='button'
                    disabled={!itemName ? true : false}
                    onClick={handleAddItem}
                    className='bg-[#00433F] hover:bg-[#00433fcf] px-6 py-[1rem] disabled:hover:cursor-not-allowed rounded-md transition duration-75 delay-75 ease-linear'
                  >
                    <Image
                      src={plus_icon}
                      alt='control icon'
                      className='w-[30px] h-[30px]'
                    />
                  </UnstyledButton>
                </Box>
              </Flex>
            </Box>

            <Box className="text-center mt-28">
              <UnstyledButton
                // disabled={mutation.isLoading}
                type="submit"
                className="px-8 h-14 text-center font-bold transition duration-75 delay-75 ease-linear hover:bg-[#da9217] rounded-full py-4 bg-[#FAA61A] text-white"
              >
                {/* {mutation.isLoading ?
                  <Icon
                    className={`animate-spin mx-auto`}
                    icon="icomoon-free:spinner2"
                    color="#white"
                    width="20"
                    height="20"
                  /> :
                  'Sign In'
                } */}
                Save Changes
              </UnstyledButton>
            </Box>
          </Form>
        </Box>
      </Modal>
    </React.Fragment>
  )
}

export default PlanCard