import React from 'react'
import { Action, ActionType } from '../../datamodel/marketplace'
import { Segment, Label, Header } from 'semantic-ui-react'

type OutcomeProps = {
  outcomes: Action[]
}

const randomEnding = () => {
  const endings = [
    'Finita la Commedia',
    'Thanks For All the Fish',
    'Our Princess is in Another Castle',
    'That’s All Folks',
  ]

  const randomIndex = Math.floor(Math.random() * endings.length)

  return endings[randomIndex]
}

export const Outcomes = (props: OutcomeProps) => {
  const { outcomes } = props

  return (
    <>
      <Header as="h2" content="Outcomes" />
      {outcomes.map((action: Action, index: number) => {
        if (action.type === ActionType.Notification) {
          return (
            <Segment key={index}>
              <Label
                color="blue"
                attached="top right"
                content="Notification"
                icon="bullhorn"
              />
              <Header
                content={action.payload.heading}
                subheader={action.payload.body}
              />
            </Segment>
          )
        } else if (action.type === ActionType.Declined) {
          return (
            <Segment key={index}>
              <Label
                color="red"
                attached="top right"
                content="Declined"
                icon="frown outline"
              />
              <Header
                content={action.payload.heading}
                subheader={action.payload.body}
              />
            </Segment>
          )
        } else if (action.type === ActionType.ScenarioFinished) {
          return (
            <Segment key={index}>
              <Label
                color="purple"
                attached="top right"
                content="Scenario Finished"
                icon="frown outline"
              />
              <Header content={randomEnding()} />
            </Segment>
          )
        }

        return 'Unknown Outcome'
      })}
    </>
  )
}
