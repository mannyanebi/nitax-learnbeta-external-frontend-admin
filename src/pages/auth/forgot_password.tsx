import React, { useState } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import Head from "next/head";
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from '@mantine/form';
import { useMutation } from "react-query";
import Router from "next/router";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import OTPForm from "@/components/forms/OTPForm";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import {
  forgotPassword,
  verifyOTP,
  resetPassword
} from "@/services/auth";

export type ForgotPasswordData = { email: string }
export type OTPData = { code: string }
export interface ResetPasswordData {
  new_password: string,
  confirm_password: string
}

const ForgotPassword = () => {
  const [step, setStep] = useState('forgot_password')

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

  const otpForm = useForm({
    initialValues: { code: '' },

    validate: {
      code: (value) => (
        !value ? 
        'Enter OTP code' :
        value.length < 6 ? 
        'Enter 6 digit code' : null
      )
    },
  });

  const resetPasswordForm = useForm({
    initialValues: {
      new_password: '',
      confirm_password: ''
    },

    validate: {
      new_password: (value) => (
        !value ? 
        'Password is required' : 
        value.length < 8 ? 
        'Password must be at least 8 characters long' : 
        !/\d/.test(value) ? 
        'Password must contain at least one number' : 
        !/[A-Z]/.test(value) ? 
        'Password must contain at least one uppercase letter' : null
      ),

      confirm_password: (value, values) => (
        !value ? 
        'Confirm password' :
        value !== values.new_password ?
        'Password do not match' : null
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
      // set step to enter_otp
    }
  })

  const otpMutation = useMutation((data: any) => verifyOTP(data), {
    onError: (error: any) => {
      otpForm.setErrors({
        code: error.response.data.message
      })
    },

    onSuccess: (data) => {
      // toast success
      // set step to reset_password
    }
  })

  const resetPasswordMutation = useMutation((data: any) => resetPassword(data), {
    onError: (error: any) => {
      otpForm.setErrors({
        new_password: error.response.data.message
      })
    },

    onSuccess: (data) => {
      // toast success
      // set step to forgot_password
      // redirect to login
    }
  })

  const handleForgotPassword = async (values: ForgotPasswordData) => {
    forgotPasswordMutation.mutate(values)
  }

  const handleOTP = async (values: OTPData) => {
    otpMutation.mutate(values)
  }

  const handleResetPassword = async (values: ResetPasswordData) => {
    resetPasswordMutation.mutate(values)
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

      {step === 'forgot_password' &&
        <ForgotPasswordForm
          forgotPasswordForm={forgotPasswordForm}
          handleForgotPassword={handleForgotPassword}
          forgotPasswordMutation={forgotPasswordMutation}
        />
      }

      {step === 'enter_otp' &&
        <OTPForm
          otpForm={otpForm}
          handleOTP={handleOTP}
          otpMutation={otpMutation}
        />
      }

      {step === 'reset_password' &&
        <ResetPasswordForm
          resetPasswordForm={resetPasswordForm}
          resetPasswordMutation={resetPasswordMutation}
          handleResetPassword={handleResetPassword}
        />
      }
    </AuthLayout>
  )
}

export default ForgotPassword