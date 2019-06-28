import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
  componentDidMount() {
    this.getDataFromDb()
  }
  getDataFromDb = () => {
    axios
      .get('http://localhost:3000/inventory')
      .then(res => console.log(res.data))

    // fetch('http://localhost:3000/inventory', {
    //   crossDomain: true,
    //   headers: {
    //     'Content-Type': 'application/jason',
    //     Accept: 'application/json'
    //   }
    // })
    //   .then(data => data.json())
    //   .then(res => console.log(res.data))
  }
  render() {
    return (
      <div className="App">
        <div>Test</div>
      </div>
    )
  }
}

export default App
