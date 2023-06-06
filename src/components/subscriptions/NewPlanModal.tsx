import React, { useState } from 'react';
import { Modal, Box, Text, Flex, UnstyledButton } from '@mantine/core';
import Input from '../custom/Input';
import Form from '../custom/Form';
import Image from 'next/image'
import plus_icon from '../../assets/svgs/plus.svg'
import minus_icon from '../../assets/svgs/minus.svg'

function ItemCard({ item, items, setItems }: any) {
  const handleRemoveItem = () => {
    const newItemsArray = items.filter((i: any) => i.id !== item.id);
    setItems(newItemsArray)
  };

  return (
    <Flex className='space-x-4 items-center'>
      <Box className='w-full py-4'>
        <Text className='truncate'>
          {item.name}
        </Text>
      </Box>

      <Box>
        <UnstyledButton type='button' onClick={handleRemoveItem} className='bg-[#00433F] hover:bg-[#00433fcf] px-6 py-[0.8rem] rounded-md transition duration-75 delay-75 ease-linear'>
          <Image
            src={minus_icon}
            alt='control icon'
            className='w-[30px] h-[30px]'
          />
        </UnstyledButton>
      </Box>
    </Flex>
  )
}

interface Props {
  opened: boolean,
  close: () => void
}

export default function NewPlanModal({ opened, close }: Props) {
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

  return (
    <React.Fragment>
      <Modal
        size='lg'
        radius={12}
        opened={opened}
        onClose={close}
        centered>
        <Box className='px-2 sm:px-8 md:px-10'>
          <Text className='font-semibold text-center text-lg'>
            Create New Plan
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
                Create New Plan
              </UnstyledButton>
            </Box>
          </Form>
        </Box>
      </Modal>
    </React.Fragment>
  );
}