import React, { useEffect } from "react";
import AuthLayout from "@/layouts/AuthLayout";

const Signin = () => {
  useEffect(() => {
    document.title = "Signin";
  }, []);

  return (
    <AuthLayout>

    </AuthLayout>
  )
}

export default Signin