import React, { Component } from 'react'
import axios from 'axios'

import CartItem from './CartItem'

class Cart extends Component {
  state = {
    data: []
  }

  getData = async url => {
    try {
      const res = await axios.get('http://localhost:5000/cart/')
      const { data } = await res.data
      this.setState({
        data: data
      })
    } catch (err) {
      console.error(err)
    }
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const cartItemList = this.state.data.map((item, i) => {
      return <CartItem key={i} recordData={item} />
    })
    return <div>{cartItemList}</div>
  }
}

export default Cart
