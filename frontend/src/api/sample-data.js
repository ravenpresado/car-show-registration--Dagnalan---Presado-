const FEE_BY_TYPE = {
  Exhibitor: 1500.0,
  Competitor: 2500.0,
  VIP: 5000.0,
}

function computePaymentStatus(amountPaid, registrationFee) {
  if (amountPaid <= 0) return 'Unpaid'
  if (amountPaid < registrationFee) return 'Partial'
  return 'Paid'
}

const rawSeedRecords = [
  {
    id: '8f1b2c3d-4e5f-4a1b-9c01-000000000001',
    registrationNumber: 'CS27-0001',
    registrationDate: '2026-11-01T08:00:00Z',
    participantName: 'Marco Villanueva',
    contactNumber: '09171234501',
    email: 'marco.villanueva@example.com',
    address: '12 Rizal St., Sorsogon City',
    carMakeModel: 'Toyota Supra MK4',
    plateNumber: 'SOR 1001',
    registrationType: 'VIP',
    status: 'Confirmed',
    amountPaid: 5000.0,
  },
  {
    id: '8f1b2c3d-4e5f-4a1b-9c01-000000000002',
    registrationNumber: 'CS27-0002',
    registrationDate: '2026-11-01T14:00:00Z',
    participantName: 'Clarisse Mendoza',
    contactNumber: '09181234502',
    email: 'clarisse.mendoza@example.com',
    address: '45 Magsaysay Ave., Naga City',
    carMakeModel: 'Honda Civic Type R FK8',
    plateNumber: 'CAM 1002',
    registrationType: 'Competitor',
    status: 'CheckedIn',
    amountPaid: 2500.0,
  },
  {
    id: '8f1b2c3d-4e5f-4a1b-9c01-000000000003',
    registrationNumber: 'CS27-0003',
    registrationDate: '2026-11-01T20:00:00Z',
    participantName: 'Rafael Bautista',
    contactNumber: '09191234503',
    email: 'rafael.bautista@example.com',
    address: '88 Burgos St., Legazpi City',
    carMakeModel: 'Nissan Skyline GT-R R34',
    plateNumber: 'ALB 1003',
    registrationType: 'VIP',
    status: 'CheckedIn',
    amountPaid: 5000.0,
  },
  {
    id: '8f1b2c3d-4e5f-4a1b-9c01-000000000004',
    registrationNumber: 'CS27-0004',
    registrationDate: '2026-11-02T02:00:00Z',
    participantName: 'Katrina Santos',
    contactNumber: '09201234504',
    email: 'katrina.santos@example.com',
    address: '19 Quezon Blvd., Sorsogon City',
    carMakeModel: 'Mazda RX-7 FD3S',
    plateNumber: 'SOR 1004',
    registrationType: 'Exhibitor',
    status: 'Confirmed',
    amountPaid: 1500.0,
  },
  {
    id: '8f1b2c3d-4e5f-4a1b-9c01-000000000005',
    registrationNumber: 'CS27-0005',
    registrationDate: '2026-11-02T08:00:00Z',
    participantName: 'Miguel Fernandez',
    contactNumber: '09211234505',
    email: 'miguel.fernandez@example.com',
    address: '73 Mabini St., Iriga City',
    carMakeModel: 'Subaru WRX STI',
    plateNumber: 'CAM 1005',
    registrationType: 'Competitor',
    status: 'Pending',
    amountPaid: 1000.0,
  },
  {
    id: '8f1b2c3d-4e5f-4a1b-9c01-000000000006',
    registrationNumber: 'CS27-0006',
    registrationDate: '2026-11-02T14:00:00Z',
    participantName: 'Andrea Navarro',
    contactNumber: '09221234506',
    email: 'andrea.navarro@example.com',
    address: '204 Bonifacio St., Tabaco City',
    carMakeModel: 'Mitsubishi Lancer Evo IX',
    plateNumber: 'ALB 1006',
    registrationType: 'Competitor',
    status: 'Confirmed',
    amountPaid: 2500.0,
  },
  {
    id: '8f1b2c3d-4e5f-4a1b-9c01-000000000007',
    registrationNumber: 'CS27-0007',
    registrationDate: '2026-11-02T20:00:00Z',
    participantName: 'Paolo Ramos',
    contactNumber: '09231234507',
    email: 'paolo.ramos@example.com',
    address: '56 Penafrancia Ave., Naga City',
    carMakeModel: 'Toyota GR86',
    plateNumber: 'CAM 1007',
    registrationType: 'Exhibitor',
    status: 'CheckedIn',
    amountPaid: 1500.0,
  },
  {
    id: '8f1b2c3d-4e5f-4a1b-9c01-000000000008',
    registrationNumber: 'CS27-0008',
    registrationDate: '2026-11-03T02:00:00Z',
    participantName: 'Bianca Aquino',
    contactNumber: '09241234508',
    email: 'bianca.aquino@example.com',
    address: '91 Luna St., Sorsogon City',
    carMakeModel: 'Nissan 350Z',
    plateNumber: 'SOR 1008',
    registrationType: 'VIP',
    status: 'Pending',
    amountPaid: 2500.0,
  },
  {
    id: '8f1b2c3d-4e5f-4a1b-9c01-000000000009',
    registrationNumber: 'CS27-0009',
    registrationDate: '2026-11-03T08:00:00Z',
    participantName: 'Lorenzo Castillo',
    contactNumber: '09251234509',
    email: 'lorenzo.castillo@example.com',
    address: '34 Del Rosario, Daraga, Albay',
    carMakeModel: 'Honda S2000',
    plateNumber: 'ALB 1009',
    registrationType: 'Competitor',
    status: 'Cancelled',
    amountPaid: 0.0,
  },
  {
    id: '8f1b2c3d-4e5f-4a1b-9c01-000000000010',
    registrationNumber: 'CS27-0010',
    registrationDate: '2026-11-03T14:00:00Z',
    participantName: 'Patricia Torres',
    contactNumber: '09261234510',
    email: 'patricia.torres@example.com',
    address: '18 Zamora St., Gubat, Sorsogon',
    carMakeModel: 'Mazda MX-5 Miata ND',
    plateNumber: 'SOR 1010',
    registrationType: 'Exhibitor',
    status: 'Confirmed',
    amountPaid: 750.0,
  },
  {
    id: '8f1b2c3d-4e5f-4a1b-9c01-000000000011',
    registrationNumber: 'CS27-0011',
    registrationDate: '2026-11-03T20:00:00Z',
    participantName: 'Gabriel Mercado',
    contactNumber: '09271234511',
    email: 'gabriel.mercado@example.com',
    address: '62 Roxas Ave., Legazpi City',
    carMakeModel: 'Ford Mustang GT',
    plateNumber: 'ALB 1011',
    registrationType: 'VIP',
    status: 'Confirmed',
    amountPaid: 5000.0,
  },
  {
    id: '8f1b2c3d-4e5f-4a1b-9c01-000000000012',
    registrationNumber: 'CS27-0012',
    registrationDate: '2026-11-04T02:00:00Z',
    participantName: 'Stephanie Reyes',
    contactNumber: '09281234512',
    email: 'stephanie.reyes@example.com',
    address: '110 Osmena St., Daet, CamNorte',
    carMakeModel: 'Honda Civic EG6',
    plateNumber: 'CNM 1012',
    registrationType: 'Exhibitor',
    status: 'Pending',
    amountPaid: 0.0,
  },
  {
    id: '8f1b2c3d-4e5f-4a1b-9c01-000000000013',
    registrationNumber: 'CS27-0013',
    registrationDate: '2026-11-04T08:00:00Z',
    participantName: 'Dominic Salazar',
    contactNumber: '09291234513',
    email: 'dominic.salazar@example.com',
    address: '77 Taft St., Bulan, Sorsogon',
    carMakeModel: 'Toyota AE86 Trueno',
    plateNumber: 'SOR 1013',
    registrationType: 'Competitor',
    status: 'CheckedIn',
    amountPaid: 2500.0,
  },
  {
    id: '8f1b2c3d-4e5f-4a1b-9c01-000000000014',
    registrationNumber: 'CS27-0014',
    registrationDate: '2026-11-04T14:00:00Z',
    participantName: 'Nicole Soriano',
    contactNumber: '09391234514',
    email: 'nicole.soriano@example.com',
    address: '144 Panganiban Dr., Naga City',
    carMakeModel: 'BMW M3 E46',
    plateNumber: 'CAM 1014',
    registrationType: 'VIP',
    status: 'Confirmed',
    amountPaid: 3000.0,
  },
  {
    id: '8f1b2c3d-4e5f-4a1b-9c01-000000000015',
    registrationNumber: 'CS27-0015',
    registrationDate: '2026-11-04T20:00:00Z',
    participantName: 'Christian Pineda',
    contactNumber: '09451234515',
    email: 'christian.pineda@example.com',
    address: '28 San Juan, Irosin, Sorsogon',
    carMakeModel: 'Nissan Silvia S15',
    plateNumber: 'SOR 1015',
    registrationType: 'Competitor',
    status: 'Confirmed',
    amountPaid: 1500.0,
  },
  {
    id: '8f1b2c3d-4e5f-4a1b-9c01-000000000016',
    registrationNumber: 'CS27-0016',
    registrationDate: '2026-11-05T02:00:00Z',
    participantName: 'Vanessa Lim',
    contactNumber: '09561234516',
    email: 'vanessa.lim@example.com',
    address: '99 Albay District, Legazpi City',
    carMakeModel: 'Porsche 911 Carrera',
    plateNumber: 'ALB 1016',
    registrationType: 'VIP',
    status: 'CheckedIn',
    amountPaid: 5000.0,
  },
  {
    id: '8f1b2c3d-4e5f-4a1b-9c01-000000000017',
    registrationNumber: 'CS27-0017',
    registrationDate: '2026-11-05T08:00:00Z',
    participantName: 'Jericho Ocampo',
    contactNumber: '09661234517',
    email: 'jericho.ocampo@example.com',
    address: '15 Aguinaldo St., Ligao City',
    carMakeModel: 'Toyota Corolla Levin',
    plateNumber: 'ALB 1017',
    registrationType: 'Exhibitor',
    status: 'Cancelled',
    amountPaid: 500.0,
  },
  {
    id: '8f1b2c3d-4e5f-4a1b-9c01-000000000018',
    registrationNumber: 'CS27-0018',
    registrationDate: '2026-11-05T14:00:00Z',
    participantName: 'Camille De Leon',
    contactNumber: '09771234518',
    email: 'camille.deleon@example.com',
    address: '53 Rizal St., Masbate City',
    carMakeModel: 'Suzuki Swift Sport',
    plateNumber: 'MAS 1018',
    registrationType: 'Exhibitor',
    status: 'Confirmed',
    amountPaid: 1500.0,
  },
  {
    id: '8f1b2c3d-4e5f-4a1b-9c01-000000000019',
    registrationNumber: 'CS27-0019',
    registrationDate: '2026-11-05T20:00:00Z',
    participantName: 'Kenneth Dizon',
    contactNumber: '09951234519',
    email: 'kenneth.dizon@example.com',
    address: '401 Diversion Rd., Naga City',
    carMakeModel: 'Mitsubishi Eclipse GSX',
    plateNumber: 'CAM 1019',
    registrationType: 'Competitor',
    status: 'Pending',
    amountPaid: 0.0,
  },
  {
    id: '8f1b2c3d-4e5f-4a1b-9c01-000000000020',
    registrationNumber: 'CS27-0020',
    registrationDate: '2026-11-06T02:00:00Z',
    participantName: 'Danica Flores',
    contactNumber: '09981234520',
    email: 'danica.flores@example.com',
    address: '82 Quirino Hwy., Sorsogon City',
    carMakeModel: 'Volkswagen Golf GTI',
    plateNumber: 'SOR 1020',
    registrationType: 'Exhibitor',
    status: 'CheckedIn',
    amountPaid: 1500.0,
  },
  {
    id: '8f1b2c3d-4e5f-4a1b-9c01-000000000021',
    registrationNumber: 'CS27-0021',
    registrationDate: '2026-11-06T08:00:00Z',
    participantName: 'Adrian Evangelista',
    contactNumber: '09171234521',
    email: 'adrian.evangelista@example.com',
    address: '210 Washington Dr., Legazpi City',
    carMakeModel: 'Chevrolet Camaro SS',
    plateNumber: 'ALB 1021',
    registrationType: 'VIP',
    status: 'Cancelled',
    amountPaid: 2000.0,
  },
  {
    id: '8f1b2c3d-4e5f-4a1b-9c01-000000000022',
    registrationNumber: 'CS27-0022',
    registrationDate: '2026-11-06T14:00:00Z',
    participantName: 'Samantha Cruz',
    contactNumber: '09181234522',
    email: 'samantha.cruz@example.com',
    address: '67 Maharlika Hwy., Pilar, Sorsogon',
    carMakeModel: 'Honda Integra Type R',
    plateNumber: 'SOR 1022',
    registrationType: 'Competitor',
    status: 'Confirmed',
    amountPaid: 2500.0,
  },
  {
    id: '8f1b2c3d-4e5f-4a1b-9c01-000000000023',
    registrationNumber: 'CS27-0023',
    registrationDate: '2026-11-06T20:00:00Z',
    participantName: 'Joshua Manalo',
    contactNumber: '09191234523',
    email: 'joshua.manalo@example.com',
    address: '132 Barlin St., Naga City',
    carMakeModel: 'Toyota MR2 SW20',
    plateNumber: 'CAM 1023',
    registrationType: 'Exhibitor',
    status: 'Pending',
    amountPaid: 500.0,
  },
  {
    id: '8f1b2c3d-4e5f-4a1b-9c01-000000000024',
    registrationNumber: 'CS27-0024',
    registrationDate: '2026-11-07T02:00:00Z',
    participantName: 'Trisha Pangilinan',
    contactNumber: '09201234524',
    email: 'trisha.pangilinan@example.com',
    address: '505 Rizal St., Daraga, Albay',
    carMakeModel: 'Nissan 370Z Nismo',
    plateNumber: 'ALB 1024',
    registrationType: 'Competitor',
    status: 'Confirmed',
    amountPaid: 2000.0,
  },
  {
    id: '8f1b2c3d-4e5f-4a1b-9c01-000000000025',
    registrationNumber: 'CS27-0025',
    registrationDate: '2026-11-07T08:00:00Z',
    participantName: 'Vincent Rosario',
    contactNumber: '09211234525',
    email: 'vincent.rosario@example.com',
    address: '29 Piot, Sorsogon City',
    carMakeModel: 'Lexus LC 500',
    plateNumber: 'SOR 1025',
    registrationType: 'Exhibitor',
    status: 'Pending',
    amountPaid: 0.0,
  },
]

