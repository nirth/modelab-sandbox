export enum PartyIdentifier {
  AlienRegistrationNumber = 'ARNU',
  PassportNumber = 'CCPT',
  CustomerIdentificationNumber = 'CUST',
  DriverLicenceNumber = 'DRLC',
  EmployerNumber = 'EMPL',
  NationalIdentityNumber = 'NIDN',
  SocialSecurityNumber = 'SOSE',
  TaxIdentificationNumber = 'TXID',
  ErrorCode = 'T55',
}

export enum BankOperationCodes {
  Cheque = 'CHQB',
  CreditTransfer = 'CREDIT',
  TestCreditTransfer = 'CRTST',
  SwiftPay = 'SPAY',
}

export enum DetailsOfCharges {
  Beneficiary = 'BEN',
  OurCustomer = 'OUR',
  SharedCharges = 'SHA',
}
