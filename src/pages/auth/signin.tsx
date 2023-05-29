import React, { useState } from "react";
import { Box } from "@mantine/core";
import toast, { Toaster } from 'react-hot-toast';
import AuthLayout from "@/layouts/AuthLayout";
import SigninForm from "@/components/forms/SigninForm";
import { useForm } from '@mantine/form';
import { useMutation } from "react-query";
import { signin } from "@/services/auth";
import Head from "next/head";

export interface SigninData {
  email: string;
  password: string;
}

const Signin = () => {
  const [checked, setChecked] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },

    validate: {
      email: (value) => (
        !value ? 'Email is required' :
          !/^\S+@\S+$/.test(value) ? 'Invalid email' : null
      ),
      password: (value) => (
        !value ? 'Password is required' : null
      )
    },
  });

  const mutation = useMutation((data: any) => signin(data), {
    onError: (error: any) => {
      form.setErrors({
        email: error.response.data.message
      })
    },

    onSuccess: () => {
      form.reset();
      toast.success('"Signin success!"')
    },
  })

  const handleSignin = async (values: SigninData) => {
    mutation.mutate(values)
  }

  return (
    <AuthLayout>
      <Head>
        <title>Signin</title>
      </Head>

      <Toaster 
        position="bottom-right" 
        reverseOrder={false} 
      />

      <Box>
        <SigninForm
          form={form}
          checked={checked}
          setChecked={setChecked}
          handleSignin={handleSignin}
        />
      </Box>
    </AuthLayout>
  )
}

export default Signin