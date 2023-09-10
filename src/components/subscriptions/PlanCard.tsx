import React, { useContext } from "react";
import { Skeleton, UnstyledButton, Modal, Box, Text, Select, Radio } from "@mantine/core";
import Input from '../custom/Input';
import { useDisclosure } from "@mantine/hooks";
import Form from '../custom/Form';
import toast from 'react-hot-toast';
import { Icon } from "@iconify/react";
import { AdminContext } from "@/contexts/AdminContext";
import { useMutation, useQueryClient } from 'react-query'
import { useForm } from "@mantine/form";
import { editSubscription } from "@/services/subscriptions";

export const PlanCardSkeleton = () => {
  return (
    <Box className='w-full border-2 h-[18rem] rounded-3xl border-[#E2E2E2] p-6 text-center space-y-6'>
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

type NoPlanProps = { colorTheme: string; item: any }

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

interface Props { style: any; sub: any }

export type FormValuesType = {
  name: string;
  description: string;
  price: number;
  duration: number;
  subjects_allowed: number;
  is_active: string | null;
  radioValue: string
}

const PlanCard: React.FC<Props> = ({ style, sub }) => {
  const queryClient = useQueryClient();

  const { admin } = useContext(AdminContext)
  const token = `Bearer ${admin?.data?.access_token}`
  const [opened, { open, close }] = useDisclosure(false);

  const colors = [ 'red', 'green', 'blue', 'purple'];

  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
  const color = getRandomColor()

  const formValues: FormValuesType = {
    name: sub.name,
    description: sub.description,
    price: sub.price,
    duration: sub.duration,
    subjects_allowed: sub.subjects_allowed,
    is_active: sub.active ? 'true' : 'false',
    radioValue: sub.subjects_allowed === -1 ? 'all' : 'custom'
  }

  const form = useForm({
    initialValues: formValues,

    validate: {
      name: (value) => {
        if (!value) {
          return 'Name is required';
        }
        return null;
      },
      description: (value) => {
        if (!value) {
          return 'Description is required';
        }
        return null;
      },
      price: (value) => {
        if (!value) {
          return 'Price is required';
        }
        return null;
      },
      duration: (value) => {
        if (!value) {
          return 'Duration is required';
        }
        return null;
      },
      subjects_allowed: (value, values) => {
        const numericValue = Number(value);
        if (values.radioValue !== 'all' && (numericValue <= 0 || numericValue === -1)) {
          return 'Subjects allowed must be more than 0';
        }
        return null;
      },
      is_active: (value) => {
        if (value === undefined || value === null) {
          return 'Active status is required';
        }
        return null;
      },
      radioValue: (value) => {
        if (!value) {
          return 'Select subject type';
        }
        return null;
      },
    }
  });

  const editMutation = useMutation((data: any) => editSubscription(data, sub.id.toString(), token), {
    onError: (error: any) => {
      toast.error(error.response.data.data)
    },
    onSuccess: () => {
      toast.success('Subcription plan updated!')

      queryClient.invalidateQueries('subscriptions');

      close()
    },
  })

  const handleSubmit = () => {
    let subjectsAllowedValue = form.values.subjects_allowed;

    if (form.values.radioValue === 'all') {
      subjectsAllowedValue = -1;
    }

    const data = {
      name: form.values.name,
      description: form.values.description,
      price: Number(form.values.price),
      duration: Number(form.values.duration), 
      subjects_allowed: Number(subjectsAllowedValue),
      is_active: form.values.is_active === 'true' ? true : false,
    };

    editMutation.mutate(data);
  };

  return (
    <React.Fragment>
      <Box style={style} className='w-full border-2 rounded-3xl border-[#E2E2E2] p-6 text-center space-y-5'>
        <Text className={`text-${color}-500 font-semibold text-lg`}>
          {sub.name}
        </Text>

        <Text className="font-bold text-[#666666] text-2xl">
          &#x20A6;{sub.price}
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
          {sub.description}
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
            onSubmit={form.onSubmit(() => handleSubmit())}
            className='my-10'
          >
            <Box>
              <Input
                type="text"
                {...form.getInputProps('name')}
                disabled={editMutation.isLoading}
                label='Plan Name'
                placeholder="Enter Name for Plan"
                className={`w-full ${form.errors.name ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'} border-2 px-3 py-5 text-[#555555] transition duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
              />
            </Box>

            <Box className='mt-5'>
              <Input
                type="text"
                {...form.getInputProps('description')}
                disabled={editMutation.isLoading}
                label='Plan Description'
                placeholder="Enter Description for Plan"
                className={`w-full border-2 ${form.errors.description ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'} px-3 py-5 text-[#555555] transition duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
              />
            </Box>

            <Box className='mt-5'>
              <Input
                type="number"
                label='Plan Price ₦'
                placeholder="Enter Plan Price"
                {...form.getInputProps('price')}
                disabled={editMutation.isLoading}
                className={`w-full ${form.errors.price ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'} border-2 px-3 py-5 text-[#555555] transition duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
              />
            </Box>

            <Box className='mt-5'>
              <Input
                type="number"
                label='Plan Duration'
                placeholder="Enter Duration for Plan"
                {...form.getInputProps('duration')}
                disabled={editMutation.isLoading}  
                className={`w-full ${form.errors.duration ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'} border-2 px-3 py-5 text-[#555555] transition duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
              />
            </Box>

            <Box>
              <Radio.Group
                value={form.values.radioValue}
                onChange={(val) => {
                  if(val !== null) {
                    form.setValues({
                      ...form.values,
                      radioValue: val
                    })
                  }
                }}
                label={
                  <label className="text-sm !text-[#585858]">
                    Subjects Allowed
                  </label>
                }
                className='mt-5'
              >
                <Box className={`border-2 space-y-3 rounded-lg p-3 ${form.errors.radioValue ? 'border-red-500' : null}`}>
                  <Radio
                    label="All Subjects"
                    color="yellow"
                    value='all'
                    disabled={editMutation.isLoading}
                  />

                  <Radio
                    label="Custom"
                    color="yellow"
                    value='custom'
                    disabled={editMutation.isLoading}
                  />

                  {form.values.radioValue === 'custom' &&
                    <Box className='mt-5'>
                      <Input
                        type="number"
                        label='No of Subjects'
                        {...form.getInputProps('subjects_allowed')}
                        disabled={editMutation.isLoading}  
                        placeholder="Enter Number of Subjects"
                        className={`w-full ${form.errors.radioValue ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'} border-2 px-3 py-5 text-[#555555] transition duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
                      />
                    </Box>
                  }
                </Box>
              </Radio.Group>

              <div className="mt-[0.2rem]">
                {form.errors.radioValue &&
                  <label className="text-red-500 text-sm">
                    {form.errors.radioValue}
                  </label>
                }
              </div>
            </Box>

            <Box className='mt-5'>
              <Select
                label={
                  <label className="text-sm !text-[#585858]">
                    Plan Status
                  </label>
                }
                placeholder='Select Plan Status'
                value={form.values.is_active}
                disabled={editMutation.isLoading}
                onChange={(val) => {
                  if(val !== null){                    
                    form.setValues({
                      ...form.values,
                      is_active: val
                    })
                  }
                }}
                data={[
                  { value: 'true', label: 'Active' },
                  { value: 'false', label: 'Inactive' }
                ]}
                styles={() => ({
                  input: {
                    border: form.errors.is_active ? '2px solid red' : '2px solid #E9E5E5',
                    '&:focus-within': {
                      borderColor: '#FAA61A',
                    },
                    borderRadius: '0.5rem',
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    width: '100%',
                    color: "#483D3D",
                    fontWeight: 500,
                    height: '3.7rem',
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

              <Box className="mt-[0.2rem]">
                {form.errors.is_active &&
                  <label className="text-red-500 text-sm">
                    {form.errors.is_active}
                  </label>
                }
              </Box>
            </Box>

            <Box className="text-center mt-20">
              <UnstyledButton
                disabled={editMutation.isLoading}
                type="submit"
                className="px-8 h-14 w-48 text-center font-bold transition duration-75 delay-75 ease-linear hover:bg-[#da9217] rounded-full py-4 bg-[#FAA61A] text-white"
              >
                {editMutation.isLoading ?
                  <Icon
                    className={`animate-spin mx-auto`}
                    icon="icomoon-free:spinner2"
                    color="#white"
                    width="20"
                    height="20"
                  /> :
                  'Save Changes'
                }
              </UnstyledButton>
            </Box>
          </Form>
        </Box>
      </Modal>
    </React.Fragment>
  )
}

export default PlanCard