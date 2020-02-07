import React, { Component, useReducer } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { parseOptions, searchByTitle } from './utils'

const richDropdownReducer = (state: any, action: any) => {
  const { type, payload: value } = action
  switch (type) {
    case 'VALUE_CHANGE':
      return { ...state, value }
    default:
      throw new Error(`Unsupported action type ${type}`)
  }
}

const initialState = { value: undefined }

const RichDropdown = (props: RichDropdownProps) => {
  const { options, direction, onChange } = props
  const [state, dispatch] = useReducer(richDropdownReducer, initialState)
  const { value } = state

  const parsedOptions = options.map(parseOptions)

  return (
    <Dropdown
      placeholder="Choose Scenario"
      button
      search={searchByTitle}
      options={parsedOptions}
      direction={direction}
      onChange={(e: any, { value }) => {
        dispatch({ type: 'VALUE_CHANGE', payload: value })
        onChange({}, { value })
      }}
      style={{ minWidth: '400px' }}
      value={value}
      selection
    />
  )
}

type RichDropdownProps = {
  dropDownComponent?: Component
  onChange?: any
  options: any[]
  direction: 'left' | 'right'
}

export { RichDropdown }
