import React from 'react'
import { useHistory } from 'react-router-dom'
import { Dropdown } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Scenarios, Scenario } from '../sbdk/datamodel'
import { RichDropdown } from '../components/RichDropdown'

const scenariosQuery = gql`
  query FindScenarios @client {
    scenarios @client {
      id
      slug
      title
      description
    }
  }
`

const transformScenariosToOptions = (scenarios: Scenarios) =>
  scenarios.map((scenario: Scenario, index) => ({
    key: scenario.id,
    value: scenario.slug,
    title: scenario.title,
    description: scenario.description,
  }))

const ScenariosMenu = (props: any) => {
  const history = useHistory()
  const { loading, error, data }: any = useQuery(scenariosQuery)

  if (loading) {
    return <Dropdown text="Loading" loading />
  }

  if (error) {
    return <Dropdown text="Error" error />
  }

  const { scenarios } = data
  const { direction } = props

  return (
    <RichDropdown
      direction={direction}
      options={transformScenariosToOptions(scenarios)}
      onChange={(e: any, { value }: any) => {
        console.log('ScenariosMenu::onChange', value)
        history.push(`/scenarios/${value}`)
      }}
    />
  )
}

export { ScenariosMenu }
