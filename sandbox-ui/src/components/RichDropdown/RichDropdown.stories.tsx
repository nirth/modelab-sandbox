import React from 'react'
import { action } from '@storybook/addon-actions'
import { RichDropdown } from './RichDropdown'

export default {
  title: 'RichDropdown',
}

const standardOptions = [
  {
    key: 0,
    value: 'alice',
    title: 'Alice',
    description: 'Professional Traveller. Age 35',
  },
  {
    key: 1,
    value: 'bob',
    title: 'Bob',
    description: 'Hobbyist Banker. Age 20',
  },
  {
    key: 2,
    value: 'clare',
    title: 'Clare',
    description: 'Adventurous Mage. Age 99+',
  },
  {
    key: 3,
    value: 'daniel',
    title: 'Daniel',
    description: 'Flamboyant Adventurer. Age Unknown',
  },
]

export const standard = () => (
  <RichDropdown
    options={standardOptions}
    direction="left"
    onChange={action('Item Changed Action')}
  />
)

export const emoji = () => (
  <div onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </div>
)
