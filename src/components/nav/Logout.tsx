import React from "react";
import { Icon } from '@iconify/react';
import { Center, Text, Box, Flex, UnstyledButton } from '@mantine/core'

const Logout: React.FC = () => {
  return (
    <Center className="h-[60px] w-full">
      <UnstyledButton className='w-[170px] text-left rounded-xl transition duration-75 delay-50 ease-linear px-[20px] py-[12px] text-white font-bold'>
        <Flex className="items-center space-x-[6px]">
          <Box className="w-[18px] h-[18px]">
            <Icon
              icon='heroicons-outline:logout' color='white'
              width="18" height="18"
            />
          </Box>

          <Text>Logout</Text>
        </Flex>
      </UnstyledButton>
    </Center>
  )
}

export default Logout