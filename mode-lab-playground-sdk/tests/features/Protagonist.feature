Feature: Easy and developer friendly way to create Protagonist of the `PaymentScenario` with Payment Accounts
  Scenario: Create set of transactions to simulate monthly salary
    Given following salary payment details for transaction:
      | Amount | Creditor Customer | Creditor Bank Account | Sender    | Receiver | Debitor Customer | Debitor Bank Account |
      | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
    When converting it into monthy salary payment starting with following from and to dates:
      | From Date  | To Date    |
      | 2020-01-01 | 2020-12-01 |
      | 2020-06-28 | 2021-06-28 |
    Then we expect to see following salary payments for first case:
      | Datetime | Amount | Creditor Customer |