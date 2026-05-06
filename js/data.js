/* ============================================
   BambooConnect India — Data Layer
   Pre-seeded bamboo provider database
   ============================================ */

const BAMBOO_SPECIES = [
  {
    id: 'sp-001',
    name: 'Bambusa balcooa',
    commonName: 'Bhaluka Bamboo',
    emoji: '🎍',
    image: 'assets/images/bambusa-balcooa.png',
    description: 'Known for exceptional tensile strength and durability. One of the most commercially valuable species in India.',
    uses: ['Construction', 'Furniture', 'Industrial', 'Scaffolding'],
    regions: ['Assam', 'West Bengal', 'Tripura', 'Meghalaya', 'Bihar'],
    growthRate: 'Fast — 15-20m in 3-4 months',
    harvestCycle: '3-4 years',
    maxHeight: '15-25m',
    culmsPerClump: '25-50'
  },
  {
    id: 'sp-002',
    name: 'Bambusa tulda',
    commonName: 'Indian Timber Bamboo',
    emoji: '🌿',
    image: 'assets/images/bambusa-tulda.png',
    description: 'Straight, flexible culms highly preferred by the paper and pulp industry. Widely cultivated across Northeast India.',
    uses: ['Paper & Pulp', 'Handicrafts', 'Housing', 'Agricultural Tools'],
    regions: ['Assam', 'Nagaland', 'Meghalaya', 'West Bengal', 'Manipur'],
    growthRate: 'Fast — 12-18m in 4 months',
    harvestCycle: '3 years',
    maxHeight: '12-22m',
    culmsPerClump: '20-40'
  },
  {
    id: 'sp-003',
    name: 'Dendrocalamus strictus',
    commonName: 'Male Bamboo / Solid Bamboo',
    emoji: '🪵',
    image: 'assets/images/dendrocalamus-strictus.png',
    description: 'Extremely drought-resistant and hardy. The most widely distributed bamboo species in India, used extensively in dry regions.',
    uses: ['Construction', 'Scaffolding', 'Agricultural Tools', 'Paper'],
    regions: ['Madhya Pradesh', 'Maharashtra', 'Rajasthan', 'Karnataka', 'Andhra Pradesh', 'Chhattisgarh'],
    growthRate: 'Moderate — 8-16m in 5-6 months',
    harvestCycle: '4-5 years',
    maxHeight: '8-18m',
    culmsPerClump: '15-35'
  },
  {
    id: 'sp-004',
    name: 'Dendrocalamus asper',
    commonName: 'Giant Bamboo / Sweet Bamboo',
    emoji: '🎋',
    image: 'assets/images/dendrocalamus-asper.png',
    description: 'Highly valued for its large culms and edible shoots. Popular in tropical regions for food and construction.',
    uses: ['Edible Shoots', 'Construction', 'Furniture', 'Charcoal'],
    regions: ['Kerala', 'Karnataka', 'Tamil Nadu', 'Andaman & Nicobar'],
    growthRate: 'Very Fast — 20-30m in 3 months',
    harvestCycle: '3-4 years',
    maxHeight: '20-30m',
    culmsPerClump: '20-40'
  },
  {
    id: 'sp-005',
    name: 'Bambusa bambos',
    commonName: 'Giant Thorny Bamboo',
    emoji: '🌾',
    image: 'assets/images/bambusa-bambos.png',
    description: 'A fast-growing thorny species widely distributed across peninsular India. Used in construction, reforestation, and biomass.',
    uses: ['Construction', 'Reforestation', 'Biomass', 'Fencing'],
    regions: ['Kerala', 'Tamil Nadu', 'Karnataka', 'Andhra Pradesh', 'Maharashtra'],
    growthRate: 'Fast — 15-25m in 4 months',
    harvestCycle: '3-4 years',
    maxHeight: '15-30m',
    culmsPerClump: '20-60'
  },
  {
    id: 'sp-006',
    name: 'Melocanna baccifera',
    commonName: 'Muli Bamboo',
    emoji: '🍃',
    image: 'assets/images/melocanna-baccifera.png',
    description: 'Dominant species in the Northeast, significant for paper industry. Known for its unique fleshy fruit.',
    uses: ['Paper & Pulp', 'Construction', 'Mat Weaving', 'Housing'],
    regions: ['Mizoram', 'Tripura', 'Manipur', 'Assam', 'Meghalaya'],
    growthRate: 'Fast — 10-20m in 3-4 months',
    harvestCycle: '2-3 years',
    maxHeight: '10-25m',
    culmsPerClump: '30-60'
  }
];

const USE_CATEGORIES = [
  'Construction', 'Furniture', 'Handicrafts', 'Paper & Pulp',
  'Edible Shoots', 'Scaffolding', 'Agricultural Tools', 'Industrial',
  'Biomass', 'Charcoal', 'Reforestation', 'Textiles', 'Flooring',
  'Housing', 'Fencing', 'Mat Weaving'
];

