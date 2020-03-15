/*eslint-disable no-unused-vars*/
import React, { useState } from 'react'

const usePostForm = callback => {
  const [inputs, setInputs] = useState({})

  const handleSubmitForm = event => {
    if (event) {
      event.preventDefault()
    }
    callback()
  }

  const handleInputChange = event => {
    event.persist()
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }))
  }

  return {
    handleSubmitForm,
    handleInputChange,
    inputs
  }
}

export default usePostForm
