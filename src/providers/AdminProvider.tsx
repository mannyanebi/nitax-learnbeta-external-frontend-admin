import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getCookieItem } from "@/helpers/functions/cookie";
import { AdminContext } from "../contexts/AdminContext";

type AdminProps = { children: React.ReactNode }

const Provider: React.FC<AdminProps> = ({ children }) => {
  const [admin, setAdmin] = useState<any>(getCookieItem("learnbeta_admin") || null)

  return (
    <AdminContext.Provider
      value={{
        admin,
        setAdmin
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

const AdminProvider = dynamic(() => Promise.resolve(Provider), {
  ssr: false
});

export default AdminProvider