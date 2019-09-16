import React, { Component } from 'react'

import styled from 'styled-components'
import { FilterAlt } from 'styled-icons/boxicons-regular/FilterAlt'

class ItemFilter extends Component {
  state = {
    filterText: 'New Arrival'
  }
  render() {
    return (
      <FilterWrapper>
        <FilterIcon />
        <nav>
          <FilterList>
            {this.state.filterText}
            <FilterItem>All Items</FilterItem>
            <FilterItem className="active">New Arrival</FilterItem>
            <FilterItem>Jazz</FilterItem>
            <FilterItem>Funk / Soul</FilterItem>
            <FilterItem>Hip Hop</FilterItem>
            <FilterItem>Rock</FilterItem>
            <FilterItem>Recommended</FilterItem>
          </FilterList>
        </nav>
      </FilterWrapper>
    )
  }
}

const FilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #323232;
  color: #fffafa;
  text-align: center;

  @media (min-width: 767px) {
    background-color: #eaeaea;
    margin-right: 0.8rem;
  }
`

const FilterIcon = styled(FilterAlt)`
  width: 1.5rem;
  margin-right: 0.2rem;
  position: absolute;
  left: 1.8rem;

  @media (min-width: 767px) {
    display: none;
  }
`

const FilterList = styled.ul`
  font-size: 1.2rem;
  margin: 0.5rem 0;

  @media (min-width: 767px) {
    font-size: 1rem;
  }
`

const FilterItem = styled.li`
  visibility: hidden;
  opacity: 0;
  transition: all 0.5s ease;
  padding: 0.5rem 0;
  display: none;
  background-color: #eaeaea;

  &.active {
    background-color: #323232;
  }

  @media (min-width: 767px) {
    visibility: visible;
    opacity: 1;
    display: block;
    padding: 0.6rem 1rem;
    cursor: pointer;
  }
`

export default ItemFilter
