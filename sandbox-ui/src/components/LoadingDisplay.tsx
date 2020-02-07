import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

export const LoadingState = (props: any) => (
  <Dimmer active>
    <Loader />
  </Dimmer>
)
