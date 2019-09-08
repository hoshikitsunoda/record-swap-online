import React from 'react'

const CartItem = props => {
  console.log(props.recordData)
  const item = props.recordData
  return (
    <div>
      <div>
        <img src={item.filename} alt="" />
      </div>
      <div>
        <h3>{item.artist}</h3>
        <h4>{item.title}</h4>
        <p>{item.format}</p>
        <h3>${item.price}</h3>
      </div>
    </div>
  )
}

export default CartItem
