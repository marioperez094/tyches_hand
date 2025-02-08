//External Imports
import React from "react";

//Components
import GuestMessage from "./guestMessage";
import { HealthBarWithName } from "@components/gameAssets/healthBar/healthBar";

export default function PlayerCollections({ player }) {
  const { username, blood_pool, guest } = player;

  console.log(username)

  if (guest) return <GuestMessage />;

  return(
    <>
      <div className="mx-auto my-3">
        <HealthBarWithName
          name={ username }
          health={ blood_pool }
          isPlayer
        />
      </div>
    </>
  )
};