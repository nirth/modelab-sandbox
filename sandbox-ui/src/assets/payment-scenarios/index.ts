import { Scenarios } from '../../datamodel/core'

import { composeScenarios } from './utils'

import { lotsOfCoffees } from './lots-of-coffees'
import { stableSalary } from './stable-salary'
import { occasionalCoffee } from './occasional-coffee'
import { utilityBills } from './utility-bills'

export const scenarios: Scenarios = [
  stableSalary,
  composeScenarios(
    'Stable Salary and Utilities',
    'stable-salary-and-utilities',
    'Alice has a good job, and pays her bills!',
    [stableSalary, utilityBills]
  ),
  composeScenarios(
    'Stable Salary and Occasional Coffee',
    'stable-salary-and-occasional-coffee',
    'Alice has a good job, and sometimes buys a cup of coffee!',
    [stableSalary, occasionalCoffee]
  ),
  composeScenarios(
    'Coffee Addict with Stable Salary',
    'coffee-addict-with-stable-salary',
    'Alice has a good job, and even healthier coffee addiction!',
    [stableSalary, lotsOfCoffees]
  ),
]
