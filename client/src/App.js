import React, { Component } from 'react'
import axios from 'axios'

import ItemPanel from './components/ItemPanel'

import { createMuiTheme } from '@material-ui/core/styles'
import styled, { ThemeProvider } from 'styled-components'
import * as Styled from './components/styled'

import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'

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
            <Switch>
              <Route
                path="/"
                component={() => (
                  <ItemPanel
                    recordInfo={this.state.data}
                    getData={this.getData}
                  />
                )}
              />
            </Switch>
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
