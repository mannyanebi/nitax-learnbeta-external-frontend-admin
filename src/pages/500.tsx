import React, { useEffect } from "react";

export default function ServerDown() {
  useEffect(() => {
    document.title = "Server Down";
  }, []);

  return (
    <React.Fragment>

    </React.Fragment>
  )
}