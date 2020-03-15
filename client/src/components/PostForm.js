import React, { useState } from 'react'
import { useForm } from 'react-hook-form/dist/react-hook-form.ie11'
import axios from 'axios'
import {
  Grid,
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem
} from '@material-ui/core'

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

  const [mediaCondition, setMediaCondition] = useState('')
  const handleMediaConditionChange = event => {
    setMediaCondition(event.target.value)
  }

  const [coverCondition, setCoverCondition] = useState('')
  const handleCoverConditionChange = event => {
    setCoverCondition(event.target.value)
  }

  const [mediaFormat, setFormat] = useState('')
  const handleFormatChange = event => {
    setFormat(event.target.value)
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                type="text"
                id="artist"
                name="artist"
                placeholder="Artist"
                inputRef={register}
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                inputRef={register}
                fullWidth={true}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            {['media', 'cover'].map((item, i) => {
              let condition = `${item}Condition`
              return (
                <Grid item key={i} xs={4}>
                  <InputLabel id={condition}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </InputLabel>
                  <Select
                    key={i}
                    name={condition}
                    value={item === 'media' ? mediaCondition : coverCondition}
                    id={`${item.toLowerCase()}-condition`}
                    inputRef={register}
                    fullWidth={true}
                    onChange={
                      item === 'media'
                        ? handleMediaConditionChange
                        : handleCoverConditionChange
                    }
                  >
                    {conditions.map((value, i) => (
                      <MenuItem key={i} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              )
            })}
            <Grid item xs={4}>
              <InputLabel id="format-label">Format</InputLabel>
              <Select
                name="format"
                value={mediaFormat}
                id="format"
                className="format"
                inputRef={register}
                fullWidth={true}
                onChange={handleFormatChange}
              >
                {format.map((item, i) => (
                  <MenuItem value={item} key={i}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                type="text"
                id="label"
                name="label"
                placeholder="Label"
                inputRef={register}
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="number"
                id="price"
                name="price"
                placeholder="Price"
                inputRef={register}
                fullWidth={true}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Button variant="contained" component="label" fullWidth={true}>
                Upload File
                <input
                  type="file"
                  id="coverImage"
                  name="coverImage"
                  ref={register}
                />
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                type="submit"
                id="submit-button-post"
                value="Submit"
                variant="contained"
                color="primary"
                fullWidth={true}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
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
