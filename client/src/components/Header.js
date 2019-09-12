import React from 'react'
import styled from 'styled-components'
import { ShoppingCart } from 'styled-icons/feather/ShoppingCart'

const Header = props => {
  return (
    <HeaderBg>
      <HeaderContainer className="container">
        <div className="left"></div>
        <UserCartWrapper className="right">
          <UserWrapper className="user">
            <img src="/uploads/avatar.jpeg" alt="" />
            <div className="userName">User Name</div>
          </UserWrapper>
          <div className="cart">
            <CartIcon />
          </div>
        </UserCartWrapper>
      </HeaderContainer>
    </HeaderBg>
  )
}

const HeaderBg = styled.div`
  background-color: #fffafa;
`

const HeaderContainer = styled.div`
  width: 90%;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 767px) {
    width: 60%;
  }
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
    max-width: 2.5rem;
    margin-right: 0.5rem;
    border-radius: 50%;

    @media (min-width: 767px) {
      max-width: 3.5rem;
      margin-left: 1rem;
    }
  }

  .userName {
    display: none;

    @media (min-width: 767px) {
      display: block;
    }
  }
`

const CartIcon = styled(ShoppingCart)`
  width: 1.5rem;
  margin-left: 0.5rem;

  @media (min-width: 767px) {
    width: 1.7rem;
    margin-left: 1rem;
  }
`

export default Header
