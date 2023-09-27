import React, { useState, useContext } from "react";
import { Box } from "@mantine/core";
import toast, { Toaster } from 'react-hot-toast';
import AuthLayout from "@/layouts/AuthLayout";
import SigninForm from "@/components/forms/SigninForm";
import { useForm } from '@mantine/form';
import { useMutation } from "react-query";
import { signin } from "@/services/auth";
import Head from "next/head";
import Router from "next/router";
import { AdminContext } from "@/contexts/AdminContext";
import { setCookieItem } from "@/helpers/functions/cookie";

export interface SigninData {
  email: string;
  password: string;
}

const Signin = () => {
  const { setAdmin } = useContext(AdminContext)
  const [checked, setChecked] = useState(true);

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
        email: error.response.data.message // update error object path
      })
    },

    onSuccess: (data) => {
      const now = new Date()
      let admin = data

      if (checked){
        admin.expiry = now.getTime() + 86400000 // 1 day
      } else {
        admin.expiry = now.getTime() + 21600000 // 6 hrs
      }
        
      setCookieItem('learnbeta_admin', admin)
      setAdmin(admin)

      form.reset();
      toast.success('Signin successful')

      const params = new URLSearchParams(window.location.search);

      if (params.has("redirect")) {
        const redirectUrl = params.get("redirect");

        if (redirectUrl !== null) {
          setTimeout(() => {
            Router.push(redirectUrl)
          }, 2000);
        }
      } else {
        setTimeout(() => {
          Router.push("/dashboard/overview");
        }, 2000);
      }
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
          mutation={mutation}
          checked={checked}
          setChecked={setChecked}
          handleSignin={handleSignin}
        />
      </Box>
    </AuthLayout>
  )
}

export default Signin