import React, { useEffect } from "react";
import AuthLayout from "@/layouts/AuthLayout";

const ForgotPassword = () => {
  useEffect(() => {
    document.title = "Forgot Password";
  }, []);

  return (
    <AuthLayout>

    </AuthLayout>
  )
}

export default ForgotPassword