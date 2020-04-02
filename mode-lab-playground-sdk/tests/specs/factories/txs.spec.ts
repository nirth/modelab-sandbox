import { createDirectDebitAnnouncementAndPaymentTxs } from '../../../src/factories/txs'
import { Tx } from '../../../src/datamodel'

describe('DirectDebit factries should', () => {
	it('be able to create Announcement and Payment pair spread by 10 days', () => {
		const [
			march20thAnnouncement,
			march20thPayment,
		]: Tx[] = createDirectDebitAnnouncementAndPaymentTxs(
			'2020-03-20',
			'500',
			'AcmeEnergy',
			'200001',
			'BankyBank',
			'Mode',
			'Alice',
			'100001'
		)

		const [
			april1stAnnouncement,
			april1stPayment,
		]: Tx[] = createDirectDebitAnnouncementAndPaymentTxs(
			'2020-04-01',
			'500',
			'AcmeEnergy',
			'200001',
			'BankyBank',
			'Mode',
			'Alice',
			'100001'
		)

		expect(march20thAnnouncement.datetime).toBe('2020-03-10')
		expect(march20thPayment.datetime).toBe('2020-03-20')

		expect(april1stAnnouncement.datetime).toBe('2020-03-22')
		expect(april1stPayment.datetime).toBe('2020-04-01')
	})
})
