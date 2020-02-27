import { Scenarios } from '../../sbdk/datamodel'

import { composeScenarios } from './utils'

import { lotsOfCoffees } from './lots-of-coffees'
import { stableSalary } from './stable-salary'
import { occasionalCoffee } from './occasional-coffee'
import { utilityBills } from './utility-bills'
import { coupleOfLargeDds } from './couple-of-large-dds'

export const scenarios: Scenarios = [
  // coupleOfLargeDds,
  // stableSalary,
  composeScenarios(
    'Stable Salary and Utilities',
    'stable-salary-and-utilities',
    'Alice has a good job, and pays her bills!',
    [stableSalary, utilityBills, coupleOfLargeDds]
  ),
  // composeScenarios(
  //   'Stable Salary and Occasional Coffee',
  //   'stable-salary-and-occasional-coffee',
  //   'Alice has a good job, and sometimes buys a cup of coffee!',
  //   [stableSalary, occasionalCoffee]
  // ),
  // composeScenarios(
  //   'Coffee Addict with Stable Salary',
  //   'coffee-addict-with-stable-salary',
  //   'Alice has a good job, and even healthier coffee addiction!',
  //   [stableSalary, lotsOfCoffees]
  // ),
]
