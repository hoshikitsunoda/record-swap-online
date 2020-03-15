import React from 'react'
import { useForm } from 'react-hook-form/dist/react-hook-form.ie11'
import axios from 'axios'

import styled from 'styled-components'

const conditions = [
  'Sealed',
  'NM',
  'NM-',
  'VG+',
  'VG',
  'VG-',
  'G+',
  'G',
  'F',
  'P'
]

const format = ['LP', '12"', '7"', 'Tape', 'Other Format']

function PostForm() {
  const { register, handleSubmit } = useForm()
  const onSubmit = (data, event) => {
    event.preventDefault()
    const formData = new FormData()
    for (var key in data) {
      let dataToBeAppended = data[key]
      if (key === 'coverImage') {
        dataToBeAppended = data[key][0]
      }
      formData.append(key, dataToBeAppended)
    }
    console.log(formData)
    axios
      .post('http://localhost:5000/inventory', formData, {
        'Content-Type': 'multipart/form-data'
      })
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }
  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            id="artist"
            name="artist"
            placeholder="Artist"
            ref={register}
          />
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            ref={register}
          />
          <div className="condition-wrapper">
            <label>Condition: (Media/Cover)</label>
            {['media', 'cover'].map((item, i) => {
              let condition = `${item}Condition`
              return (
                <React.Fragment key={i}>
                  <select
                    key={i}
                    name={condition}
                    id={`${item.toLowerCase()}-condition`}
                    ref={register}
                  >
                    {conditions.map((value, i) => (
                      <option key={i} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                  <span className="divider" key={`a${i}`}>
                    /
                  </span>
                </React.Fragment>
              )
            })}
          </div>
          <select name="format" id="format" className="format" ref={register}>
            {format.map((item, i) => (
              <option value={item} key={i}>
                {item}
              </option>
            ))}
          </select>
          <input
            type="text"
            id="label"
            name="label"
            placeholder="label"
            ref={register}
          />
          <input
            type="text"
            id="price"
            name="price"
            placeholder="price"
            ref={register}
          />
          <input type="file" id="coverImage" name="coverImage" ref={register} />
          <button type="submit" id="submit-button-post" value="Submit">
            Submit
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default PostForm

const Wrapper = styled.div`
  width: 60%;
  margin: 0 auto;
  padding-top: 5rem;
`
