import React, { Component, useReducer } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { parseOptions, searchByTitle } from './utils'

const createReducer = (onChange: any) => (state: any, action: any) => {
  const { type, payload: value } = action
  switch (type) {
    case 'VALUE_CHANGE':
      onChange({}, { value })
      return { ...state, value }
    default:
      throw new Error(`Unsupported action type ${type}`)
  }
}

const initialState = { value: undefined }

const RichDropdown = (props: RichDropdownProps) => {
  const { options, direction, onChange } = props
  const reducer = createReducer(onChange)
  const [state, dispatch] = useReducer(reducer, initialState)
  const { value } = state

  const parsedOptions = options.map(parseOptions)

  console.log('Value?', value)

  return (
    <Dropdown
      placeholder="Choose Scenario"
      button
      search={searchByTitle}
      options={parsedOptions}
      direction={direction}
      onChange={(e: any, { value }) =>
        dispatch({ type: 'VALUE_CHANGE', payload: value })
      }
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
