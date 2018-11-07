import React, { Component } from 'react';
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

const ALL_LIFTS_QUERY = gql`
query {
  allLifts {
    id
    name
    status
  }
}
`

const App = () => (
  <Query query={ALL_LIFTS_QUERY}>
    {({ loading, data }) => {
      if (loading) return <p>Loading...</p>

      return <div>
        {!loading && data.allLifts.map(lift => <h3 key={lift.id}> {lift.name} </h3>)} </div>
    }}
  </Query>
)

export default App