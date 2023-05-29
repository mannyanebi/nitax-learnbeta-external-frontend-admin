import React from "react";
import AuthLayout from "@/layouts/AuthLayout";
import Head from "next/head";
import { Box } from "@mantine/core";
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from '@mantine/form';
import { useMutation } from "react-query";
import Router from "next/router";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import { forgotPassword } from "@/services/auth";

export type ForgotPasswordData = { email: string }

const ForgotPassword = () => {
  const forgotPasswordForm = useForm({
    initialValues: {
      email: ''
    },

    validate: {
      email: (value) => (
        !value ? 'Email is required' :
          !/^\S+@\S+$/.test(value) ? 'Invalid email' : null
      )
    },
  });

  const forgotPasswordMutation = useMutation((data: any) => forgotPassword(data), {
    onError: (error: any) => {
      forgotPasswordForm.setErrors({
        email: error.response.data.message
      })
    },

    onSuccess: (data) => {

    }
  })

  const handleForgotPassword = async (values: ForgotPasswordData) => {
    forgotPasswordMutation.mutate(values)
  }

  return (
    <AuthLayout>
      <Head>
        <title>Forgot Password</title>
      </Head>

      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />

      <Box>
        <ForgotPasswordForm
          forgotPasswordForm={forgotPasswordForm}
          handleForgotPassword={handleForgotPassword}
          forgotPasswordMutation={forgotPasswordMutation}
        />
      </Box>
    </AuthLayout>
  )
}

export default ForgotPassword