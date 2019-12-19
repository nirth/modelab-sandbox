import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const ApiHealthStatus = () => {
  const { loading, error, data }: any = useQuery(gql`
    {
      health {
        ok
        status
      }
    }
  `)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const {
    health: { status },
  } = data

  return <span>API Status: {JSON.stringify(status)}</span>
}

export { ApiHealthStatus }
