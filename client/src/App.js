import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

import ItemPanel from './components/ItemPanel'

import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from 'styled-components'
import * as Styled from './components/styled'
import InfoBox from './components/InfoBox'

const theme = createMuiTheme()
class App extends Component {
  state = {
    data: []
  }
  componentDidMount() {
    this.getData()
  }
  getData = async err => {
    if (err) return console.error(err)
    const res = await axios.get('http://localhost:3000/inventory')
    const { data } = await res
    this.setState({ data: data.data.reverse() })
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Styled.App className="App">
          <Styled.GlobalStyle />
          <Router>
            <Route
              path="/"
              exact
              render={() => <ItemPanel recordInfo={this.state.data} />}
            />
          </Router>
        </Styled.App>
      </ThemeProvider>
    )
  }
}

export default App
