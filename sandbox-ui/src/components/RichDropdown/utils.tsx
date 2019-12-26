import React from 'react'
import { RichDropdownItem } from './RichDropdownItem'

export const parseOptions = (option: any) => ({
  key: option.key,
  value: option.value,
  content: (
    <RichDropdownItem title={option.title} description={option.description} />
  ),
})

const filterByProp = (regExp: RegExp, fieldName: string) => (
  option: any
): boolean => regExp.test(option[fieldName])

export const searchByTitle = (options: any, value: any): any => {
  const regExp = new RegExp(value, 'gi')
  return options.filter(filterByProp(regExp, 'title'))
}
