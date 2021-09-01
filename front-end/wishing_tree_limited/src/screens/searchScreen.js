import React from 'react'
import { Route } from 'react-router-dom'
import SearchBox from '../components/searchBox'

const SearchScreen = () => {
  return (
    <div style={{ position: 'relative', top: '3rem' }}>
      <Route
        render={({ history }) => (
          <SearchBox
            history={history}
            placeholder="Search products by name, style or category"
          />
        )}
      />
    </div>
  )
}

export default SearchScreen
