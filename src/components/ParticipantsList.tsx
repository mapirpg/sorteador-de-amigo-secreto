import React from "react";

import { useParticipantsList } from "../state/hooks/useParticipantsList";

export const ParticipantsList = () => {
  const participants: string[] = useParticipantsList()
  
  return(
    <ul>
      {participants.map(participant => {
        return (
        <li key={participant} >
          {participant}
        </li>
        )
      })}
    </ul>
  )
}