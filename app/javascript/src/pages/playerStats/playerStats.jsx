//External Imports
import React, { useEffect } from "react";

import { getRequest } from "@utils/fetchRequest";

export default function PlayerStats() {
  useEffect(() => {
    getRequest("/api/authenticated")
      .then(data => console.log(data))
      .catch(error => console.log(error.message))
  }, [])

  return (
    <main>
      Hi
    </main>
  )
};