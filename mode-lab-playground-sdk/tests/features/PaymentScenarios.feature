Feature: Creating PaymentScenarios
  Scenario: Create new PaymentScenairo
    When attempting to create PaymentScenarios with following information:
      | Title               | Protagonist |
      | Stable Salary       | Alice       |
      | Salary Payments     | Bob         |
      | Salary and Expenses | Clare       |
    Then we expect PaymentScenarios to be initialized with following informaiton:
      | Title               | Protagonist | Slug                      | Id                        |
      | Stable Salary       | Alice       | alice-stable-salary       | alice-stable-salary       |
      | Salary Payments     | Bob         | bob-salary-payments       | bob-salary-payments       |
      | Salary and Expenses | Clare       | clare-salary-and-expenses | clare-salary-and-expenses |



