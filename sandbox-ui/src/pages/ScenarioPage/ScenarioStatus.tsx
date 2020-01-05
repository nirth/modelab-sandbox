import React from 'react'
import { Segment, Icon, Button, Label, Header } from 'semantic-ui-react'

type ScenarioControlsProps = {
  balance: number
  onPlay: () => void
  onPause: () => void
  onReset: () => void
  onNext: () => void
}

export const ScenarioStatus = (props: ScenarioControlsProps) => {
  const { balance, onReset, onNext } = props
  return (
    <Segment>
      <Header
        as="h2"
        content="Alice’s Bank Account"
        subheader={`Balance is £${balance.toFixed(2)}`}
      />
      <Button icon labelPosition="left">
        <Icon name="pause" />
        Pause
      </Button>
      <Button icon labelPosition="left" onClick={onReset}>
        <Icon name="repeat" />
        Reset
      </Button>
      <Button icon labelPosition="right" onClick={onNext}>
        Next
        <Icon name="angle right" />
      </Button>
    </Segment>
  )
}
