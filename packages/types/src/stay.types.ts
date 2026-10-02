export interface StayItem {
  id: number
  name: string
  city: string
  origPrice: number
  memberPrice: number
  badge: string
  image: string
}

export interface MemberStayReservation {
  id: string
  stayId: number
  stayName: string
  location: string
  image: string
  checkIn: string
  checkOut: string
  nights: number
  guests: number
  roomType: string
  totalPrice: number
  status: "confirmed" | "pending" | "completed" | "cancelled"
  confirmationCode: string
}

export interface MemberSubscription {
  planName: string
  tierBadge: string
  status: "active" | "trialing" | "canceled"
  renewalDate: string
  priceMonthly: number
  priceAnnual: number
  period: "annual" | "monthly"
  paymentMethod: {
    brand: string
    last4: string
    expiry: string
  }
  invoices: {
    id: string
    date: string
    amount: number
    status: "paid" | "pending"
    pdfUrl?: string
  }[]
  features: string[]
}

export interface ApiImageMeta {
  _id: string
  url: string
  area: string
}

export interface ApiMainImg {
  alt: string
  url: string
  url_original: string
}

export interface ApiCityCoverageState {
  id: number
  name: string
  countries: {
    id: number
    name: string
  }
}

export interface ApiCity {
  id: number
  name: string
  state_id: number
  keys_coverage_states: ApiCityCoverageState
}

export interface RoomProperty {
  id: string
  _id: string
  latitude: string
  longitude: string
  slug: string
  title: string
  max_guest: number
  base_price: string
  base_price_with_discount: number
  rooms: number
  beds: number
  bathrooms: number
  property_type: string
  main_img: ApiMainImg
  images_meta: ApiImageMeta[]
  min_stays: number
  lastminutetoday?: boolean
  lastminute24h?: boolean
  lastminute48h?: boolean
  city: ApiCity
  listing_id_external_long: string

  rating: number
  reviewsCount: number
  competitorPlatform: "Airbnb" | "Booking.com" | "Trivago"
}

export interface UpcomingEventInfo {
  id: string
  label: string
  shortLabel: string
  type: string
  tag: string
  date: string
  month: string
}
