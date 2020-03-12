Feature: ScenarioPlayer
  Scenario: ScenarioPlayer should detect start and end dates
    Given following Txs:
      | Datetime   | Amount | Creditor Customer | Creditor Bank Account | Sender    | Receiver | Debitor Customer | Debitor Bank Account |
      | 2020-01-01 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-02-02 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-03-03 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-04-04 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-05-05 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-06-06 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-07-07 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-08-08 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-09-09 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-10-10 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-11-11 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-12-12 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2021-01-13 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
    When we create PaymentScenario
    Then we expect it to derive start and end dates as following:
      | Start Date | End Date   |
      | 2020-01-01 | 2021-01-13 |

  Scenario: ScenarioPlayer should invoke events when executed
    Given following Txs:
      | Datetime   | Amount | Creditor Customer | Creditor Bank Account | Sender    | Receiver | Debitor Customer | Debitor Bank Account |
      | 2020-01-01 | 500    | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-01-03 | 600    | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-01-03 | 100    | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
      | 2020-01-04 | 200    | Alice             | 100001                | BankyBank | Mode     | AcmeCorm         | 200001               |
    When we create PaymentScenario
    Then we expect following events to be triggered:
      | Event Type          | Datetime   |
      | DAY_START           | 2020-01-01 |
      | INCOMING_PAYMENT    | 2020-01-01 |
      | DAY_END             | 2020-01-01 |
      | DAY_START           | 2020-01-02 |
      | DAY_END             | 2020-01-02 |
      | DAY_START           | 2020-01-03 |
      | INCOMING_PAYMENT    | 2020-01-03 |
      | INCOMING_PAYMENT    | 2020-01-03 |
      | DAY_END             | 2020-01-03 |
      | DAY_START           | 2020-01-04 |
      | INCOMING_PAYMENT    | 2020-01-04 |
      | DAY_END             | 2020-01-04 |

  Scenario: ScenarioPlayer should invoke different Tx related events when executed
    Given following Salary Payments:
      | Datetime   | Amount | Creditor Customer | Creditor Bank Account | Sender    | Receiver | Debitor Customer | Debitor Bank Account |
      | 2020-01-01 | 3500   | Alice             | 100001                | BankyBank | Mode     | AcmeCorn         | 200001               |
      | 2020-01-09 | 200    | Alice             | 100001                | Mode      | Mode     | Bob              | 100002               |
    And following Direct Debits:
      | Datetime   | Amount | Creditor Customer | Creditor Bank Account | Sender    | Receiver  | Debitor Customer | Debitor Bank Account |
      | 2020-01-13 | 500    | AcmeEnergy        | 200001                | Mode      | BankyBank | Alice            | 100001               |
      | 2020-01-14 | 200    | AncillaryGas      | 200001                | Mode      | BankyBank | Alice            | 100001               |
    And following Spending:
      | Datetime   | Amount | Creditor Customer | Creditor Bank Account | Sender    | Receiver  | Debitor Customer | Debitor Bank Account |
      | 2020-01-02 | 3.21   | DonnaCoffee       | 200001                | Mode      | Mode      | Alice            | 100001               |
      | 2020-01-05 | 3.22   | DonnaCoffee       | 200001                | Mode      | Mode      | Alice            | 100001               |
      | 2020-01-06 | 3.23   | DonnaCoffee       | 200001                | Mode      | Mode      | Alice            | 100001               |
      | 2020-01-07 | 3.24   | DonnaCoffee       | 200001                | Mode      | Mode      | Alice            | 100001               |
      | 2020-01-08 | 3.25   | DonnaCoffee       | 200001                | Mode      | Mode      | Alice            | 100001               |
      | 2020-01-10 | 3.27   | DonnaCoffee       | 200001                | Mode      | Mode      | Alice            | 100001               |
      | 2020-01-11 | 3.28   | DonnaCoffee       | 200001                | Mode      | Mode      | Alice            | 100001               |
      | 2020-01-12 | 3.29   | DonnaCoffee       | 200001                | Mode      | Mode      | Alice            | 100001               |
    When we create PaymentScenario
    Then we expect it to derive start and end dates as following:
      | Start Date | End Date   |
      | 2020-01-01 | 2020-01-14 |
    And we expect following events to be triggered:
      | Event Type                   | Datetime   |
      | DAY_START                    | 2020-01-01 |
      | INCOMING_PAYMENT             | 2020-01-01 |
      | DAY_END                      | 2020-01-01 |
      | DAY_START                    | 2020-01-02 |
      | OUTGOING_PAYMENT             | 2020-01-02 |
      | DAY_END                      | 2020-01-02 |
      | DAY_START                    | 2020-01-03 |
      | DIRECT_DEBIT_ANNOUNCEMENT    | 2020-01-03 |
      | DAY_END                      | 2020-01-03 |
      | DAY_START                    | 2020-01-04 |
      | DIRECT_DEBIT_ANNOUNCEMENT    | 2020-01-04 |
      | DAY_END                      | 2020-01-04 |
      | DAY_START                    | 2020-01-05 |
      | OUTGOING_PAYMENT             | 2020-01-05 |
      | DAY_END                      | 2020-01-05 |
      | DAY_START                    | 2020-01-06 |
      | OUTGOING_PAYMENT             | 2020-01-06 |
      | DAY_END                      | 2020-01-06 |
      | DAY_START                    | 2020-01-07 |
      | OUTGOING_PAYMENT             | 2020-01-07 |
      | DAY_END                      | 2020-01-07 |
      | DAY_START                    | 2020-01-08 |
      | OUTGOING_PAYMENT             | 2020-01-08 |
      | DAY_END                      | 2020-01-08 |
      | DAY_START                    | 2020-01-09 |
      | INCOMING_PAYMENT             | 2020-01-09 |
      | DAY_END                      | 2020-01-09 |
      | DAY_START                    | 2020-01-10 |
      | OUTGOING_PAYMENT             | 2020-01-10 |
      | DAY_END                      | 2020-01-10 |
      | DAY_START                    | 2020-01-11 |
      | OUTGOING_PAYMENT             | 2020-01-11 |
      | DAY_END                      | 2020-01-11 |
      | DAY_START                    | 2020-01-12 |
      | OUTGOING_PAYMENT             | 2020-01-12 |
      | DAY_END                      | 2020-01-12 |
      | DAY_START                    | 2020-01-13 |
      | DIRECT_DEBIT_PAYMENT         | 2020-01-13 |
      | DAY_END                      | 2020-01-13 |
      | DAY_START                    | 2020-01-14 |
      | DIRECT_DEBIT_PAYMENT         | 2020-01-14 |
      | DAY_END                      | 2020-01-14 |


