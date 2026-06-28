export const COURSES = [
  { id: 'Engineering', label: 'Engineering', sub: 'B.Tech / BE', icon: '⚙️', color: '#E3F2FD' },
  { id: 'MBBS', label: 'MBBS / Medical', sub: 'MBBS / BDS / BAMS', icon: '🏥', color: '#FCE4EC' },
  { id: 'MBA', label: 'MBA / PGDM', sub: 'Management', icon: '📊', color: '#E8F5E9' },
  { id: 'BBA', label: 'BBA', sub: 'Business Admin', icon: '💼', color: '#EDE7F6' },
  { id: 'BCA', label: 'BCA', sub: 'Computer Apps', icon: '💻', color: '#FFF8E1' },
  { id: 'Law', label: 'Law / LLB', sub: 'BA LLB / BBA LLB', icon: '⚖️', color: '#FCE4EC' },
  { id: 'BCom', label: 'B.Com', sub: 'Commerce', icon: '🏦', color: '#E0F2F1' },
  { id: 'BSc', label: 'B.Sc', sub: 'Science', icon: '🔬', color: '#F3E5F5' },
  { id: 'Design', label: 'Design', sub: 'B.Des / NID / NIFT', icon: '🎨', color: '#FFF3E0' },
  { id: 'HotelMgmt', label: 'Hotel Management', sub: 'BHM / B.Sc HM', icon: '🏨', color: '#E8EAF6' },
  { id: 'Pharmacy', label: 'Pharmacy', sub: 'B.Pharm / D.Pharm', icon: '💊', color: '#E0F7FA' },
  { id: 'Architecture', label: 'Architecture', sub: 'B.Arch / M.Arch', icon: '🏛️', color: '#F9FBE7' },
  { id: 'Nursing', label: 'Nursing', sub: 'B.Sc Nursing / GNM', icon: '🩺', color: '#FFF9C4' },
  { id: 'MCA', label: 'MCA', sub: 'Master of Computer Apps', icon: '🖥️', color: '#E8F5E9' },
  { id: 'Animation', label: 'Animation & VFX', sub: 'B.Sc Animation', icon: '🎬', color: '#FCE4EC' },
  { id: 'MassCom', label: 'Mass Communication', sub: 'BJMC / BA Media', icon: '📺', color: '#E3F2FD' },
]

export const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
  'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
  'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Chandigarh', 'Jammu & Kashmir', 'Ladakh', 'Puducherry'
]

export const ZONES = {
  North: ['Delhi', 'Haryana', 'Punjab', 'Himachal Pradesh', 'Jammu & Kashmir', 'Ladakh', 'Uttarakhand', 'Uttar Pradesh', 'Chandigarh', 'Rajasthan'],
  South: ['Karnataka', 'Tamil Nadu', 'Kerala', 'Andhra Pradesh', 'Telangana', 'Puducherry'],
  West: ['Maharashtra', 'Gujarat', 'Goa'],
  East: ['West Bengal', 'Bihar', 'Jharkhand', 'Odisha', 'Assam', 'Meghalaya', 'Manipur', 'Mizoram', 'Nagaland', 'Tripura', 'Arunachal Pradesh', 'Sikkim'],
  Central: ['Madhya Pradesh', 'Chhattisgarh'],
}

export const BUDGETS = [
  { label: 'Any Budget', value: '' },
  { label: 'Under ₹1 Lakh/yr', value: '100000' },
  { label: '₹1–3 Lakhs/yr', value: '300000' },
  { label: '₹3–5 Lakhs/yr', value: '500000' },
  { label: '₹5–10 Lakhs/yr', value: '1000000' },
  { label: 'Above ₹10 Lakhs/yr', value: '2000000' },
]