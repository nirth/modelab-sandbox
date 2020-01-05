import React from 'react'
import { Segment, Icon, Button } from 'semantic-ui-react'

type ScenarioControlsProps = {
  onPlay: () => void
  onPause: () => void
  onReset: () => void
  onNext: () => void
}

export const ScenarioControls = (props: ScenarioControlsProps) => {
  return (
    <Segment>
      <Button icon labelPosition="left">
        <Icon name="pause" />
        Pause
      </Button>
      <Button icon labelPosition="left" onClick={props.onReset}>
        <Icon name="repeat" />
        Reset
      </Button>
      <Button icon labelPosition="right" onClick={props.onNext}>
        Next
        <Icon name="angle right" />
      </Button>
    </Segment>
  )
}
