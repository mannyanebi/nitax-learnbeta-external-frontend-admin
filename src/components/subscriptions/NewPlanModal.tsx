import React, { useContext } from 'react';
import { Modal, Box, Text, Radio, UnstyledButton } from '@mantine/core';
import { useMutation, useQueryClient } from 'react-query'
import { Icon } from "@iconify/react";
import toast from 'react-hot-toast';
import Input from '../custom/Input';
import Form from '../custom/Form';
import { useForm } from "@mantine/form";
import { AdminContext } from "@/contexts/AdminContext";
import { addSubscription } from '@/services/subscriptions';

type Props = { opened: boolean; close: () => void }

export type FormValuesType = {
  name: string;
  description: string;
  price: string;
  duration: number | string;
  subjects_allowed: string | number;
  radioValue: string
}

export default function NewPlanModal({ opened, close }: Props) {
  const queryClient = useQueryClient();

  const { admin } = useContext(AdminContext)
  const token = `Bearer ${admin?.data?.access_token}`

  const formValues: FormValuesType = {
    name: '',
    description: '',
    price: '',
    duration: 30,
    subjects_allowed: -1,
    radioValue: ''
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
      radioValue: (value) => {
        if (!value) {
          return 'Select subject type';
        }
        return null;
      },
    }
  });

  const addMutation = useMutation((data: any) => addSubscription(data, token), {
    onError: (error: any) => {
      toast.error(error.response.data.data)
    },
    onSuccess: () => {
      toast.success('Subcription plan add!')

      queryClient.invalidateQueries('subscriptions');

      form.reset()
    },
  })

  const handleSubmit = () => {
    let subjectsAllowedValue: string | number = form.values.subjects_allowed;

    if (form.values.radioValue === 'all') {
      subjectsAllowedValue = -1;
    }

    const data = {
      name: form.values.name,
      description: form.values.description,
      price: Number(form.values.price),
      duration: Number(form.values.duration),
      subjects_allowed: Number(subjectsAllowedValue),
      is_active: true
    };

    addMutation.mutate(data);
  };

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
            onSubmit={form.onSubmit(() => handleSubmit())}
            className='my-10'
          >
            <Box>
              <Input
                type="text"
                {...form.getInputProps('name')}
                disabled={addMutation.isLoading}
                label='Plan Name'
                placeholder="Enter Name for Plan"
                className={`w-full ${form.errors.name ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'} border-2 px-3 py-5 text-[#555555] transition duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
              />
            </Box>

            <Box className='mt-5'>
              <Input
                type="text"
                {...form.getInputProps('description')}
                disabled={addMutation.isLoading}
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
                disabled={addMutation.isLoading}
                className={`w-full ${form.errors.price ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'} border-2 px-3 py-5 text-[#555555] transition duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
              />
            </Box>

            <Box className='mt-5'>
              <Input
                type="number"
                label='Plan Duration'
                placeholder="Enter Duration for Plan"
                {...form.getInputProps('duration')}
                disabled={addMutation.isLoading}
                className={`w-full ${form.errors.duration ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'} border-2 px-3 py-5 text-[#555555] transition duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
              />
            </Box>

            <Box>
              <Radio.Group
                value={form.values.radioValue}
                onChange={(val) => {
                  if (val !== null) {
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
                    disabled={addMutation.isLoading}
                    color="yellow"
                    value='all'
                  />

                  <Radio
                    label="Custom"
                    disabled={addMutation.isLoading}
                    color="yellow"
                    value='custom'
                  />

                  {form.values.radioValue === 'custom' &&
                    <Box className='mt-5'>
                      <Input
                        type="number"
                        label='No of Subjects'
                        {...form.getInputProps('subjects_allowed')}
                        disabled={addMutation.isLoading}
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

            <Box className="text-center mt-20">
              <UnstyledButton
                disabled={addMutation.isLoading}
                type="submit"
                className="px-8 h-14 w-48 text-center font-bold transition duration-75 delay-75 ease-linear hover:bg-[#da9217] rounded-full py-4 bg-[#FAA61A] text-white"
              >
                {addMutation.isLoading ?
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
  );
}