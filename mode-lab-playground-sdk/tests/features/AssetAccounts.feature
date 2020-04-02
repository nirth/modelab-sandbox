Feature: Creating Asset Accounts
  Scenario: Create Cash and Native Crypto accounts
    Given following details about payment accounts that we want to create:
      | Name            | Asset Kind   | Account Number or Address | Currency Code |
      | Current Account | Cash         | 100001                    | GBP           |
      | Current Account | Cash         | 200001                    | EUR           |
      | Savings Account | Cash         | 100001                    | GBP           |
      | Savings Pot     | NativeCrypto | ABC001                    | BTC           |
    When we attempt to create asset accounts
    Then we expect to see following model created:
      | Name            | Asset Kind   | Payment Instrument | Balance | CCY Code | CCY           | CCY Symbol |
      | Current Account | Cash         | 100001             | 0       | GBP      | British Pound | £          |
      | Current Account | Cash         | 200001             | 0       | EUR      | Euro          | €         |
      | Savings Account | Cash         | 100001             | 0       | GBP      | British Pound | £          |
      | Savings Pot     | NativeCrypto | ABC001             | 0       | BTC      | Bitcoin       | ₿         |
