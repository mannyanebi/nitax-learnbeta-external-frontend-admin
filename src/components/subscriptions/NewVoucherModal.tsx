import React, { useContext, useState } from 'react';
import { Modal, Box, Text, Flex, Tabs, UnstyledButton, Select } from '@mantine/core';
import Form from '../custom/Form';
import { Icon } from "@iconify/react";
import toast from 'react-hot-toast';
import Input from '../custom/Input';
import { useForm } from "@mantine/form";
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { AdminContext } from "@/contexts/AdminContext";
import { generateVoucher, getSubscriptionPlans } from '@/services/subscriptions';

interface Props {
  opened: boolean,
  close: () => void
}

export type FormValuesType = {
  validity: string;
  subscription_plan_id: string | null;
  code: string;
}

export default function NewVoucherModal({ opened, close }: Props) {
  const queryClient = useQueryClient();
  const { admin } = useContext(AdminContext)
  const token = `Bearer ${admin?.data?.access_token}`

  const [activeTab, setActiveTab] = useState<string | null>('autogenerate');

  const subscriptions = useQuery('subscriptions', () => getSubscriptionPlans(token))

  const formValues: FormValuesType = {
    validity: '',
    subscription_plan_id: null,
    code: '',
  }

  const form = useForm({
    initialValues: formValues,

    validate: {
      validity: (value) => {
        if (!value) {
          return 'Validity period is required';
        }
        return null;
      },
      subscription_plan_id: (value) => {
        if (!value) {
          return 'Select subscription plan';
        }
        return null;
      },
      code: (value) => {
        if (activeTab === 'autogenerate') {
          return null; // No validation required when activeTab is 'autogenerate'
        }
        if (!value || value.length < 8) {
          return 'Enter 8 character voucher code';
        }
        return null;
      },
    }
  });

  const mutation = useMutation((data: any) => generateVoucher(data, token), {
    onError: (error: any) => {
      toast.error(error.response.data.message)
    },
    onSuccess: () => {
      toast.success('New voucher generated!')

      queryClient.invalidateQueries('vouchers');

      form.reset()
    },
  })

  const handleSubmit = () => {
    let data;

    if (activeTab === 'autogenerate') {
      data = {
        validity: Number(form.values.validity),
        subscription_plan_id: Number(form.values.subscription_plan_id)
      }
    } else {
      data = {
        validity: Number(form.values.validity),
        subscription_plan_id: Number(form.values.subscription_plan_id),
        code: form.values.code
      }
    }

    mutation.mutate(data);
  };

  const labelStyles = {
    color: '#343434',
    fontSize: '0.875rem',
    fontWeight: 400
  };

  const subscriptionState = subscriptions?.data?.data.map((sub: any) => ({
    value: sub.id.toString(),
    label: sub.name
  })) || []

  return (
    <React.Fragment>
      <Modal
        size='lg'
        radius={12}
        opened={opened}
        onClose={close}
        centered
      >
        <Box className='px-2 sm:px-8 md:px-10'>
          <Text className='font-semibold text-center text-lg'>
            Create Voucher
          </Text>

          <Box className='mt-10'>
            <Tabs
              unstyled
              value={activeTab} 
              onTabChange={setActiveTab}
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
                  justifyContent: 'center',
                  width: '160px',

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
                  height: '50px'
                },
              })}
            >
              <Box className="p-1 w-fit mx-auto">
                <Tabs.List>
                  <Tabs.Tab value="autogenerate" disabled={mutation.isLoading}>
                    Autogenerate
                  </Tabs.Tab>

                  <Tabs.Tab value="create_manually" disabled={mutation.isLoading}>
                    Create Manually
                  </Tabs.Tab>
                </Tabs.List>
              </Box>

              <Tabs.Panel value="autogenerate" pt="xs">
                <Form
                  onSubmit={form.onSubmit(() => handleSubmit())}
                >
                  <Box className='mt-5'>
                    <Input
                      type="number"
                      {...form.getInputProps('validity')}
                      disabled={mutation.isLoading}
                      label='Voucher Validity'
                      placeholder="Enter voucher validity period"
                      className={`w-full border-2 ${form.errors.validity ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'} px-3 py-5 text-[#555555] transition duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
                    />
                  </Box>

                  {activeTab === 'create_manually' &&
                    <Box className='mt-5'>
                      <Input
                        type="text"
                        label='Voucher Code'
                        placeholder="Enter voucher code"
                        {...form.getInputProps('code')}
                        disabled={mutation.isLoading}
                        className={`w-full ${form.errors.code ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'} border-2 px-3 py-5 text-[#555555] transition duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
                      />
                    </Box>
                  }

                  <Box className='mt-5'>
                    <Select
                      size='xl'
                      radius={8}
                      disabled={mutation.isLoading}
                      placeholder='Select subscription plan'
                      value={form.values.subscription_plan_id}
                      onChange={(val) => {
                        if(val !== null) {
                          form.setValues({
                            ...form.values,
                            subscription_plan_id: val
                          })
                        }
                      }}
                      data={subscriptionState}
                      label={
                        <span style={labelStyles}>
                          Select subscription plan 
                        </span>
                      }
                      styles={() => ({
                        input: {
                          border: form.errors.subscription_plan_id ? '2px solid red' : '2px solid #E2E2E2',
                          '&:focus-within': {
                            borderColor: form.errors.subscription_plan_id ? 'red' : '#FAA61A',
                          },
                          color: '#555555'
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

                    <Box className="mt-[0.3rem]">
                      {subscriptions.isError &&
                        <Flex className='space-x-1'>
                          <Text className="text-orange-800 animate-pulse font-sans text-sm">
                            Failed to fetch subscriptions.
                          </Text>

                          <Text onClick={() => subscriptions.refetch()} className="text-orange-800 hover:underline hover:cursor-pointer animate-pulse font-sans text-sm">
                            Retry
                          </Text>
                        </Flex>
                      }

                      {subscriptions.isLoading &&
                        <Flex className='animate-pulse items-center space-x-1'>
                          <Icon icon="eos-icons:loading" color="#555555" width="18" height="18" />

                          <Text className="text-[#555555] font-sans text-sm">
                            Loading
                          </Text>
                        </Flex>
                      }
                    </Box>

                    <Box className="mt-[0.3rem]">
                      {form.errors.subscription_plan_id &&
                        <Text className="text-red-500 font-sans text-sm">
                          {form.errors.subscription_plan_id}
                        </Text>
                      }
                    </Box>
                  </Box>

                  <Box className="text-center my-16">
                    <UnstyledButton
                      disabled={mutation.isLoading}
                      type="submit"
                      className="px-8 h-14 disabled:opacity-50 w-56 text-center font-bold transition duration-75 delay-75 ease-linear hover:bg-[#da9217] rounded-full py-4 bg-[#FAA61A] text-white"
                    >
                      {mutation.isLoading ?
                        <Icon
                          className={`animate-spin mx-auto`}
                          icon="icomoon-free:spinner2"
                          color="#white"
                          width="20"
                          height="20"
                        /> :
                        'Generate Voucher'
                      }
                    </UnstyledButton>
                  </Box>
                </Form>
              </Tabs.Panel>

              <Tabs.Panel value="create_manually" pt="xs">
                <Form
                  onSubmit={form.onSubmit(() => handleSubmit())}
                >
                  <Box className='mt-5'>
                    <Input
                      type="number"
                      {...form.getInputProps('validity')}
                      disabled={mutation.isLoading}
                      label='Voucher Validity'
                      placeholder="Enter voucher validity period"
                      className={`w-full border-2 ${form.errors.validity ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'} px-3 py-5 text-[#555555] transition duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
                    />
                  </Box>

                  {activeTab === 'create_manually' &&
                    <Box className='mt-5'>
                      <Input
                        type="text"
                        label='Voucher Code'
                        placeholder="Enter voucher code"
                        {...form.getInputProps('code')}
                        disabled={mutation.isLoading}
                        className={`w-full ${form.errors.code ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'} border-2 px-3 py-5 text-[#555555] transition duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
                      />
                    </Box>
                  }

                  <Box className='mt-5'>
                    <Select
                      size='xl'
                      radius={8}
                      disabled={mutation.isLoading}
                      placeholder='Select subscription plan'
                      value={form.values.subscription_plan_id}
                      onChange={(val) => {
                        if (val !== null) {
                          form.setValues({
                            ...form.values,
                            subscription_plan_id: val
                          })
                        }
                      }}
                      data={subscriptionState}
                      label={
                        <span style={labelStyles}>
                          Select subscription plan
                        </span>
                      }
                      styles={() => ({
                        input: {
                          border: form.errors.subscription_plan_id ? '2px solid red' : '2px solid #E2E2E2',
                          '&:focus-within': {
                            borderColor: form.errors.subscription_plan_id ? 'red' : '#FAA61A',
                          },
                          color: '#555555'
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

                    <Box className="mt-[0.3rem]">
                      {subscriptions.isError &&
                        <Flex className='space-x-1'>
                          <Text className="text-orange-800 animate-pulse font-sans text-sm">
                            Failed to fetch subscriptions.
                          </Text>

                          <Text onClick={() => subscriptions.refetch()} className="text-orange-800 hover:underline hover:cursor-pointer animate-pulse font-sans text-sm">
                            Retry
                          </Text>
                        </Flex>
                      }

                      {subscriptions.isLoading &&
                        <Flex className='animate-pulse items-center space-x-1'>
                          <Icon icon="eos-icons:loading" color="#555555" width="18" height="18" />

                          <Text className="text-[#555555] font-sans text-sm">
                            Loading
                          </Text>
                        </Flex>
                      }
                    </Box>

                    <Box className="mt-[0.3rem]">
                      {form.errors.subscription_plan_id &&
                        <Text className="text-red-500 font-sans text-sm">
                          {form.errors.subscription_plan_id}
                        </Text>
                      }
                    </Box>
                  </Box>

                  <Box className="text-center my-16">
                    <UnstyledButton
                      disabled={mutation.isLoading}
                      type="submit"
                      className="px-12 h-14 disabled:opacity-50 w-60 text-center font-bold transition duration-75 delay-75 ease-linear hover:bg-[#da9217] rounded-full py-4 bg-[#FAA61A] text-white"
                    >
                      {mutation.isLoading ?
                        <Icon
                          className={`animate-spin mx-auto`}
                          icon="icomoon-free:spinner2"
                          color="#white"
                          width="20"
                          height="20"
                        /> :
                        'Creater Voucher'
                      }
                    </UnstyledButton>
                  </Box>
                </Form>
              </Tabs.Panel>
            </Tabs>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}