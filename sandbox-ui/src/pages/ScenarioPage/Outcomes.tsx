import React from 'react'
import { Segment, Label, Header } from 'semantic-ui-react'
import { Account, Outcome, OutcomeKind } from '../../sbdk/datamodel'
import { safeStringify } from '../../utils'

type OutcomeProps = {
  accounts: Account[]
  outcomes: Outcome[]
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
  const { outcomes, accounts } = props

  return (
    <>
      <Header as="h2" content="Accounts" />
      {accounts.map((account: Account) => (
        <Header
          key={`${account.ccy}+${account.kind}`}
          content={account.name}
          subheader={`${account.ccySymbol}${account.balance}`}
        />
      ))}
      <Header as="h2" content="Outcomes" />
      {outcomes.reverse().map((outcome: Outcome, index: number) => {
        switch (outcome.kind) {
          case OutcomeKind.Notification:
            return (
              <Segment key={index}>
                <Label
                  color="blue"
                  attached="top right"
                  content="Notification"
                  icon="bullhorn"
                />
                <Header content={outcome.heading} subheader={outcome.body} />
              </Segment>
            )
          case OutcomeKind.Declined:
            return (
              <Segment key={index}>
                <Label
                  color="red"
                  attached="top right"
                  content="Declined"
                  icon="frown outline"
                />
                <Header content={outcome.heading} subheader={outcome.body} />
              </Segment>
            )
          case OutcomeKind.ScenarioFinished:
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
          default:
            return (
              <Segment key={index}>
                <Label
                  color="purple"
                  attached="top right"
                  content="Unknown Outcome"
                  icon="frown outline"
                />
                <Header content={safeStringify(outcome)} />
              </Segment>
            )
        }
      })}
    </>
  )
}
