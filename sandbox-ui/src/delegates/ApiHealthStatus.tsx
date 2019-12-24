import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Icon } from 'semantic-ui-react'
import gql from 'graphql-tag'

const Online = () => <Icon name="cloud" color="green" />
const Offline = () => <Icon name="cloud" flipped="vertically" color="red" />
const Loading = () => <Icon name="sun outline" loading />

const ApiHealthStatus = () => {
  const { loading, error, data }: any = useQuery(gql`
    {
      health @client {
        ok
      }
    }
  `)

  if (loading) return <Loading />
  if (error) return <Offline />

  const {
    health: { ok },
  } = data

  return ok === true ? <Online /> : <Offline />
}

export { ApiHealthStatus }
