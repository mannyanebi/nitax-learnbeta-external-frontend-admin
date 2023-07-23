import { Flex, UnstyledButton } from "@mantine/core";
import { Icon } from '@iconify/react';
import { Box, Text } from "@mantine/core";

type Props = { 
  message: string, 
  retry: () => void 
}

export default function RefetchButton({ message, retry }: Props) {
  return (
    <Flex className="justify-center mx-auto max-w-md w-full">
      <UnstyledButton 
        onClick={retry}
        style={{ border: '2px solid #E2E2E2' }}
        className="font-semibold w-full rounded-xl text-center animate-pulse text-[#777777] h-full p-5">
        <Box>
          <Icon icon="pajamas:retry" color="#777" width="30" className="mx-auto" height="30" />
  
          <Text className="mt-2">
            {message}
          </Text>

          <Text className="mt">
            Click to retry.
          </Text>
        </Box>
      </UnstyledButton>
    </Flex>
  )
}