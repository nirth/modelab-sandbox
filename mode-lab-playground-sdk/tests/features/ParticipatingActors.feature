Feature: Creating Participating Actors
  Scenario: Create Protagonist – Alice with her bank and crypto accounts
    Given protagonist Alice:
      | Name  |
      | Alice |
    And her bank accounts and crypto wallets:
      | Name            | Asset Kind   | Account Number or Address | Currency Code |
      | Current Account | Cash         | 100001                    | GBP           |
      | Current Account | Cash         | 200001                    | EUR           |
      | Savings Account | Cash         | 100001                    | GBP           |
      | Savings Pot     | NativeCrypto | ABC001                    | BTC           |
    When we create our protagonist
    Then we expect to see our protagonist Alice with following accounts:
      | Name            | Asset Kind   | Payment Instrument | Balance | CCY Code | CCY           | CCY Symbol |
      | Current Account | Cash         | 100001             | 0       | GBP      | British Pound | £          |
      | Current Account | Cash         | 200001             | 0       | EUR      | Euro          | €         |
      | Savings Account | Cash         | 100001             | 0       | GBP      | British Pound | £          |
      | Savings Pot     | NativeCrypto | ABC001             | 0       | BTC      | Bitcoin       | ₿         |
