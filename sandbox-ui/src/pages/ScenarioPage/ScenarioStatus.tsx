import React from 'react'
import { Segment, Icon, Button, Header } from 'semantic-ui-react'

type ScenarioControlsProps = {
  scenarioFinished: boolean
  onPlay: () => void
  onPause: () => void
  onReset: () => void
  onNext: () => void
}

export const ScenarioStatus = (props: ScenarioControlsProps) => {
  const { onReset, onNext, scenarioFinished } = props

  return (
    <Segment>
      <Header as="h2" content="Alice’s World" />
      <Button icon labelPosition="left" onClick={onReset}>
        <Icon name="repeat" />
        Reset
      </Button>
      <Button
        icon
        labelPosition="right"
        onClick={onNext}
        disabled={scenarioFinished}
      >
        Next
        <Icon name="angle right" />
      </Button>
    </Segment>
  )
}
