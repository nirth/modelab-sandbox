import React from 'react'
import { Segment, Header } from 'semantic-ui-react'

type RichDropdownItemProps = {
  title: string
  description: string
}

const RichDropdownItem = (props: RichDropdownItemProps) => {
  const { title, description } = props

  return (
    <Segment>
      <Header as="h4">{title}</Header>
      <p>{description}</p>
    </Segment>
  )
}

export { RichDropdownItem }
