import React, { Component } from 'react'
import axios from 'axios'

import ItemPanel from './ItemPanel'

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
        console.log(response.data.data)
        this.setState({ data: response.data.data })
      })
      .catch(err => console.error(err))
    return res
  }
  render() {
    return (
      <div className="App">
        <div>
          <ItemPanel />
        </div>
      </div>
    )
  }
}

export default App
