Feature: Easy and developer friendly way to create recurring txs for `PaymentScenarios`
  Scenario: Create set of transactions to simulate monthly salary
    Given following salary payment details for transaction:
      | Amount | Creditor Customer | Creditor Bank Account | Sender    | Receiver | Debitor Customer | Debitor Bank Account |
      | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
    When converting it into monthy salary payment starting with following from and to dates:
      | From Date  | To Date    |
      | 2020-01-01 | 2020-12-01 |
      | 2020-06-28 | 2021-06-28 |
    Then we expect to see following salary payments for first case:
      | Datetime   | Amount | Creditor Customer | Creditor Bank Account | Sender    | Receiver | Debitor Customer | Debitor Bank Account |
      | 2020-01-01 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-02-01 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-03-01 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-04-01 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-05-01 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-06-01 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-07-01 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-08-01 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-09-01 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-10-01 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-11-01 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-12-01 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
    And we expect to see these salary payments for second case:
      | Datetime   | Amount | Creditor Customer | Creditor Bank Account | Sender    | Receiver | Debitor Customer | Debitor Bank Account |
      | 2020-06-28 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-07-28 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-08-28 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-09-28 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-10-28 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-11-28 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-12-28 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2021-01-28 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2021-02-28 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2021-03-28 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2021-04-28 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2021-05-28 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
  Scenario: Create set of transactions to simulate daily coffee
    Given following details for transaction representing payment for coffee:
      | Amount | Creditor Customer | Creditor Bank Account | Sender | Receiver  | Debitor Customer | Debitor Bank Account |
      | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
    When converting it into daily payment starting with following from and to dates:
      | From Date  | To Date    |
      | 2020-11-01 | 2021-01-01 |
    Then we expect to see following payments for coffee:
      | Datetime   | Amount | Creditor Customer | Creditor Bank Account | Sender | Receiver  | Debitor Customer | Debitor Bank Account |
      | 2020-11-01 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-11-02 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-11-03 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-11-04 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-11-05 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-11-06 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-11-07 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-11-08 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-11-09 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-11-10 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-11-11 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-11-12 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-11-13 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-11-14 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-11-15 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-11-16 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-11-17 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-11-18 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-11-19 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-11-20 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-11-21 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-11-22 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-11-23 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-11-24 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-11-25 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-11-26 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-11-27 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-11-28 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-01 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-02 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-03 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-04 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-05 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-06 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-07 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-08 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-09 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-10 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-11 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-12 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-13 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-14 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-15 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-16 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-17 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-18 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-19 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-20 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-21 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-22 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-23 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-24 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-25 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-26 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-27 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2020-12-28 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-01 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-02 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-03 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-04 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-05 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-06 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-07 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-08 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-09 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-10 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-11 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-12 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-13 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-14 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-15 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-16 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-17 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-18 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-19 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-20 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-21 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-22 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-23 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-24 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-25 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-26 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-27 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |
      | 2021-01-28 | 2.80   | Carpe Diem Coffee | 200002                | Mode   | BankyBank | Alice            | 100001               |


