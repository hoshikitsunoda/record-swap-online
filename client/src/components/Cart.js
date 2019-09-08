import React, { Component } from 'react'
import axios from 'axios'

class Cart extends Component {
  state = {
    id: '',
    artist: '',
    title: '',
    format: '',
    price: '',
    filename: ''
  }

  getData = async url => {
    try {
      const res = await axios.get('http://localhost:5000/cart/')
      const { data } = await res
      console.log(data)
      // this.setState({
      //   data: data.data.length > 1 ? data.data.reverse() : data.data
      // })
    } catch (err) {
      console.error(err)
    }
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    return <div>Cart</div>
  }
}

export default Cart
