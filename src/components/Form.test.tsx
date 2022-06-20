import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Form } from "./Form";
import { RecoilRoot } from "recoil";

describe('form behavior', () => {
  test('new participants cant be added when input is empty', () => {
    // render component
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    )
    // find elements on input
    const e = {
      input: screen.getByPlaceholderText('Insira os nomes dos participantes'),
      button:  screen.getByRole('button')
    }
    // ensure the elementes are in document
    expect(e.input).toBeInTheDocument()
    expect(e.button).toBeInTheDocument()
    // ensure the button is disabled
    expect(e.button).toBeDisabled()
    
  })
  
  test('add participant if an name exists in the input', () => {
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    )
  
    const e = {
      input: screen.getByPlaceholderText('Insira os nomes dos participantes'),
      button:  screen.getByRole('button')
    }
  
    // insert imput value
    fireEvent.change(e.input, {
      target: {
        value: 'Ana Catarina'
      }
    })
  
    // click button to submit
    fireEvent.click(e.button)
  
    // ensures the input will be focused
    expect(e.input).toHaveFocus()
  
    // ensure input has empty
    expect(e.input).toHaveValue('')
  })
  
  test('duplicated names can`t be added to list', () => {
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    )
  
    const e = {
      input: screen.getByPlaceholderText('Insira os nomes dos participantes'),
      button:  screen.getByRole('button'),
    }
  
    // first action
    fireEvent.change(e.input, {
      target: {
        value: 'Ana Catarina'
      }
    })
    fireEvent.click(e.button)
      
    // seccond action
    fireEvent.change(e.input, {
      target: {
        value: 'Ana Catarina'
      }
    })
    fireEvent.click(e.button)
  
    // duplication name response test
    const errorMessage = screen.getByRole('alert')
    expect(errorMessage.textContent).toBe('Nomes duplicados não são permitidos.')
  })
  
  test('error message will fade out after time', () => {
    jest.useFakeTimers()
  
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    )
  
    const e = {
      input: screen.getByPlaceholderText('Insira os nomes dos participantes'),
      button:  screen.getByRole('button'),
    }
  
    // first action
    fireEvent.change(e.input, {
      target: {
        value: 'Ana Catarina'
      }
    })
    fireEvent.click(e.button)
      
    // seccond action
    fireEvent.change(e.input, {
      target: {
        value: 'Ana Catarina'
      }
    })
    fireEvent.click(e.button)
  
    let errorMessage = screen.queryByRole('alert')
    expect(errorMessage).toBeInTheDocument()
  
    // wait for N seconds
    act(() => {
      jest.runAllTimers()
    })
  
    errorMessage = screen.queryByRole('alert')
    expect(errorMessage).toBe(null)
  })
})