export const sampleRegistrations = rawSeedRecords.map((item) => {
  const registrationFee = FEE_BY_TYPE[item.registrationType]
  return {
    ...item,
    registrationFee,
    paymentStatus: computePaymentStatus(item.amountPaid, registrationFee),
  }
})

/**
 * Browser-side equivalent of GET /api/registrations for offline/parallel UI work.
 */
export async function getRegistrations({
  participantName = '',
  type = '',
  status = '',
  page = 1,
  pageSize = 10,
} = {}) {
  const search = participantName.trim().toLowerCase()

  const filtered = sampleRegistrations
    .filter((item) => {
      const matchesName =
        !search || item.participantName.toLowerCase().includes(search)
      const matchesType = !type || item.registrationType === type
      const matchesStatus = !status || item.status === status
      return matchesName && matchesType && matchesStatus
    })
    .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))

  const totalCount = filtered.length
  const totalPages = totalCount === 0 ? 0 : Math.ceil(totalCount / pageSize)
  const start = (page - 1) * pageSize
  const items = filtered.slice(start, start + pageSize)

  return {
    items,
    page,
    pageSize,
    totalCount,
    totalPages,
  }
}

/**
 * Browser-side equivalent of GET /api/registrations/summary.
 * Cancelled registrations are excluded from financial totals.
 */
export async function getSummary() {
  const totalRegistrations = sampleRegistrations.length
  const confirmed = sampleRegistrations.filter((r) => r.status === 'Confirmed').length
  const checkedIn = sampleRegistrations.filter((r) => r.status === 'CheckedIn').length
  const pending = sampleRegistrations.filter((r) => r.status === 'Pending').length
  const cancelled = sampleRegistrations.filter((r) => r.status === 'Cancelled').length

  const active = sampleRegistrations.filter((r) => r.status !== 'Cancelled')
  const totalFees = active.reduce((sum, r) => sum + r.registrationFee, 0)
  const totalPayments = active.reduce((sum, r) => sum + r.amountPaid, 0)
  const uncollectedPayments = totalFees - totalPayments

  return {
    totalRegistrations,
    confirmed,
    checkedIn,
    pending,
    cancelled,
    totalFees,
    totalPayments,
    uncollectedPayments,
  }
}
