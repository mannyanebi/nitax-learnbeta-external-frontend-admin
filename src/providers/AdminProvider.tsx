import React, { useState } from "react";
import { AdminContext } from "../contexts/AdminContext";

type AdminProps = { children: React.ReactNode }

const AdminProvider: React.FC<AdminProps> = ({ children }) => {
  const [admin, setAdmin] = useState<any>([])

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

export default AdminProvider