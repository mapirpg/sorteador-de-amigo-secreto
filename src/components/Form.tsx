import React, { useRef, useState } from "react"
import { useAddParticipant } from "../state/hooks/useAddParticipants"
import { useErrorMessage } from "../state/hooks/useErrorMessage"

export const Form = () => {
  const [name, setName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const addOnList = useAddParticipant()
  const errorMessage = useErrorMessage()

  const addParticipant = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addOnList(name)
    setName('')
    inputRef.current?.focus()
  }

  return (
    <form 
      onSubmit={addParticipant}
    >

      <input 
        ref={inputRef}
        type={'text'} 
        placeholder={'Insira os nomes dos participantes'}
        value={name}
        onChange={e => setName(e.target.value)}
      />


      <button
        disabled={!name}
        
      >
        {'Adicionar'}
      </button>

      { errorMessage && 
      <span role='alert'>
        {errorMessage}
      </span> 
      }

    </form>
  )
}