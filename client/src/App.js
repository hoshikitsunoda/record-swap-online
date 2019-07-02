import React, { Component } from 'react'
import axios from 'axios'

import ItemPanel from './components/ItemPanel'

import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from 'styled-components'
import * as Styled from './components/styled'

const theme = createMuiTheme()
class App extends Component {
  state = {
    data: []
  }
  componentDidMount() {
    this.getData()
  }
  getData = () => {
    const res = axios
      .get('http://localhost:3000/inventory')
      .then(response => {
        this.setState({ data: response.data.data.reverse() })
      })
      .catch(err => console.error(err))
    return res
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Styled.App className="App">
          <Styled.GlobalStyle />
          <ItemPanel recordInfo={this.state.data} />
        </Styled.App>
      </ThemeProvider>
    )
  }
}

export default App