const INDIAN_STATES = {
  'Andhra Pradesh': ['Visakhapatnam', 'East Godavari', 'West Godavari', 'Krishna', 'Guntur', 'Prakasam', 'Srikakulam', 'Chittoor'],
  'Arunachal Pradesh': ['Papum Pare', 'East Siang', 'West Siang', 'Changlang', 'Lower Subansiri', 'Tawang'],
  'Assam': ['Kamrup', 'Nagaon', 'Cachar', 'Dibrugarh', 'Jorhat', 'Sonitpur', 'Tinsukia', 'Barpeta', 'Goalpara'],
  'Bihar': ['Patna', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga', 'Purnia', 'Gaya', 'Munger'],
  'Chhattisgarh': ['Raipur', 'Bilaspur', 'Bastar', 'Korba', 'Durg', 'Jashpur', 'Sarguja'],
  'Goa': ['North Goa', 'South Goa'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Junagadh', 'The Dangs', 'Narmada'],
  'Haryana': ['Karnal', 'Ambala', 'Hisar', 'Rohtak', 'Gurgaon', 'Panchkula'],
  'Himachal Pradesh': ['Shimla', 'Kangra', 'Mandi', 'Solan', 'Chamba', 'Sirmaur'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Hazaribagh', 'Gumla', 'West Singhbhum'],
  'Karnataka': ['Bangalore', 'Mysore', 'Shimoga', 'Uttara Kannada', 'Dakshina Kannada', 'Kodagu', 'Chikmagalur', 'Hassan'],
  'Kerala': ['Thiruvananthapuram', 'Ernakulam', 'Thrissur', 'Palakkad', 'Wayanad', 'Idukki', 'Kozhikode', 'Kannur'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Hoshangabad', 'Mandla', 'Balaghat', 'Betul', 'Chhindwara', 'Seoni'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Kolhapur', 'Ratnagiri', 'Sindhudurg', 'Gadchiroli', 'Chandrapur'],
  'Manipur': ['Imphal East', 'Imphal West', 'Churachandpur', 'Bishnupur', 'Thoubal', 'Tamenglong'],
  'Meghalaya': ['East Khasi Hills', 'West Khasi Hills', 'Jaintia Hills', 'East Garo Hills', 'West Garo Hills', 'Ri Bhoi'],
  'Mizoram': ['Aizawl', 'Lunglei', 'Champhai', 'Serchhip', 'Kolasib', 'Mamit'],
  'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang', 'Mon', 'Wokha'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Mayurbhanj', 'Keonjhar', 'Koraput', 'Ganjam', 'Sambalpur'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Mohali', 'Bathinda'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Banswara', 'Dungarpur', 'Sirohi', 'Alwar'],
  'Sikkim': ['East Sikkim', 'South Sikkim', 'West Sikkim', 'North Sikkim'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Nilgiris', 'Tirunelveli', 'Dindigul', 'Salem', 'Erode'],
  'Telangana': ['Hyderabad', 'Warangal', 'Karimnagar', 'Adilabad', 'Khammam', 'Nizamabad'],
  'Tripura': ['West Tripura', 'South Tripura', 'North Tripura', 'Dhalai', 'Gomati'],
  'Uttar Pradesh': ['Lucknow', 'Varanasi', 'Gorakhpur', 'Allahabad', 'Mirzapur', 'Sonbhadra'],
  'Uttarakhand': ['Dehradun', 'Nainital', 'Haridwar', 'Pauri Garhwal', 'Almora', 'Champawat'],
  'West Bengal': ['Kolkata', 'Darjeeling', 'Jalpaiguri', 'Cooch Behar', 'South 24 Parganas', 'Midnapore', 'Bankura', 'Purulia']
};

// Pre-seeded provider database
const SEED_PROVIDERS = [
  // Northeast India — Bamboo heartland
  { id: 'BCP-001', name: 'Rajesh Kumar Sharma', phone: '+91 98765 43210', email: 'rajesh.sharma@email.com', state: 'Assam', district: 'Kamrup', address: 'Village Bamunigaon, Near NH-37, Kamrup Metro', pincode: '781001', bambooTypes: ['Bambusa balcooa', 'Melocanna baccifera'], capacityTonnes: 80, landAreaAcres: 35, experienceYears: 15, useCategories: ['Construction', 'Handicrafts'], verified: true, registeredDate: '2024-08-12' },
  { id: 'BCP-002', name: 'Dipak Bora', phone: '+91 97654 32109', email: 'dipak.bora@email.com', state: 'Assam', district: 'Nagaon', address: 'Kaliabor Road, Nagaon', pincode: '782001', bambooTypes: ['Bambusa tulda', 'Bambusa balcooa'], capacityTonnes: 120, landAreaAcres: 50, experienceYears: 22, useCategories: ['Paper & Pulp', 'Construction'], verified: true, registeredDate: '2024-06-05' },
  { id: 'BCP-003', name: 'Lakshmi Nath Gogoi', phone: '+91 96543 21098', email: 'lakshmi.gogoi@email.com', state: 'Assam', district: 'Jorhat', address: 'Titabor, Jorhat District', pincode: '785630', bambooTypes: ['Bambusa tulda', 'Melocanna baccifera'], capacityTonnes: 55, landAreaAcres: 20, experienceYears: 10, useCategories: ['Handicrafts', 'Housing'], verified: true, registeredDate: '2024-09-18' },
  { id: 'BCP-004', name: 'Mohan Devi Das', phone: '+91 95432 10987', email: 'mohan.das@email.com', state: 'Assam', district: 'Dibrugarh', address: 'Naharkatia, Dibrugarh', pincode: '786610', bambooTypes: ['Bambusa balcooa'], capacityTonnes: 40, landAreaAcres: 18, experienceYears: 8, useCategories: ['Furniture', 'Construction'], verified: false, registeredDate: '2025-01-20' },

  // Mizoram
  { id: 'BCP-005', name: 'Lalremruati Sailo', phone: '+91 94321 09876', email: 'lalrem.sailo@email.com', state: 'Mizoram', district: 'Aizawl', address: 'Durtlang, Aizawl', pincode: '796001', bambooTypes: ['Melocanna baccifera', 'Bambusa tulda'], capacityTonnes: 200, landAreaAcres: 80, experienceYears: 18, useCategories: ['Paper & Pulp', 'Mat Weaving', 'Housing'], verified: true, registeredDate: '2024-05-10' },
  { id: 'BCP-006', name: 'C. Lalthanzara', phone: '+91 93210 98765', email: 'lal.thanzara@email.com', state: 'Mizoram', district: 'Champhai', address: 'Champhai Town', pincode: '796321', bambooTypes: ['Melocanna baccifera'], capacityTonnes: 150, landAreaAcres: 65, experienceYears: 25, useCategories: ['Paper & Pulp', 'Construction'], verified: true, registeredDate: '2024-04-08' },

  // Tripura
  { id: 'BCP-007', name: 'Subhas Debbarma', phone: '+91 92109 87654', email: 'subhas.deb@email.com', state: 'Tripura', district: 'West Tripura', address: 'Jirania, West Tripura', pincode: '799045', bambooTypes: ['Bambusa balcooa', 'Melocanna baccifera', 'Bambusa tulda'], capacityTonnes: 100, landAreaAcres: 45, experienceYears: 20, useCategories: ['Handicrafts', 'Construction', 'Furniture'], verified: true, registeredDate: '2024-07-14' },

  // Meghalaya
  { id: 'BCP-008', name: 'Banseng R. Marak', phone: '+91 91098 76543', email: 'banseng.marak@email.com', state: 'Meghalaya', district: 'West Garo Hills', address: 'Tura, West Garo Hills', pincode: '794001', bambooTypes: ['Bambusa balcooa', 'Bambusa tulda'], capacityTonnes: 70, landAreaAcres: 30, experienceYears: 12, useCategories: ['Construction', 'Handicrafts'], verified: true, registeredDate: '2024-10-22' },
  { id: 'BCP-009', name: 'Emidaka Lyngdoh', phone: '+91 90987 65432', email: 'emidaka@email.com', state: 'Meghalaya', district: 'East Khasi Hills', address: 'Shillong, East Khasi Hills', pincode: '793001', bambooTypes: ['Bambusa tulda'], capacityTonnes: 35, landAreaAcres: 15, experienceYears: 7, useCategories: ['Furniture', 'Housing'], verified: false, registeredDate: '2025-02-11' },

  // Manipur
  { id: 'BCP-010', name: 'Oinam Birendro Singh', phone: '+91 89876 54321', email: 'birendro@email.com', state: 'Manipur', district: 'Bishnupur', address: 'Moirang, Bishnupur', pincode: '795133', bambooTypes: ['Melocanna baccifera', 'Bambusa tulda'], capacityTonnes: 60, landAreaAcres: 25, experienceYears: 14, useCategories: ['Mat Weaving', 'Handicrafts', 'Fencing'], verified: true, registeredDate: '2024-11-05' },

  // Nagaland
  { id: 'BCP-011', name: 'Khrieketou Mero', phone: '+91 88765 43210', email: 'khrieketou@email.com', state: 'Nagaland', district: 'Dimapur', address: 'Chumukedima, Dimapur', pincode: '797103', bambooTypes: ['Bambusa tulda', 'Bambusa balcooa'], capacityTonnes: 45, landAreaAcres: 20, experienceYears: 9, useCategories: ['Construction', 'Housing'], verified: true, registeredDate: '2024-12-01' },

  // Arunachal Pradesh
  { id: 'BCP-012', name: 'Toko Yudik', phone: '+91 87654 32109', email: 'toko.yudik@email.com', state: 'Arunachal Pradesh', district: 'Papum Pare', address: 'Itanagar, Papum Pare', pincode: '791111', bambooTypes: ['Bambusa balcooa', 'Bambusa tulda', 'Dendrocalamus asper'], capacityTonnes: 90, landAreaAcres: 40, experienceYears: 16, useCategories: ['Construction', 'Edible Shoots', 'Furniture'], verified: true, registeredDate: '2024-06-20' },

  // West Bengal
  { id: 'BCP-013', name: 'Arun Ghosh', phone: '+91 86543 21098', email: 'arun.ghosh@email.com', state: 'West Bengal', district: 'Jalpaiguri', address: 'Malbazar, Jalpaiguri', pincode: '735221', bambooTypes: ['Bambusa balcooa', 'Bambusa tulda'], capacityTonnes: 110, landAreaAcres: 48, experienceYears: 20, useCategories: ['Paper & Pulp', 'Construction'], verified: true, registeredDate: '2024-05-30' },
  { id: 'BCP-014', name: 'Pranab Sarkar', phone: '+91 85432 10987', email: 'pranab.sarkar@email.com', state: 'West Bengal', district: 'Cooch Behar', address: 'Dinhata, Cooch Behar', pincode: '736135', bambooTypes: ['Bambusa balcooa'], capacityTonnes: 65, landAreaAcres: 28, experienceYears: 11, useCategories: ['Furniture', 'Handicrafts'], verified: true, registeredDate: '2024-08-25' },
  { id: 'BCP-015', name: 'Bishnu Mandal', phone: '+91 84321 09876', email: 'bishnu.mandal@email.com', state: 'West Bengal', district: 'Bankura', address: 'Sonamukhi, Bankura', pincode: '722207', bambooTypes: ['Dendrocalamus strictus'], capacityTonnes: 30, landAreaAcres: 12, experienceYears: 6, useCategories: ['Agricultural Tools', 'Fencing'], verified: false, registeredDate: '2025-03-15' },

  // Madhya Pradesh
  { id: 'BCP-016', name: 'Ramesh Patel', phone: '+91 83210 98765', email: 'ramesh.patel@email.com', state: 'Madhya Pradesh', district: 'Mandla', address: 'Bichhia, Mandla', pincode: '481768', bambooTypes: ['Dendrocalamus strictus'], capacityTonnes: 95, landAreaAcres: 42, experienceYears: 18, useCategories: ['Construction', 'Paper & Pulp', 'Scaffolding'], verified: true, registeredDate: '2024-07-08' },
  { id: 'BCP-017', name: 'Geeta Bai Gond', phone: '+91 82109 87654', email: 'geeta.gond@email.com', state: 'Madhya Pradesh', district: 'Balaghat', address: 'Lanji, Balaghat', pincode: '481222', bambooTypes: ['Dendrocalamus strictus', 'Bambusa bambos'], capacityTonnes: 75, landAreaAcres: 35, experienceYears: 14, useCategories: ['Construction', 'Biomass'], verified: true, registeredDate: '2024-09-12' },
  { id: 'BCP-018', name: 'Suresh Thakur', phone: '+91 81098 76543', email: 'suresh.thakur@email.com', state: 'Madhya Pradesh', district: 'Hoshangabad', address: 'Pipariya, Hoshangabad', pincode: '461775', bambooTypes: ['Dendrocalamus strictus'], capacityTonnes: 50, landAreaAcres: 22, experienceYears: 10, useCategories: ['Scaffolding', 'Agricultural Tools'], verified: false, registeredDate: '2025-01-05' },

  // Maharashtra
  { id: 'BCP-019', name: 'Vikram Patil', phone: '+91 80987 65432', email: 'vikram.patil@email.com', state: 'Maharashtra', district: 'Ratnagiri', address: 'Chiplun, Ratnagiri', pincode: '415605', bambooTypes: ['Bambusa bambos', 'Dendrocalamus strictus'], capacityTonnes: 85, landAreaAcres: 38, experienceYears: 16, useCategories: ['Construction', 'Furniture', 'Charcoal'], verified: true, registeredDate: '2024-06-15' },
  { id: 'BCP-020', name: 'Sandip Jadhav', phone: '+91 79876 54321', email: 'sandip.jadhav@email.com', state: 'Maharashtra', district: 'Gadchiroli', address: 'Dhanora, Gadchiroli', pincode: '442605', bambooTypes: ['Dendrocalamus strictus', 'Bambusa bambos'], capacityTonnes: 130, landAreaAcres: 55, experienceYears: 22, useCategories: ['Paper & Pulp', 'Construction', 'Biomass'], verified: true, registeredDate: '2024-04-20' },
  { id: 'BCP-021', name: 'Pratibha Deshmukh', phone: '+91 78765 43210', email: 'pratibha.d@email.com', state: 'Maharashtra', district: 'Chandrapur', address: 'Warora, Chandrapur', pincode: '442907', bambooTypes: ['Dendrocalamus strictus'], capacityTonnes: 60, landAreaAcres: 28, experienceYears: 9, useCategories: ['Industrial', 'Construction'], verified: true, registeredDate: '2024-10-10' },

  // Karnataka
  { id: 'BCP-022', name: 'Nagaraj Gowda', phone: '+91 77654 32109', email: 'nagaraj.gowda@email.com', state: 'Karnataka', district: 'Shimoga', address: 'Sagar, Shimoga', pincode: '577401', bambooTypes: ['Bambusa bambos', 'Dendrocalamus asper'], capacityTonnes: 70, landAreaAcres: 30, experienceYears: 13, useCategories: ['Construction', 'Furniture', 'Edible Shoots'], verified: true, registeredDate: '2024-08-05' },
  { id: 'BCP-023', name: 'Shivanna K.R.', phone: '+91 76543 21098', email: 'shivanna.kr@email.com', state: 'Karnataka', district: 'Uttara Kannada', address: 'Sirsi, Uttara Kannada', pincode: '581401', bambooTypes: ['Bambusa bambos', 'Dendrocalamus strictus'], capacityTonnes: 55, landAreaAcres: 24, experienceYears: 11, useCategories: ['Handicrafts', 'Housing'], verified: true, registeredDate: '2024-11-18' },

  // Kerala
  { id: 'BCP-024', name: 'Thomas Varghese', phone: '+91 75432 10987', email: 'thomas.v@email.com', state: 'Kerala', district: 'Wayanad', address: 'Mananthavady, Wayanad', pincode: '670645', bambooTypes: ['Dendrocalamus asper', 'Bambusa bambos'], capacityTonnes: 45, landAreaAcres: 18, experienceYears: 12, useCategories: ['Edible Shoots', 'Furniture', 'Construction'], verified: true, registeredDate: '2024-07-22' },
  { id: 'BCP-025', name: 'Sreedharan Nair', phone: '+91 74321 09876', email: 'sreedharan@email.com', state: 'Kerala', district: 'Palakkad', address: 'Attappadi, Palakkad', pincode: '678581', bambooTypes: ['Bambusa bambos', 'Dendrocalamus asper'], capacityTonnes: 55, landAreaAcres: 22, experienceYears: 15, useCategories: ['Handicrafts', 'Furniture'], verified: true, registeredDate: '2024-09-30' },
  { id: 'BCP-026', name: 'Meera Krishnan', phone: '+91 73210 98765', email: 'meera.k@email.com', state: 'Kerala', district: 'Idukki', address: 'Thodupuzha, Idukki', pincode: '685584', bambooTypes: ['Dendrocalamus asper'], capacityTonnes: 30, landAreaAcres: 12, experienceYears: 7, useCategories: ['Edible Shoots', 'Charcoal'], verified: false, registeredDate: '2025-02-28' },

  // Tamil Nadu
  { id: 'BCP-027', name: 'Murugan S.', phone: '+91 72109 87654', email: 'murugan.s@email.com', state: 'Tamil Nadu', district: 'Nilgiris', address: 'Gudalur, Nilgiris', pincode: '643212', bambooTypes: ['Bambusa bambos', 'Dendrocalamus strictus'], capacityTonnes: 65, landAreaAcres: 28, experienceYears: 14, useCategories: ['Construction', 'Fencing'], verified: true, registeredDate: '2024-06-28' },
  { id: 'BCP-028', name: 'Selvam R.', phone: '+91 71098 76543', email: 'selvam.r@email.com', state: 'Tamil Nadu', district: 'Dindigul', address: 'Kodaikanal Road, Dindigul', pincode: '624001', bambooTypes: ['Bambusa bambos'], capacityTonnes: 40, landAreaAcres: 16, experienceYears: 8, useCategories: ['Handicrafts', 'Agricultural Tools'], verified: true, registeredDate: '2024-12-15' },

  // Andhra Pradesh
  { id: 'BCP-029', name: 'Kiran Reddy', phone: '+91 70987 65432', email: 'kiran.reddy@email.com', state: 'Andhra Pradesh', district: 'East Godavari', address: 'Rampachodavaram, East Godavari', pincode: '533288', bambooTypes: ['Dendrocalamus strictus', 'Bambusa bambos'], capacityTonnes: 90, landAreaAcres: 40, experienceYears: 17, useCategories: ['Construction', 'Paper & Pulp'], verified: true, registeredDate: '2024-05-18' },
  { id: 'BCP-030', name: 'Venkata Rao', phone: '+91 69876 54321', email: 'venkata.rao@email.com', state: 'Andhra Pradesh', district: 'Visakhapatnam', address: 'Araku Valley, Visakhapatnam', pincode: '531149', bambooTypes: ['Bambusa bambos', 'Dendrocalamus strictus'], capacityTonnes: 70, landAreaAcres: 32, experienceYears: 13, useCategories: ['Handicrafts', 'Construction', 'Furniture'], verified: true, registeredDate: '2024-08-01' },

  // Telangana
  { id: 'BCP-031', name: 'Srinivas Goud', phone: '+91 68765 43210', email: 'srinivas.g@email.com', state: 'Telangana', district: 'Adilabad', address: 'Utnoor, Adilabad', pincode: '504311', bambooTypes: ['Dendrocalamus strictus'], capacityTonnes: 50, landAreaAcres: 22, experienceYears: 10, useCategories: ['Construction', 'Scaffolding'], verified: true, registeredDate: '2024-10-05' },

  // Odisha
  { id: 'BCP-032', name: 'Bijay Sahu', phone: '+91 67654 32109', email: 'bijay.sahu@email.com', state: 'Odisha', district: 'Mayurbhanj', address: 'Baripada, Mayurbhanj', pincode: '757001', bambooTypes: ['Bambusa balcooa', 'Dendrocalamus strictus'], capacityTonnes: 85, landAreaAcres: 38, experienceYears: 15, useCategories: ['Construction', 'Handicrafts', 'Furniture'], verified: true, registeredDate: '2024-07-10' },
  { id: 'BCP-033', name: 'Priyanka Mohanty', phone: '+91 66543 21098', email: 'priyanka.m@email.com', state: 'Odisha', district: 'Koraput', address: 'Jeypore, Koraput', pincode: '764001', bambooTypes: ['Dendrocalamus strictus', 'Bambusa bambos'], capacityTonnes: 60, landAreaAcres: 26, experienceYears: 11, useCategories: ['Paper & Pulp', 'Mat Weaving'], verified: true, registeredDate: '2024-11-22' },

  // Chhattisgarh
  { id: 'BCP-034', name: 'Dhanraj Netam', phone: '+91 65432 10987', email: 'dhanraj.n@email.com', state: 'Chhattisgarh', district: 'Bastar', address: 'Jagdalpur, Bastar', pincode: '494001', bambooTypes: ['Dendrocalamus strictus', 'Bambusa bambos'], capacityTonnes: 140, landAreaAcres: 60, experienceYears: 24, useCategories: ['Construction', 'Paper & Pulp', 'Biomass'], verified: true, registeredDate: '2024-04-15' },
  { id: 'BCP-035', name: 'Kamla Bai Markam', phone: '+91 64321 09876', email: 'kamla.markam@email.com', state: 'Chhattisgarh', district: 'Sarguja', address: 'Ambikapur, Sarguja', pincode: '497001', bambooTypes: ['Dendrocalamus strictus'], capacityTonnes: 55, landAreaAcres: 25, experienceYears: 12, useCategories: ['Handicrafts', 'Fencing'], verified: true, registeredDate: '2024-09-08' },

  // Jharkhand
  { id: 'BCP-036', name: 'Somra Munda', phone: '+91 63210 98765', email: 'somra.munda@email.com', state: 'Jharkhand', district: 'West Singhbhum', address: 'Chaibasa, West Singhbhum', pincode: '833201', bambooTypes: ['Dendrocalamus strictus', 'Bambusa balcooa'], capacityTonnes: 75, landAreaAcres: 34, experienceYears: 16, useCategories: ['Construction', 'Agricultural Tools'], verified: true, registeredDate: '2024-08-18' },

  // Uttarakhand
  { id: 'BCP-037', name: 'Govind Bisht', phone: '+91 62109 87654', email: 'govind.bisht@email.com', state: 'Uttarakhand', district: 'Dehradun', address: 'Vikasnagar, Dehradun', pincode: '248198', bambooTypes: ['Dendrocalamus strictus', 'Bambusa tulda'], capacityTonnes: 35, landAreaAcres: 15, experienceYears: 8, useCategories: ['Furniture', 'Handicrafts'], verified: true, registeredDate: '2024-11-30' },

  // Sikkim
  { id: 'BCP-038', name: 'Pema Tshering Lepcha', phone: '+91 61098 76543', email: 'pema.lepcha@email.com', state: 'Sikkim', district: 'East Sikkim', address: 'Gangtok, East Sikkim', pincode: '737101', bambooTypes: ['Bambusa tulda', 'Dendrocalamus asper'], capacityTonnes: 25, landAreaAcres: 10, experienceYears: 6, useCategories: ['Edible Shoots', 'Handicrafts'], verified: true, registeredDate: '2024-12-20' },

  // Gujarat
  { id: 'BCP-039', name: 'Manilal Gamit', phone: '+91 60987 65432', email: 'manilal.gamit@email.com', state: 'Gujarat', district: 'The Dangs', address: 'Ahwa, The Dangs', pincode: '394710', bambooTypes: ['Dendrocalamus strictus', 'Bambusa bambos'], capacityTonnes: 65, landAreaAcres: 30, experienceYears: 13, useCategories: ['Construction', 'Fencing', 'Biomass'], verified: true, registeredDate: '2024-07-25' },

  // Rajasthan
  { id: 'BCP-040', name: 'Bhura Meena', phone: '+91 59876 54321', email: 'bhura.meena@email.com', state: 'Rajasthan', district: 'Banswara', address: 'Kushalgarh, Banswara', pincode: '327801', bambooTypes: ['Dendrocalamus strictus'], capacityTonnes: 40, landAreaAcres: 18, experienceYears: 9, useCategories: ['Agricultural Tools', 'Fencing'], verified: true, registeredDate: '2024-10-15' },

  // Bihar
  { id: 'BCP-041', name: 'Ranjit Kumar', phone: '+91 58765 43210', email: 'ranjit.kumar@email.com', state: 'Bihar', district: 'Muzaffarpur', address: 'Motihari Road, Muzaffarpur', pincode: '842001', bambooTypes: ['Bambusa balcooa', 'Bambusa tulda'], capacityTonnes: 55, landAreaAcres: 24, experienceYears: 11, useCategories: ['Furniture', 'Handicrafts', 'Housing'], verified: true, registeredDate: '2024-09-25' },

  // Himachal Pradesh
  { id: 'BCP-042', name: 'Rakesh Thakur', phone: '+91 57654 32109', email: 'rakesh.thakur@email.com', state: 'Himachal Pradesh', district: 'Kangra', address: 'Dharamshala, Kangra', pincode: '176215', bambooTypes: ['Dendrocalamus strictus'], capacityTonnes: 20, landAreaAcres: 8, experienceYears: 5, useCategories: ['Handicrafts', 'Fencing'], verified: false, registeredDate: '2025-03-10' },

  // Goa
  { id: 'BCP-043', name: 'Francisco D\'Souza', phone: '+91 56543 21098', email: 'francisco.ds@email.com', state: 'Goa', district: 'South Goa', address: 'Quepem, South Goa', pincode: '403703', bambooTypes: ['Bambusa bambos', 'Dendrocalamus asper'], capacityTonnes: 25, landAreaAcres: 10, experienceYears: 7, useCategories: ['Furniture', 'Edible Shoots'], verified: true, registeredDate: '2024-11-08' },

  // Uttar Pradesh
  { id: 'BCP-044', name: 'Ashok Yadav', phone: '+91 55432 10987', email: 'ashok.yadav@email.com', state: 'Uttar Pradesh', district: 'Sonbhadra', address: 'Robertsganj, Sonbhadra', pincode: '231216', bambooTypes: ['Dendrocalamus strictus'], capacityTonnes: 45, landAreaAcres: 20, experienceYears: 10, useCategories: ['Construction', 'Scaffolding'], verified: true, registeredDate: '2024-08-30' },

  // Punjab
  { id: 'BCP-045', name: 'Harjinder Singh', phone: '+91 54321 09876', email: 'harjinder@email.com', state: 'Punjab', district: 'Ludhiana', address: 'Khanna, Ludhiana', pincode: '141401', bambooTypes: ['Bambusa tulda'], capacityTonnes: 20, landAreaAcres: 8, experienceYears: 4, useCategories: ['Furniture', 'Agricultural Tools'], verified: false, registeredDate: '2025-02-18' },

  // Haryana
  { id: 'BCP-046', name: 'Sunil Kumar Malik', phone: '+91 53210 98765', email: 'sunil.malik@email.com', state: 'Haryana', district: 'Karnal', address: 'Nilokheri, Karnal', pincode: '132117', bambooTypes: ['Bambusa tulda', 'Dendrocalamus strictus'], capacityTonnes: 30, landAreaAcres: 12, experienceYears: 6, useCategories: ['Furniture', 'Scaffolding'], verified: true, registeredDate: '2024-12-05' },

  // Additional Northeast providers
  { id: 'BCP-047', name: 'Thangjam Ibochouba', phone: '+91 52109 87654', email: 'ibochouba@email.com', state: 'Manipur', district: 'Tamenglong', address: 'Tamenglong Town', pincode: '795141', bambooTypes: ['Melocanna baccifera', 'Bambusa tulda', 'Bambusa balcooa'], capacityTonnes: 95, landAreaAcres: 42, experienceYears: 19, useCategories: ['Paper & Pulp', 'Housing', 'Mat Weaving'], verified: true, registeredDate: '2024-05-25' },
  { id: 'BCP-048', name: 'Lalbiaksangi', phone: '+91 51098 76543', email: 'lalbiaksangi@email.com', state: 'Mizoram', district: 'Lunglei', address: 'Lunglei Town', pincode: '796701', bambooTypes: ['Melocanna baccifera'], capacityTonnes: 160, landAreaAcres: 70, experienceYears: 21, useCategories: ['Paper & Pulp', 'Construction'], verified: true, registeredDate: '2024-06-12' },
  
  // Additional Central India
  { id: 'BCP-049', name: 'Lakhan Singh Dhurve', phone: '+91 50987 65432', email: 'lakhan.dhurve@email.com', state: 'Madhya Pradesh', district: 'Betul', address: 'Betul Town', pincode: '460001', bambooTypes: ['Dendrocalamus strictus'], capacityTonnes: 55, landAreaAcres: 25, experienceYears: 12, useCategories: ['Construction', 'Industrial'], verified: true, registeredDate: '2024-10-28' },
  { id: 'BCP-050', name: 'Sunita Markam', phone: '+91 49876 54321', email: 'sunita.markam@email.com', state: 'Chhattisgarh', district: 'Jashpur', address: 'Jashpur Nagar', pincode: '496331', bambooTypes: ['Dendrocalamus strictus', 'Bambusa balcooa'], capacityTonnes: 80, landAreaAcres: 36, experienceYears: 15, useCategories: ['Handicrafts', 'Construction', 'Furniture'], verified: true, registeredDate: '2024-07-30' }
];

// Pre-seeded bamboo requirements
const SEED_REQUIREMENTS = [
  {
    id: 'REQ-001',
    title: 'Bamboo poles for Rural Housing Project',
    description: 'Need high-quality Bambusa balcooa poles for a rural housing project under PMAY. Minimum 15cm diameter, 6m length.',
    species: 'Bambusa balcooa',
    quantity: '500 poles',
    state: 'West Bengal',
    district: 'Midnapore',
    urgency: 'high',
    postedBy: 'Rural Dev. Department, WB',
    contact: '+91 33-2250-1234',
    postedDate: '2025-04-10',
    status: 'open'
  },
  {
    id: 'REQ-002',
    title: 'Bamboo for Paper Mill Supply',
    description: 'Recurring monthly supply of Bambusa tulda and Melocanna baccifera for paper manufacturing. Long-term contract available.',
    species: 'Bambusa tulda',
    quantity: '200 tonnes/month',
    state: 'Assam',
    district: 'Nagaon',
    urgency: 'medium',
    postedBy: 'Nagaon Paper Mill',
    contact: '+91 3672-233456',
    postedDate: '2025-04-05',
    status: 'open'
  },
  {
    id: 'REQ-003',
    title: 'Organic Bamboo Shoots for Export',
    description: 'Looking for certified organic bamboo shoots (Dendrocalamus asper) for export to Japan and South Korea. Need proper packaging facility.',
    species: 'Dendrocalamus asper',
    quantity: '5 tonnes',
    state: 'Kerala',
    district: 'Wayanad',
    urgency: 'medium',
    postedBy: 'GreenExport Pvt. Ltd.',
    contact: '+91 484-267-8901',
    postedDate: '2025-04-08',
    status: 'open'
  },
  {
    id: 'REQ-004',
    title: 'Bamboo for Eco-Resort Construction',
    description: 'Building an eco-resort in Goa using bamboo structure. Need treated bamboo poles and bamboo-based flooring materials.',
    species: 'Bambusa bambos',
    quantity: '300 poles + flooring',
    state: 'Goa',
    district: 'South Goa',
    urgency: 'low',
    postedBy: 'EcoStay Resorts',
    contact: '+91 832-225-6789',
    postedDate: '2025-03-28',
    status: 'open'
  },
  {
    id: 'REQ-005',
    title: 'Bamboo Scaffolding Supply — Mumbai Construction',
    description: 'Urgent requirement for Dendrocalamus strictus scaffolding poles for high-rise construction project in Mumbai.',
    species: 'Dendrocalamus strictus',
    quantity: '2000 poles',
    state: 'Maharashtra',
    district: 'Mumbai',
    urgency: 'high',
    postedBy: 'Skyline Builders',
    contact: '+91 22-2456-7890',
    postedDate: '2025-04-12',
    status: 'open'
  },
  {
    id: 'REQ-006',
    title: 'Bamboo Crafts Raw Material for Self-Help Groups',
    description: 'Multiple SHGs require thin bamboo strips and split bamboo for basket weaving and handicraft production.',
    species: 'Bambusa tulda',
    quantity: '50 tonnes',
    state: 'Tripura',
    district: 'West Tripura',
    urgency: 'medium',
    postedBy: 'NRLM - Tripura',
    contact: '+91 381-232-5678',
    postedDate: '2025-04-01',
    status: 'open'
  },
  {
    id: 'REQ-007',
    title: 'Bamboo Charcoal Production Raw Material',
    description: 'Setting up bamboo charcoal production unit. Need consistent supply of mature bamboo culms of any species.',
    species: 'any',
    quantity: '100 tonnes/month',
    state: 'Karnataka',
    district: 'Shimoga',
    urgency: 'low',
    postedBy: 'BioChar Industries',
    contact: '+91 8182-22-3456',
    postedDate: '2025-03-20',
    status: 'open'
  },
  {
    id: 'REQ-008',
    title: 'Bamboo Furniture Grade Material',
    description: 'Premium bamboo furniture manufacturer needs Grade-A Bambusa balcooa poles. Diameter 10-15cm, straight, no cracks.',
    species: 'Bambusa balcooa',
    quantity: '80 tonnes',
    state: 'Maharashtra',
    district: 'Pune',
    urgency: 'high',
    postedBy: 'BambooLiving Furniture',
    contact: '+91 20-2567-8901',
    postedDate: '2025-04-14',
    status: 'open'
  }
];

// Government schemes data
const GOV_SCHEMES = [
  {
    name: 'National Bamboo Mission (NBM)',
    description: 'Centrally sponsored scheme promoting bamboo plantation, nursery development, and value addition with financial support.',
    subsidy: 'Up to ₹1.2 lakh/ha for plantation (60:40 centre-state sharing)',
    link: 'https://nbm.nic.in',
    icon: '🏛️'
  },
  {
    name: 'NABARD Bamboo Financing',
    description: 'Agricultural loans and refinancing for bamboo cultivation, processing units, and marketing infrastructure.',
    subsidy: 'Concessional interest rates for bamboo farmers',
    link: 'https://www.nabard.org',
    icon: '🏦'
  },
  {
    name: 'PMEGP for Bamboo Units',
    description: 'Prime Minister Employment Generation Programme covers bamboo processing and handicraft units.',
    subsidy: 'Up to 35% subsidy on project cost',
    link: 'https://www.kviconline.gov.in',
    icon: '🏭'
  },
  {
    name: 'GeM Bamboo Window',
    description: 'Government e-Marketplace dedicated portal for bamboo products procurement by government departments.',
    subsidy: 'Direct market access to government buyers',
    link: 'https://gem.gov.in',
    icon: '🛒'
  }
];

// ==========================================
// Supabase-backed async data functions
// ==========================================

// In-memory cache for fast rendering
var _providerCache = [];
var _requirementCache = [];
var _dataReady = false;

// Initialize: seed Supabase if empty, then load into cache
async function initializeData() {
  try {
    await sbSeedIfEmpty();
    _providerCache = await sbFetchProviders();
    _requirementCache = await sbFetchRequirements();
    _dataReady = true;
    console.log('Data loaded: ' + _providerCache.length + ' providers, ' + _requirementCache.length + ' requirements');
  } catch (err) {
    console.error('Init error, falling back to seed data:', err);
    _providerCache = SEED_PROVIDERS;
    _requirementCache = SEED_REQUIREMENTS;
    _dataReady = true;
  }
}

function getProviders() {
  return _providerCache.length > 0 ? _providerCache : SEED_PROVIDERS;
}

async function addProvider(provider) {
  var result = await sbAddProvider(provider);
  if (result) {
    // Refresh cache
    _providerCache = await sbFetchProviders();
  }
  return result;
}

function getRequirements() {
  return _requirementCache.length > 0 ? _requirementCache : SEED_REQUIREMENTS;
}

async function addRequirement(req) {
  var result = await sbAddRequirement(req);
  if (result) {
    _requirementCache = await sbFetchRequirements();
  }
  return result;
}

function getStats() {
  var providers = getProviders();
  var states = new Set(providers.map(function(p) { return p.state; }));
  var totalCapacity = 0;
  providers.forEach(function(p) { totalCapacity += p.capacityTonnes; });
  return {
    totalProviders: providers.length,
    totalStates: states.size,
    totalCapacity: totalCapacity,
    verifiedProviders: providers.filter(function(p) { return p.verified; }).length
  };
}
