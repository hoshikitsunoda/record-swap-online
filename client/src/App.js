import React, { Component } from 'react'
import axios from 'axios'

import ItemPanel from './components/ItemPanel'
import Header from './components/Header'

import { createMuiTheme } from '@material-ui/core/styles'
import styled, { ThemeProvider } from 'styled-components'
import * as Styled from './components/styled'

import { BrowserRouter } from 'react-router-dom'

const theme = createMuiTheme()
class App extends Component {
  state = {
    data: []
  }
  getData = async url => {
    try {
      const res = await axios.get(url)
      const { data } = await res
      this.setState({
        data: data.data.length > 1 ? data.data.reverse() : data.data
      })
    } catch (err) {
      console.error(err)
    }
  }
  render() {
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AppWrapper className="App">
            <Styled.GlobalStyle />
            <Header />
            <ItemPanel recordInfo={this.state.data} getData={this.getData} />
          </AppWrapper>
        </ThemeProvider>
      </BrowserRouter>
    )
  }
}

const AppWrapper = styled.div`
  background: #fffafa;
  padding: 0;
  min-height: 100vh;

  @media (min-width: 767px) {
    height: 100vh;
  }
`

export default App
