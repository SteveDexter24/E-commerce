import React from 'react'
import { Route } from 'react-router-dom'
import SearchBox from '../components/searchBox'

const SearchScreen = () => {
  return (
    <>
      <Route
        render={({ history }) => (
          <SearchBox
            history={history}
            placeholder="Search products by name, style or category"
          />
        )}
      />
    </>
  )
}

export default SearchScreen
