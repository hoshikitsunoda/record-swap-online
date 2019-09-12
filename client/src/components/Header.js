import React from 'react'
import styled from 'styled-components'
import { ShoppingCart } from 'styled-icons/feather/ShoppingCart'

const HeaderBg = styled.div`
  background-color: #fffafa;
`

const HeaderContainer = styled.div`
  width: 60%;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const UserCartWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0.5rem 0;
`

const UserWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  img {
    max-width: 3.5rem;
    margin-right: 1rem;
    border-radius: 50%;
  }
`

const CartIcon = styled(ShoppingCart)`
  width: 1.7rem;
  margin-left: 1rem;
`

const Header = props => {
  return (
    <HeaderBg>
      <HeaderContainer className="container">
        <div className="left"></div>
        <UserCartWrapper className="right">
          <UserWrapper className="user">
            <img src="/uploads/avatar.jpeg" alt="" />
            <div>User Name</div>
          </UserWrapper>
          <div className="cart">
            <CartIcon />
          </div>
        </UserCartWrapper>
      </HeaderContainer>
    </HeaderBg>
  )
}

export default Header
