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
            <FilterItem>New Arrival</FilterItem>
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

  background: #323232;
  color: #fffafa;
  text-align: center;
`

const FilterIcon = styled(FilterAlt)`
  width: 1.5rem;
  margin-right: 0.2rem;
  position: absolute;
  left: 1.8rem;
`

const FilterList = styled.ul`
  font-size: 1.2rem;
  margin: 0.5rem 0;
`

const FilterItem = styled.li`
  visibility: hidden;
  opacity: 0;
  transition: all 0.5s ease;
  margin-top: 1rem;
  display: none;
`

export default ItemFilter
