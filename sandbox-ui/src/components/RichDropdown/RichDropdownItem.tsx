import React from 'react'
import { Header } from 'semantic-ui-react'

type RichDropdownItemProps = {
  title: string
  description: string
}

const RichDropdownItem = (props: RichDropdownItemProps) => {
  const { title, description } = props

  return <Header content={title} subheader={description} />
}

export { RichDropdownItem }
