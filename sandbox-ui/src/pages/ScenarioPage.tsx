import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import gql from 'graphql-tag'
import { Dimmer, Loader } from 'semantic-ui-react'

// const Online = () => <Icon name="cloud" color="green" />
// const Offline = () => <Icon name="cloud" flipped="vertically" color="red" />
// const Loading = () => <Icon name="sun outline" loading />

const findScenarioQuery = gql`
  query FindScenario($slug: String!) @client {
    scenario(slug: $slug) @client {
      id
    }
  }
`

const ScenarioPage = () => {
  const { scenarioSlug } = useParams()

  const { loading, error, data }: any = useQuery(findScenarioQuery, {
    variables: { slug: scenarioSlug },
  })

  console.log('Page', 'loading:', loading)
  console.log('Page', 'error:', error)
  console.log('Page', 'data:', data)

  if (loading) {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    )
  }

  return <div>foobar</div>
}

export { ScenarioPage }
