import React, { Component } from 'react'
import axios from 'axios'

import ItemPanel from './components/ItemPanel'

import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from 'styled-components'
import * as Styled from './components/styled'

import { BrowserRouter } from 'react-router-dom'

const theme = createMuiTheme()
class App extends Component {
  state = {
    data: []
  }
  getData = async (url, err) => {
    if (err) return console.error(err)
    // const res = await axios.get('http://localhost:3000/inventory/')
    const res = await axios.get(url)
    const { data } = await res
    this.setState({
      data: data.data.length < 1 ? data.data.reverse() : data.data
    })
  }
  render() {
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Styled.App className="App">
            <Styled.GlobalStyle />
            <ItemPanel recordInfo={this.state.data} getData={this.getData} />
          </Styled.App>
        </ThemeProvider>
      </BrowserRouter>
    )
  }
}

export default App
