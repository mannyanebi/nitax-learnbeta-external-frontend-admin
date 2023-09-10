import React, { useState, useContext } from "react";
import { BackgroundImage, Box, Flex, Text, UnstyledButton } from "@mantine/core";
import yellowBg from '../../assets/svgs/yellow_bg.svg'
import Image from "next/image";
import noProfile from '../../assets/imgs/no_profile.png'
import editIcon from '../../assets/svgs/edit_icon.svg'
import Link from "next/link";
import Form from "../custom/Form";
import Input from "../custom/Input";
import { useMutation } from "react-query";
import { uploadAvatar } from "@/services/admin";
import { useQuery, UseQueryResult } from "react-query";
import { getAdminProfile } from "@/services/admin";
import { AdminContext } from "@/contexts/AdminContext";

const ProfileBanner = () => {
  const { admin } = useContext(AdminContext)
  const token = `Bearer ${admin?.data?.access_token}`

  const adminProfile: UseQueryResult<any, unknown> = useQuery('adminProfile', () => getAdminProfile(token))

  const [avatar, setAvatar] = useState<any>(noProfile)
  const [fileInputState, setFileInputState] = useState('')
  const [selectedFile, setSelectedFile] = useState()
  const [isTouched, setIsTouched] = useState(false)

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file: any) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        console.log('Img', file)
        setAvatar(reader.result);
        setIsTouched(true)
      };
    }
  };

  const handleSubmitFile = () => {
    if (!selectedFile) return;
    const reader = new FileReader();

    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      avatarMutation.mutate(reader.result);
    };

    reader.onerror = () => {
      // toast error (snap something went wrong)
    };
  };

  const avatarMutation = useMutation((data: any) => uploadAvatar(data), {
    onError: (error: any) => {
      // toast error
    },

    onSuccess: (data: any) => {
      // toast success
      // update admin state with new profile img url
    },
  })

  return (
    <Box className="px-4 sm:px-8 md:px-10">
      <Box className="hidden lg:block">
        <BackgroundImage className="rounded-xl px-16 h-32 xl:px-28 max-w-[54.5rem] mx-auto" src={yellowBg.src}>
        </BackgroundImage>

        <Box className="w-full max-w-[55rem] xl:max-w-[47.5rem] px-16 xl:px-0 mt-[-4.5rem] mx-auto">
          <Flex className="space-x-8">
            <Box>
              <Box className="relative w-fit">
                <Image
                  src={avatar}
                  alt='profile icon'
                  width={160}
                  height={160}
                  className="object-cover object-center w-[8rem] h-[8rem] shadow-md rounded-full mx-auto"
                />

                {/* <UnstyledButton
                  onClick={() => document.getElementById('fileInput')?.click()}
                  className="absolute flex justify-center p-3 bg-[#FEEDD1] hover:brightness-75 rounded-full bottom-4 right-[-4px] items-center z-10 transition duration-75 delay-75 ease-linear"
                >
                  <Image
                    src={editIcon}
                    alt='edit icon'
                    className="w-4 h-4"
                  />
                </UnstyledButton> */}

                <Box>
                  <Input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="hidden"
                  />
                </Box>
              </Box>

              {isTouched &&
                <Form className="text-center mt-2">
                  <UnstyledButton
                    onClick={handleSubmitFile}
                    className="transition duration-75 w-20 text-center delay-75 ease-linear hover:bg-[#da9217] px-2 font-bold text-xs py-1 bg-[#FAA61A] text-white"
                  >
                    Upload
                  </UnstyledButton>
                </Form>
              }

              {/* <Form className="text-center mt-2">
                <UnstyledButton 
                  style={{border: '1px solid'}} 
                  className="transition duration-75 w-20 text-center delay-75 ease-linear text-red-500 hover:text-white hover:bg-red-500 px-2 font-bold text-xs py-1"
                >
                  Delete
                </UnstyledButton>
              </Form> */}
            </Box>

            <Text className="font-bold text-white mt-5 text-3xl">
              {adminProfile.data &&
                adminProfile.data.data.name
              }

              {adminProfile.isLoading &&
                'Admin'
              }
            </Text>
          </Flex>
        </Box>
      </Box>

      <Box className="lg:hidden">
        <BackgroundImage className="rounded-xl py-6 px-4 max-w-[40rem] mx-auto" src={yellowBg.src}>
          <Text className="font-bold text-white text-3xl">
            {adminProfile.data &&
              adminProfile.data.data.name
            }

            {adminProfile.isLoading &&
              'Admin'
            }

            {adminProfile.isError && adminProfile.refetch()
            }
          </Text>
        </BackgroundImage>

        <Box className="flex justify-center">
          <Box>
            <Box className="mt-10 relative w-fit">
              <Image
                src={avatar}
                alt='profile icon'
                width={96}
                height={96}
                className="object-cover object-center w-[6rem] h-[6rem] shadow-sm rounded-full mx-auto"
              />

              {/* <UnstyledButton
                onClick={() => document.getElementById('fileInput')?.click()}
                className="absolute flex justify-center p-2 bg-[#FEEDD1] hover:brightness-75 rounded-full bottom-2 right-[-4px] items-center z-10 transition duration-75 delay-75 ease-linear"
              >
                <Image
                  src={editIcon}
                  alt='edit icon'
                  className="w-3 h-3"
                />
              </UnstyledButton> */}
            </Box>

            {isTouched &&
              <Form className="text-center mt-2">
                <UnstyledButton
                  onClick={handleSubmitFile}
                  className="transition duration-75 w-20 text-center delay-75 ease-linear hover:bg-[#da9217] px-2 font-bold text-xs py-1 bg-[#FAA61A] text-white"
                >
                  Upload
                </UnstyledButton>
              </Form>
            }

            {/* <Form className="text-center mt-2">
              <UnstyledButton 
                style={{border: '1px solid'}} 
                className="transition duration-75 w-20 text-center delay-75 ease-linear text-red-500 hover:text-white hover:bg-red-500 px-2 font-bold text-xs py-1"
              >
                Delete
              </UnstyledButton>
            </Form> */}
          </Box>
        </Box>
      </Box>

      <Box className="space-y-4 mx-auto max-w-[22rem] mt-6">
        <Box>
          <Text className="text-sm font-light truncate">Full Name</Text>

          <Flex className="border-2 rounded-lg mt-2 p-4 border-[#E2E2E2] text-[#555555]">
            <Text>
              {adminProfile.data &&
                adminProfile.data.data.name
              }

              {adminProfile.isLoading &&
                'Loading...'
              }
            </Text>
          </Flex>
        </Box>

        <Box>
          <Text className="text-sm font-light">Email</Text>

          <Flex className="border-2 rounded-lg mt-2 p-4 border-[#E2E2E2] text-[#555555]">
            <Text className="truncate">
              {adminProfile.data &&
                adminProfile.data.data.email
              }

              {adminProfile.isLoading &&
                'Loading...'
              }
            </Text>
          </Flex>
        </Box>

        {/* <Box>
          <Text className="text-sm font-light">Password</Text>

          <Flex className="border-2 items-center justify-between rounded-lg mt-2 p-4 border-[#E2E2E2] text-[#555555]">
            <Text className="truncate">
              ******
            </Text>

            <Link href='/profile/update_password' className="w-fit">
              <UnstyledButton className="h-fit w-fit text-[#FAA61A] font-semibold">
                Update
              </UnstyledButton>
            </Link>
          </Flex>
        </Box> */}
      </Box>
    </Box>
  )
}

export default ProfileBanner