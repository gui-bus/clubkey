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
  dateFrom: string
  dateTo: string
  daysUntil: number
  venue: string
}

export interface RoomSection {
  id: string
  title: string
  subtitle?: string
  isEvent?: boolean
  eventBadge?: string
  upcomingEvents?: UpcomingEventInfo[]
  rooms: RoomProperty[]
}

export const rawApiRooms: RoomProperty[] = [
  {
    id: "NG02J",
    _id: "6a774f4ac75dd693e2a3833c",
    latitude: "-27.424288",
    longitude: "-48.40342108",
    slug: "ape-c-piscina-ingleses-2-suites-300m-do-mar",
    title: "Apê c/ piscina Ingleses | 2 Suítes 300m do mar",
    max_guest: 5,
    base_price: "473",
    base_price_with_discount: 189.2,
    rooms: 2,
    beds: 3,
    bathrooms: 2,
    property_type: "Apartamento",
    main_img: {
      alt: "LUGA: Apto Aconchegante em Floripa c/2 Suítes",
      url: "https://d2m6h3qnuwjcmy.cloudfront.net/6a774f4ac75dd693e2a3833c_581dd867_1787112023990.webp",
      url_original: "https://sra.stays.com.br/image/6a84938fcb9d917b0b7ec046",
    },
    images_meta: [
      {
        _id: "6aa16d90103d0b751e803146",
        url: "https://sra.stays.com.br/image/6aa16d90103d0b751e803146",
        area: "main",
      },
      {
        _id: "6aa16d9075bf49938a3a8ec0",
        url: "https://sra.stays.com.br/image/6aa16d9075bf49938a3a8ec0",
        area: "room",
      },
      {
        _id: "6aa16d90eb33aafb1c1c7518",
        url: "https://sra.stays.com.br/image/6aa16d90eb33aafb1c1c7518",
        area: "room",
      },
      {
        _id: "6aa16d906a9396f21e1cefd9",
        url: "https://sra.stays.com.br/image/6aa16d906a9396f21e1cefd9",
        area: "room",
      },
      {
        _id: "6aa16d9091bd45e9932c66e8",
        url: "https://sra.stays.com.br/image/6aa16d9091bd45e9932c66e8",
        area: "room",
      },
      {
        _id: "6aa16ebb8c448feae76b3831",
        url: "https://sra.stays.com.br/image/6aa16ebb8c448feae76b3831",
        area: "room",
      },
      {
        _id: "6aa16ebb67f8af2be29a3676",
        url: "https://sra.stays.com.br/image/6aa16ebb67f8af2be29a3676",
        area: "room",
      },
      {
        _id: "6aa16ebb8c448feae76b3830",
        url: "https://sra.stays.com.br/image/6aa16ebb8c448feae76b3830",
        area: "room",
      },
    ],
    min_stays: 2,
    lastminutetoday: false,
    lastminute24h: false,
    lastminute48h: false,
    city: {
      id: 152,
      name: "Florianópolis",
      state_id: 20,
      keys_coverage_states: {
        id: 20,
        name: "Santa Catarina",
        countries: { id: 1, name: "Brasil" },
      },
    },
    listing_id_external_long: "6a774f4ac75dd693e2a3833c",
    rating: 4.96,
    reviewsCount: 128,
    competitorPlatform: "Airbnb",
  },
  {
    id: "NB01J",
    _id: "6a70db11b29bd7ac6b17901e",
    latitude: "-27.183793",
    longitude: "-48.5057053",
    slug: "luga-casa-c-piscina-a-900-metros-da-praia",
    title: "LUGA Casa c/ Piscina a 900 metros da Praia",
    max_guest: 10,
    base_price: "600",
    base_price_with_discount: 240,
    rooms: 3,
    beds: 8,
    bathrooms: 3,
    property_type: "Casa",
    main_img: {
      alt: "CM0076.0000",
      url: "https://d2m6h3qnuwjcmy.cloudfront.net/6a70db11b29bd7ac6b17901e_f153a189_1786766446805.webp",
      url_original: "https://sra.stays.com.br/image/6a7f64d0c69d0bd31261b7fa",
    },
    images_meta: [
      {
        _id: "6a873d43532aa900e01d26ff",
        url: "https://sra.stays.com.br/image/6a873d43532aa900e01d26ff",
        area: "main",
      },
      {
        _id: "6a7f64d0c69d0bd31261b7fa",
        url: "https://sra.stays.com.br/image/6a7f64d0c69d0bd31261b7fa",
        area: "room",
      },
      {
        _id: "6a7f6d5c4fe8e38c0b9d04b3",
        url: "https://sra.stays.com.br/image/6a7f6d5c4fe8e38c0b9d04b3",
        area: "room",
      },
      {
        _id: "6a873d4411b540dfe277ba54",
        url: "https://sra.stays.com.br/image/6a873d4411b540dfe277ba54",
        area: "room",
      },
      {
        _id: "6a873d4411b540dfe277ba51",
        url: "https://sra.stays.com.br/image/6a873d4411b540dfe277ba51",
        area: "room",
      },
      {
        _id: "6a7f6d41e22218119a079304",
        url: "https://sra.stays.com.br/image/6a7f6d41e22218119a079304",
        area: "room",
      },
      {
        _id: "6a7f64cc418ccb0e42daafb2",
        url: "https://sra.stays.com.br/image/6a7f64cc418ccb0e42daafb2",
        area: "room",
      },
      {
        _id: "6a7f64fbf1798d141ead0054",
        url: "https://sra.stays.com.br/image/6a7f64fbf1798d141ead0054",
        area: "room",
      },
    ],
    min_stays: 2,
    lastminutetoday: false,
    lastminute24h: false,
    lastminute48h: false,
    city: {
      id: 328,
      name: "Bombinhas",
      state_id: 20,
      keys_coverage_states: {
        id: 20,
        name: "Santa Catarina",
        countries: { id: 1, name: "Brasil" },
      },
    },
    listing_id_external_long: "6a70db11b29bd7ac6b17901e",
    rating: 4.98,
    reviewsCount: 142,
    competitorPlatform: "Booking.com",
  },
  {
    id: "MK01J",
    _id: "6a5aa9f204e6dd7e222a5a7c",
    latitude: "-27.6429421",
    longitude: "-48.4704976",
    slug: "luga-casa-c-2-suites-e-conforto-no-rio-tavares",
    title: "LUGA Casa c/ 2 Suítes e Conforto no Rio Tavares",
    max_guest: 5,
    base_price: "392",
    base_price_with_discount: 156.8,
    rooms: 2,
    beds: 3,
    bathrooms: 2,
    property_type: "Casa",
    main_img: {
      alt: "TP532B.0000",
      url: "https://d2m6h3qnuwjcmy.cloudfront.net/6a5aa9f204e6dd7e222a5a7c_1bdcabbb_1786507209077.webp",
      url_original: "https://sra.stays.com.br/image/6a7b7dd0364ff24d0326559a",
    },
    images_meta: [
      {
        _id: "6aa17cd02d98223c0401d052",
        url: "https://sra.stays.com.br/image/6aa17cd02d98223c0401d052",
        area: "main",
      },
      {
        _id: "6aa17cd1246eef8e41180edb",
        url: "https://sra.stays.com.br/image/6aa17cd1246eef8e41180edb",
        area: "room",
      },
      {
        _id: "6aa17cd0a2c4591d3f4a34e4",
        url: "https://sra.stays.com.br/image/6aa17cd0a2c4591d3f4a34e4",
        area: "room",
      },
      {
        _id: "6aa17cd011052d48423ba90a",
        url: "https://sra.stays.com.br/image/6aa17cd011052d48423ba90a",
        area: "room",
      },
      {
        _id: "6aa17cd05cd1e844ae43bda1",
        url: "https://sra.stays.com.br/image/6aa17cd05cd1e844ae43bda1",
        area: "room",
      },
      {
        _id: "6aa17cd1ffb51f9efe86d9c8",
        url: "https://sra.stays.com.br/image/6aa17cd1ffb51f9efe86d9c8",
        area: "room",
      },
      {
        _id: "6aa17cd1ed3ad32f7a82d162",
        url: "https://sra.stays.com.br/image/6aa17cd1ed3ad32f7a82d162",
        area: "room",
      },
      {
        _id: "6aa17cd05cd1e844ae43bda2",
        url: "https://sra.stays.com.br/image/6aa17cd05cd1e844ae43bda2",
        area: "room",
      },
    ],
    min_stays: 2,
    lastminutetoday: false,
    lastminute24h: false,
    lastminute48h: false,
    city: {
      id: 152,
      name: "Florianópolis",
      state_id: 20,
      keys_coverage_states: {
        id: 20,
        name: "Santa Catarina",
        countries: { id: 1, name: "Brasil" },
      },
    },
    listing_id_external_long: "6a5aa9f204e6dd7e222a5a7c",
    rating: 4.93,
    reviewsCount: 95,
    competitorPlatform: "Trivago",
  },
  {
    id: "GY01J",
    _id: "699f1a944f948a7d9dbb2764",
    latitude: "-21.7237463",
    longitude: "-41.0297418",
    slug: "casa-perto-do-mar-com-piscina-e-churrasqueira",
    title: "Casa Perto do Mar com Piscina e Churrasqueira",
    max_guest: 10,
    base_price: "575",
    base_price_with_discount: 431.25,
    rooms: 3,
    beds: 6,
    bathrooms: 3,
    property_type: "Villa/Casa",
    main_img: {
      alt: "Casa Perto do Mar com Piscina e Churrasqueira",
      url: "https://d2m6h3qnuwjcmy.cloudfront.net/699f1a944f948a7d9dbb2764_a876f146_1786420892256.webp",
      url_original: "https://credlab.stays.net/image/699f1aa6534f1d0957720fc2",
    },
    images_meta: [
      {
        _id: "699f1aa6534f1d0957720fc2",
        url: "https://credlab.stays.net/image/699f1aa6534f1d0957720fc2",
        area: "main",
      },
      {
        _id: "699f1acfa61ea4fc04276fc0",
        url: "https://credlab.stays.net/image/699f1acfa61ea4fc04276fc0",
        area: "room",
      },
      {
        _id: "699f1aa0a61ea4fc04276dcf",
        url: "https://credlab.stays.net/image/699f1aa0a61ea4fc04276dcf",
        area: "room",
      },
      {
        _id: "699f1aa7c1eb8b5318f146b5",
        url: "https://credlab.stays.net/image/699f1aa7c1eb8b5318f146b5",
        area: "room",
      },
      {
        _id: "699f1acd6a828a9fef96cd3f",
        url: "https://credlab.stays.net/image/699f1acd6a828a9fef96cd3f",
        area: "room",
      },
      {
        _id: "699f1aac6a828a9fef96cc91",
        url: "https://credlab.stays.net/image/699f1aac6a828a9fef96cc91",
        area: "room",
      },
      {
        _id: "699f1ac04b8908c83f76b350",
        url: "https://credlab.stays.net/image/699f1ac04b8908c83f76b350",
        area: "room",
      },
      {
        _id: "699f1ac4c1eb8b5318f14705",
        url: "https://credlab.stays.net/image/699f1ac4c1eb8b5318f14705",
        area: "room",
      },
    ],
    min_stays: 2,
    lastminutetoday: false,
    lastminute24h: false,
    lastminute48h: false,
    city: {
      id: 386,
      name: "São João da Barra",
      state_id: 17,
      keys_coverage_states: {
        id: 17,
        name: "Rio de Janeiro",
        countries: { id: 1, name: "Brasil" },
      },
    },
    listing_id_external_long: "699f1a944f948a7d9dbb2764",
    rating: 4.89,
    reviewsCount: 68,
    competitorPlatform: "Airbnb",
  },
  {
    id: "FQ03J",
    _id: "697260db6c2d244081f374ee",
    latitude: "-22.8694",
    longitude: "-45.77715",
    slug: "monteiro-lobato-refugio-na-natureza-familia-grupos",
    title: "Monteiro Lobato Refúgio na Natureza Família Grupos",
    max_guest: 8,
    base_price: "465",
    base_price_with_discount: 325.5,
    rooms: 2,
    beds: 4,
    bathrooms: 2,
    property_type: "Villa/Casa",
    main_img: {
      alt: "Monteiro Lobato Refúgio na Natureza Família Grupos",
      url: "https://d2m6h3qnuwjcmy.cloudfront.net/697260db6c2d244081f374ee_53b0cfc4_1786420886954.webp",
      url_original: "https://credlab.stays.net/image/697260f093dccb8f91d5be27",
    },
    images_meta: [
      {
        _id: "697260f093dccb8f91d5be27",
        url: "https://credlab.stays.net/image/697260f093dccb8f91d5be27",
        area: "main",
      },
      {
        _id: "697260e75ec8cfcb8504e742",
        url: "https://credlab.stays.net/image/697260e75ec8cfcb8504e742",
        area: "room",
      },
      {
        _id: "697260ec51a8dbc41f3446a7",
        url: "https://credlab.stays.net/image/697260ec51a8dbc41f3446a7",
        area: "room",
      },
      {
        _id: "697260df39f6902e2eff1322",
        url: "https://credlab.stays.net/image/697260df39f6902e2eff1322",
        area: "room",
      },
      {
        _id: "697260ed6c2d244081f37557",
        url: "https://credlab.stays.net/image/697260ed6c2d244081f37557",
        area: "room",
      },
      {
        _id: "697260e4b22ba4edd3e64085",
        url: "https://credlab.stays.net/image/697260e4b22ba4edd3e64085",
        area: "room",
      },
      {
        _id: "697260e58d7ce3dc9e00f6b0",
        url: "https://credlab.stays.net/image/697260e58d7ce3dc9e00f6b0",
        area: "room",
      },
      {
        _id: "697260dcfbcc932c3b33bba9",
        url: "https://credlab.stays.net/image/697260dcfbcc932c3b33bba9",
        area: "room",
      },
    ],
    min_stays: 2,
    lastminutetoday: false,
    lastminute24h: false,
    lastminute48h: false,
    city: {
      id: 381,
      name: "Monteiro Lobato",
      state_id: 18,
      keys_coverage_states: {
        id: 18,
        name: "São Paulo",
        countries: { id: 1, name: "Brasil" },
      },
    },
    listing_id_external_long: "697260db6c2d244081f374ee",
    rating: 4.92,
    reviewsCount: 84,
    competitorPlatform: "Booking.com",
  },
  {
    id: "GX01J",
    _id: "699d96ff3c29989629b72c23",
    latitude: "-26.2109696",
    longitude: "-48.6579099",
    slug: "vila-da-gloria-3-quartos-piscina-e-churrasqueira",
    title: "Vila da Glória: 3 Quartos, Piscina e Churrasqueira",
    max_guest: 6,
    base_price: "1090",
    base_price_with_discount: 763,
    rooms: 3,
    beds: 3,
    bathrooms: 3,
    property_type: "Villa/Casa",
    main_img: {
      alt: "Vila da Glória: 3 Quartos, Piscina e Churrasqueira",
      url: "https://d2m6h3qnuwjcmy.cloudfront.net/699d96ff3c29989629b72c23_cdae95ae_1786420885735.webp",
      url_original: "https://credlab.stays.net/image/699d9715adaf664b57021a5d",
    },
    images_meta: [
      {
        _id: "699d9715adaf664b57021a5d",
        url: "https://credlab.stays.net/image/699d9715adaf664b57021a5d",
        area: "main",
      },
      {
        _id: "699d9708af2d8a49c63986cc",
        url: "https://credlab.stays.net/image/699d9708af2d8a49c63986cc",
        area: "room",
      },
      {
        _id: "699d9719adaf664b57021a80",
        url: "https://credlab.stays.net/image/699d9719adaf664b57021a80",
        area: "room",
      },
      {
        _id: "699d970c150570c6875cabb4",
        url: "https://credlab.stays.net/image/699d970c150570c6875cabb4",
        area: "room",
      },
      {
        _id: "699d971135dce1b677e92904",
        url: "https://credlab.stays.net/image/699d971135dce1b677e92904",
        area: "room",
      },
      {
        _id: "699d9722f67e716f76c51464",
        url: "https://credlab.stays.net/image/699d9722f67e716f76c51464",
        area: "room",
      },
      {
        _id: "699d9712aaffb620bb036f59",
        url: "https://credlab.stays.net/image/699d9712aaffb620bb036f59",
        area: "room",
      },
      {
        _id: "699d971df67e716f76c5142a",
        url: "https://credlab.stays.net/image/699d971df67e716f76c5142a",
        area: "room",
      },
    ],
    min_stays: 2,
    lastminutetoday: false,
    lastminute24h: false,
    lastminute48h: false,
    city: {
      id: 384,
      name: "São Francisco do Sul",
      state_id: 20,
      keys_coverage_states: {
        id: 20,
        name: "Santa Catarina",
        countries: { id: 1, name: "Brasil" },
      },
    },
    listing_id_external_long: "699d96ff3c29989629b72c23",
    rating: 4.95,
    reviewsCount: 112,
    competitorPlatform: "Trivago",
  },
  {
    id: "GS01J",
    _id: "69972fc79895bf8d32638296",
    latitude: "-20.0919459",
    longitude: "-44.4342504",
    slug: "refugio-em-serra-azul-mg-piscina-e-churrasqueira",
    title: "Refúgio em Serra Azul MG: Piscina e Churrasqueira",
    max_guest: 13,
    base_price: "860",
    base_price_with_discount: 645,
    rooms: 3,
    beds: 8,
    bathrooms: 1,
    property_type: "Sítio",
    main_img: {
      alt: "Refúgio em Serra Azul MG: Piscina e Churrasqueira",
      url: "https://d2m6h3qnuwjcmy.cloudfront.net/69972fc79895bf8d32638296_5aceaecb_1786420884780.webp",
      url_original: "https://credlab.stays.net/image/69972fd4ad94b3e4d057141b",
    },
    images_meta: [
      {
        _id: "69972fd4ad94b3e4d057141b",
        url: "https://credlab.stays.net/image/69972fd4ad94b3e4d057141b",
        area: "main",
      },
      {
        _id: "69972fcbad94b3e4d05713ea",
        url: "https://credlab.stays.net/image/69972fcbad94b3e4d05713ea",
        area: "room",
      },
      {
        _id: "69972fcf2f689a4f8840da9d",
        url: "https://credlab.stays.net/image/69972fcf2f689a4f8840da9d",
        area: "room",
      },
      {
        _id: "69972fe4f0751d06162f83c8",
        url: "https://credlab.stays.net/image/69972fe4f0751d06162f83c8",
        area: "room",
      },
      {
        _id: "69972fd5b7ee16946cecc2d7",
        url: "https://credlab.stays.net/image/69972fd5b7ee16946cecc2d7",
        area: "room",
      },
      {
        _id: "69972fdc2949f899245f4c4d",
        url: "https://credlab.stays.net/image/69972fdc2949f899245f4c4d",
        area: "room",
      },
      {
        _id: "69972fdfaf306caaae94cb61",
        url: "https://credlab.stays.net/image/69972fdfaf306caaae94cb61",
        area: "room",
      },
      {
        _id: "69972fd1eedda61fcf380321",
        url: "https://credlab.stays.net/image/69972fd1eedda61fcf380321",
        area: "room",
      },
    ],
    min_stays: 2,
    lastminutetoday: false,
    lastminute24h: false,
    lastminute48h: false,
    city: {
      id: 382,
      name: "Mateus Leme",
      state_id: 27,
      keys_coverage_states: {
        id: 27,
        name: "Minas Gerais",
        countries: { id: 1, name: "Brasil" },
      },
    },
    listing_id_external_long: "69972fc79895bf8d32638296",
    rating: 4.88,
    reviewsCount: 53,
    competitorPlatform: "Airbnb",
  },
  {
    id: "EL02J",
    _id: "69497b80b46a0878a831393b",
    latitude: "-23.5792881",
    longitude: "-45.3391974",
    slug: "caraguatatuba-churrasqueira-e-ar-condicionado",
    title: "Caraguatatuba: Churrasqueira e Ar Condicionado",
    max_guest: 8,
    base_price: "995",
    base_price_with_discount: 696.5,
    rooms: 2,
    beds: 4,
    bathrooms: 2,
    property_type: "Villa/Casa",
    main_img: {
      alt: "Caraguatatuba: Churrasqueira e Ar Condicionado",
      url: "https://d2m6h3qnuwjcmy.cloudfront.net/69497b80b46a0878a831393b_28b8a763_1786420882473.webp",
      url_original: "https://credlab.stays.net/image/69497b97d5cdc4d2aa875506",
    },
    images_meta: [
      {
        _id: "69497b97d5cdc4d2aa875506",
        url: "https://credlab.stays.net/image/69497b97d5cdc4d2aa875506",
        area: "main",
      },
      {
        _id: "69497b83d5cdc4d2aa87546d",
        url: "https://credlab.stays.net/image/69497b83d5cdc4d2aa87546d",
        area: "room",
      },
      {
        _id: "69497b8aeb19d75896d40f2a",
        url: "https://credlab.stays.net/image/69497b8aeb19d75896d40f2a",
        area: "room",
      },
      {
        _id: "69497b94eb19d75896d40f5e",
        url: "https://credlab.stays.net/image/69497b94eb19d75896d40f5e",
        area: "room",
      },
      {
        _id: "69497b98d5cdc4d2aa875511",
        url: "https://credlab.stays.net/image/69497b98d5cdc4d2aa875511",
        area: "room",
      },
      {
        _id: "69497b9ceb19d75896d40f6f",
        url: "https://credlab.stays.net/image/69497b9ceb19d75896d40f6f",
        area: "room",
      },
      {
        _id: "69497b9eddeaacb9b8a7b54c",
        url: "https://credlab.stays.net/image/69497b9eddeaacb9b8a7b54c",
        area: "room",
      },
      {
        _id: "69497ba0938499314a3a1b53",
        url: "https://credlab.stays.net/image/69497ba0938499314a3a1b53",
        area: "room",
      },
    ],
    min_stays: 2,
    lastminutetoday: false,
    lastminute24h: false,
    lastminute48h: false,
    city: {
      id: 262,
      name: "Caraguatatuba",
      state_id: 18,
      keys_coverage_states: {
        id: 18,
        name: "São Paulo",
        countries: { id: 1, name: "Brasil" },
      },
    },
    listing_id_external_long: "69497b80b46a0878a831393b",
    rating: 4.91,
    reviewsCount: 77,
    competitorPlatform: "Booking.com",
  },
  {
    id: "ES01J",
    _id: "6952a8de91584d9b5bd9fc00",
    latitude: "-16.425443",
    longitude: "-39.0887506",
    slug: "refugio-em-caraiva-ar-condicionado-e-piscina",
    title: "Refúgio em Caraíva: Ar Condicionado e Piscina",
    max_guest: 8,
    base_price: "460",
    base_price_with_discount: 345,
    rooms: 3,
    beds: 5,
    bathrooms: 2,
    property_type: "Villa/Casa",
    main_img: {
      alt: "Refúgio em Caraíva: Ar Condicionado e Piscina",
      url: "https://d2m6h3qnuwjcmy.cloudfront.net/6952a8de91584d9b5bd9fc00_1aa1376c_1786420877209.webp",
      url_original: "https://credlab.stays.net/image/698603cb9d5c14812cb42516",
    },
    images_meta: [
      {
        _id: "698603cb9d5c14812cb42516",
        url: "https://credlab.stays.net/image/698603cb9d5c14812cb42516",
        area: "main",
      },
      {
        _id: "6952a8e091584d9b5bd9fc07",
        url: "https://credlab.stays.net/image/6952a8e091584d9b5bd9fc07",
        area: "room",
      },
      {
        _id: "6952a8e5b8b5b1968945c12c",
        url: "https://credlab.stays.net/image/6952a8e5b8b5b1968945c12c",
        area: "room",
      },
      {
        _id: "6952a8f3a09a9b5c85678e58",
        url: "https://credlab.stays.net/image/6952a8f3a09a9b5c85678e58",
        area: "room",
      },
      {
        _id: "6952a8f4b2eef5b2e46e626a",
        url: "https://credlab.stays.net/image/6952a8f4b2eef5b2e46e626a",
        area: "room",
      },
      {
        _id: "6952a8f7d6d49153eadc804e",
        url: "https://credlab.stays.net/image/6952a8f7d6d49153eadc804e",
        area: "room",
      },
      {
        _id: "6952a8f8d6d49153eadc8053",
        url: "https://credlab.stays.net/image/6952a8f8d6d49153eadc8053",
        area: "room",
      },
      {
        _id: "6952a8dfb8b5b1968945c115",
        url: "https://credlab.stays.net/image/6952a8dfb8b5b1968945c115",
        area: "room",
      },
    ],
    min_stays: 2,
    lastminutetoday: false,
    lastminute24h: false,
    lastminute48h: false,
    city: {
      id: 334,
      name: "Porto Seguro",
      state_id: 25,
      keys_coverage_states: {
        id: 25,
        name: "Bahia",
        countries: { id: 1, name: "Brasil" },
      },
    },
    listing_id_external_long: "6952a8de91584d9b5bd9fc00",
    rating: 4.97,
    reviewsCount: 138,
    competitorPlatform: "Airbnb",
  },
  {
    id: "EE01J",
    _id: "69400a096bc8798efdc410fe",
    latitude: "-19.4168015",
    longitude: "-43.3222432",
    slug: "itambe-casa-de-campo-4-quartos-perto-da-cachoeira",
    title: "Itambé: Casa de Campo 4 Quartos perto da Cachoeira",
    max_guest: 8,
    base_price: "1150",
    base_price_with_discount: 805,
    rooms: 4,
    beds: 5,
    bathrooms: 2,
    property_type: "Villa/Casa",
    main_img: {
      alt: "Itambé: Casa de Campo 4 Quartos perto da Cachoeira",
      url: "https://d2m6h3qnuwjcmy.cloudfront.net/69400a096bc8798efdc410fe_9f92aa49_1786420876263.webp",
      url_original: "https://credlab.stays.net/image/69400a1ece1e57562167127d",
    },
    images_meta: [
      {
        _id: "69400a1ece1e57562167127d",
        url: "https://credlab.stays.net/image/69400a1ece1e57562167127d",
        area: "main",
      },
      {
        _id: "69400a0b050e7d7a6f6c4c6a",
        url: "https://credlab.stays.net/image/69400a0b050e7d7a6f6c4c6a",
        area: "room",
      },
      {
        _id: "69400a216bc8798efdc4111e",
        url: "https://credlab.stays.net/image/69400a216bc8798efdc4111e",
        area: "room",
      },
      {
        _id: "69400a27a6fad74bfed87fce",
        url: "https://credlab.stays.net/image/69400a27a6fad74bfed87fce",
        area: "room",
      },
      {
        _id: "69400a22ce1e575621671289",
        url: "https://credlab.stays.net/image/69400a22ce1e575621671289",
        area: "room",
      },
      {
        _id: "69400a236bc8798efdc41122",
        url: "https://credlab.stays.net/image/69400a236bc8798efdc41122",
        area: "room",
      },
      {
        _id: "69400a12d80d5bb42de6a72d",
        url: "https://credlab.stays.net/image/69400a12d80d5bb42de6a72d",
        area: "room",
      },
      {
        _id: "69400a1c3369eb7ed5933c27",
        url: "https://credlab.stays.net/image/69400a1c3369eb7ed5933c27",
        area: "room",
      },
    ],
    min_stays: 2,
    lastminutetoday: false,
    lastminute24h: false,
    lastminute48h: false,
    city: {
      id: 378,
      name: "Itambé do Mato Dentro",
      state_id: 27,
      keys_coverage_states: {
        id: 27,
        name: "Minas Gerais",
        countries: { id: 1, name: "Brasil" },
      },
    },
    listing_id_external_long: "69400a096bc8798efdc410fe",
    rating: 4.94,
    reviewsCount: 91,
    competitorPlatform: "Trivago",
  },
  {
    id: "DZ01J",
    _id: "6939cd2a75578c97460ba4f7",
    latitude: "-2.8810127",
    longitude: "-41.6653346",
    slug: "luis-correia-casa-de-4-quartos-com-churrasqueira",
    title: "Luis Correia - Casa de 4 Quartos com Churrasqueira",
    max_guest: 12,
    base_price: "748",
    base_price_with_discount: 561,
    rooms: 4,
    beds: 8,
    bathrooms: 3,
    property_type: "Villa/Casa",
    main_img: {
      alt: "Luis Correia - Casa de 4 Quartos com Churrasqueira",
      url: "https://d2m6h3qnuwjcmy.cloudfront.net/6939cd2a75578c97460ba4f7_214b6543_1786420875433.webp",
      url_original: "https://credlab.stays.net/image/6939cd50cdb75f5bbc3c766f",
    },
    images_meta: [
      {
        _id: "6939cd50cdb75f5bbc3c766f",
        url: "https://credlab.stays.net/image/6939cd50cdb75f5bbc3c766f",
        area: "main",
      },
      {
        _id: "6939cd2f75578c97460ba516",
        url: "https://credlab.stays.net/image/6939cd2f75578c97460ba516",
        area: "room",
      },
      {
        _id: "6939cd347366f1a074d9c40f",
        url: "https://credlab.stays.net/image/6939cd347366f1a074d9c40f",
        area: "room",
      },
      {
        _id: "6939cd38d622d18a02ab26c8",
        url: "https://credlab.stays.net/image/6939cd38d622d18a02ab26c8",
        area: "room",
      },
      {
        _id: "6939cd421bb09c7a7791bd03",
        url: "https://credlab.stays.net/image/6939cd421bb09c7a7791bd03",
        area: "room",
      },
      {
        _id: "6939cd48b89a326e6a9c36ca",
        url: "https://credlab.stays.net/image/6939cd48b89a326e6a9c36ca",
        area: "room",
      },
      {
        _id: "6939cd492497803cadb1f29e",
        url: "https://credlab.stays.net/image/6939cd492497803cadb1f29e",
        area: "room",
      },
      {
        _id: "6939cd307366f1a074d9c3f4",
        url: "https://credlab.stays.net/image/6939cd307366f1a074d9c3f4",
        area: "room",
      },
    ],
    min_stays: 2,
    lastminutetoday: false,
    lastminute24h: false,
    lastminute48h: false,
    city: {
      id: 371,
      name: "Luís Correia",
      state_id: 39,
      keys_coverage_states: {
        id: 39,
        name: "Piauí",
        countries: { id: 1, name: "Brasil" },
      },
    },
    listing_id_external_long: "6939cd2a75578c97460ba4f7",
    rating: 4.87,
    reviewsCount: 46,
    competitorPlatform: "Booking.com",
  },
  {
    id: "EB01J",
    _id: "693c5237226c0b186ee41a87",
    latitude: "-23.7605299",
    longitude: "-45.7687784",
    slug: "barra-do-una-excelente-casa-com-piscina-e-sauna",
    title: "Barra do Una Excelente Casa com Piscina, e Sauna",
    max_guest: 8,
    base_price: "1850",
    base_price_with_discount: 1295,
    rooms: 4,
    beds: 6,
    bathrooms: 4,
    property_type: "Casa de Alto Padrão",
    main_img: {
      alt: "Barra do Una Excelente Casa com Piscina, e Sauna",
      url: "https://d2m6h3qnuwjcmy.cloudfront.net/693c5237226c0b186ee41a87_65287643_1786420874594.webp",
      url_original: "https://credlab.stays.net/image/693c53a1f076ddccfa03f937",
    },
    images_meta: [
      {
        _id: "693c53a1f076ddccfa03f937",
        url: "https://credlab.stays.net/image/693c53a1f076ddccfa03f937",
        area: "main",
      },
      {
        _id: "693c5392cc82212f82794634",
        url: "https://credlab.stays.net/image/693c5392cc82212f82794634",
        area: "room",
      },
      {
        _id: "693c53973897501c280c91ed",
        url: "https://credlab.stays.net/image/693c53973897501c280c91ed",
        area: "room",
      },
      {
        _id: "693c53c0d3adbbf3f6759526",
        url: "https://credlab.stays.net/image/693c53c0d3adbbf3f6759526",
        area: "room",
      },
      {
        _id: "693c53bd62d9cc73d8c06678",
        url: "https://credlab.stays.net/image/693c53bd62d9cc73d8c06678",
        area: "room",
      },
      {
        _id: "693c53aa3897501c280c9267",
        url: "https://credlab.stays.net/image/693c53aa3897501c280c9267",
        area: "room",
      },
      {
        _id: "693c539d3897501c280c9213",
        url: "https://credlab.stays.net/image/693c539d3897501c280c9213",
        area: "room",
      },
      {
        _id: "693c53aff076ddccfa03f965",
        url: "https://credlab.stays.net/image/693c53aff076ddccfa03f965",
        area: "room",
      },
    ],
    min_stays: 2,
    lastminutetoday: false,
    lastminute24h: false,
    lastminute48h: false,
    city: {
      id: 133,
      name: "São Sebastião",
      state_id: 18,
      keys_coverage_states: {
        id: 18,
        name: "São Paulo",
        countries: { id: 1, name: "Brasil" },
      },
    },
    listing_id_external_long: "693c5237226c0b186ee41a87",
    rating: 4.99,
    reviewsCount: 164,
    competitorPlatform: "Airbnb",
  },
  {
    id: "EA02J",
    _id: "693ad0b09f916493ffbb4724",
    latitude: "-16.0849726",
    longitude: "-48.5077929",
    slug: "alexania-casa-beira-do-lago-piscina-churrasqueira",
    title: "Alexânia Casa Beira do Lago Piscina Churrasqueira",
    max_guest: 16,
    base_price: "2300",
    base_price_with_discount: 1725,
    rooms: 4,
    beds: 12,
    bathrooms: 5,
    property_type: "Mansão Beira Lago",
    main_img: {
      alt: "Alexania Casa Beira do Lago Piscina Churrasqueira",
      url: "https://d2m6h3qnuwjcmy.cloudfront.net/693ad0b09f916493ffbb4724_f07db115_1786420873675.webp",
      url_original: "https://credlab.stays.net/image/693ad0b247d2f1a098b25723",
    },
    images_meta: [
      {
        _id: "693ad0b247d2f1a098b25723",
        url: "https://credlab.stays.net/image/693ad0b247d2f1a098b25723",
        area: "main",
      },
      {
        _id: "693ad0b17e71178aedb3e557",
        url: "https://credlab.stays.net/image/693ad0b17e71178aedb3e557",
        area: "room",
      },
      {
        _id: "69a1d333c7595214bcda5b2f",
        url: "https://credlab.stays.net/image/69a1d333c7595214bcda5b2f",
        area: "room",
      },
      {
        _id: "693ad0b385de081f7a0146b9",
        url: "https://credlab.stays.net/image/693ad0b385de081f7a0146b9",
        area: "room",
      },
      {
        _id: "693ad0ba12342b974fbe0739",
        url: "https://credlab.stays.net/image/693ad0ba12342b974fbe0739",
        area: "room",
      },
      {
        _id: "693ad0b714ce4358b7f98d91",
        url: "https://credlab.stays.net/image/693ad0b714ce4358b7f98d91",
        area: "room",
      },
      {
        _id: "693ad0bb14ce4358b7f98d9e",
        url: "https://credlab.stays.net/image/693ad0bb14ce4358b7f98d9e",
        area: "room",
      },
      {
        _id: "693ad0bc0e0ef5ee9e727b14",
        url: "https://credlab.stays.net/image/693ad0bc0e0ef5ee9e727b14",
        area: "room",
      },
    ],
    min_stays: 2,
    lastminutetoday: false,
    lastminute24h: false,
    lastminute48h: false,
    city: {
      id: 377,
      name: "Alexânia",
      state_id: 31,
      keys_coverage_states: {
        id: 31,
        name: "Goiás",
        countries: { id: 1, name: "Brasil" },
      },
    },
    listing_id_external_long: "693ad0b09f916493ffbb4724",
    rating: 4.96,
    reviewsCount: 104,
    competitorPlatform: "Booking.com",
  },
  {
    id: "DM01J",
    _id: "692835dcde66fb12bf3c5606",
    latitude: "-27.3757975",
    longitude: "-51.0896107",
    slug: "seu-chale-serra-catarinense-wi-fi-e-muito-espaco",
    title: "Seu Chalé Serra Catarinense: Wi-Fi e muito espaço",
    max_guest: 2,
    base_price: "450",
    base_price_with_discount: 315,
    rooms: 1,
    beds: 1,
    bathrooms: 1,
    property_type: "Chalé",
    main_img: {
      alt: "Seu Chalé Serra Catarinense : Wi-Fi e muito espaço",
      url: "https://d2m6h3qnuwjcmy.cloudfront.net/692835dcde66fb12bf3c5606_adec5eea_1786420871922.webp",
      url_original: "https://credlab.stays.net/image/692835e8fe3afb21f24b231a",
    },
    images_meta: [
      {
        _id: "692835e8fe3afb21f24b231a",
        url: "https://credlab.stays.net/image/692835e8fe3afb21f24b231a",
        area: "main",
      },
      {
        _id: "692835dede66fb12bf3c5623",
        url: "https://credlab.stays.net/image/692835dede66fb12bf3c5623",
        area: "room",
      },
      {
        _id: "692835df81fbf5e0ab021cb9",
        url: "https://credlab.stays.net/image/692835df81fbf5e0ab021cb9",
        area: "room",
      },
      {
        _id: "692835e2019ec166be1e6c6c",
        url: "https://credlab.stays.net/image/692835e2019ec166be1e6c6c",
        area: "room",
      },
      {
        _id: "692835e8fe3afb21f24b2320",
        url: "https://credlab.stays.net/image/692835e8fe3afb21f24b2320",
        area: "room",
      },
      {
        _id: "692835eb019ec166be1e6c86",
        url: "https://credlab.stays.net/image/692835eb019ec166be1e6c86",
        area: "room",
      },
      {
        _id: "692835e4fe3afb21f24b22dd",
        url: "https://credlab.stays.net/image/692835e4fe3afb21f24b22dd",
        area: "room",
      },
      {
        _id: "692835e4c3e105870463eb74",
        url: "https://credlab.stays.net/image/692835e4c3e105870463eb74",
        area: "room",
      },
    ],
    min_stays: 2,
    lastminutetoday: false,
    lastminute24h: false,
    lastminute48h: false,
    city: {
      id: 374,
      name: "Correia Pinto",
      state_id: 20,
      keys_coverage_states: {
        id: 20,
        name: "Santa Catarina",
        countries: { id: 1, name: "Brasil" },
      },
    },
    listing_id_external_long: "692835dcde66fb12bf3c5606",
    rating: 4.95,
    reviewsCount: 88,
    competitorPlatform: "Airbnb",
  },
  {
    id: "DN01J",
    _id: "6929d8f3fac5542619ecf5c0",
    latitude: "-22.990835",
    longitude: "-44.2455777",
    slug: "angra-dos-reis-casa-p-8-piscina-churrasqueira",
    title: "Angra dos Reis Casa p/ 8 Piscina Churrasqueira",
    max_guest: 8,
    base_price: "490",
    base_price_with_discount: 343,
    rooms: 3,
    beds: 5,
    bathrooms: 3,
    property_type: "Villa/Casa",
    main_img: {
      alt: "Casa para 8 Pessoas com Piscina e Churrasqueira",
      url: "https://d2m6h3qnuwjcmy.cloudfront.net/6929d8f3fac5542619ecf5c0_fa9945b6_1786420870586.webp",
      url_original: "https://credlab.stays.net/image/692dca376c23df0877b5baf8",
    },
    images_meta: [
      {
        _id: "692dca376c23df0877b5baf8",
        url: "https://credlab.stays.net/image/692dca376c23df0877b5baf8",
        area: "main",
      },
      {
        _id: "692dca3357068cb2b338e66c",
        url: "https://credlab.stays.net/image/692dca3357068cb2b338e66c",
        area: "room",
      },
      {
        _id: "692dca3857068cb2b338e6a3",
        url: "https://credlab.stays.net/image/692dca3857068cb2b338e6a3",
        area: "room",
      },
      {
        _id: "692dca3957068cb2b338e6b5",
        url: "https://credlab.stays.net/image/692dca3957068cb2b338e6b5",
        area: "room",
      },
      {
        _id: "692dca3a57068cb2b338e6c3",
        url: "https://credlab.stays.net/image/692dca3a57068cb2b338e6c3",
        area: "room",
      },
      {
        _id: "692dca3357068cb2b338e67f",
        url: "https://credlab.stays.net/image/692dca3357068cb2b338e67f",
        area: "room",
      },
      {
        _id: "692dca345cc864f65f9073ad",
        url: "https://credlab.stays.net/image/692dca345cc864f65f9073ad",
        area: "room",
      },
      {
        _id: "692dca2d6c23df0877b5ba75",
        url: "https://credlab.stays.net/image/692dca2d6c23df0877b5ba75",
        area: "room",
      },
    ],
    min_stays: 2,
    lastminutetoday: false,
    lastminute24h: false,
    lastminute48h: false,
    city: {
      id: 181,
      name: "Angra dos Reis",
      state_id: 17,
      keys_coverage_states: {
        id: 17,
        name: "Rio de Janeiro",
        countries: { id: 1, name: "Brasil" },
      },
    },
    listing_id_external_long: "6929d8f3fac5542619ecf5c0",
    rating: 4.93,
    reviewsCount: 119,
    competitorPlatform: "Trivago",
  },
  {
    id: "DQ02J",
    _id: "692da28c1e8f097861d49d34",
    latitude: "-25.4703313",
    longitude: "-54.5956839",
    slug: "refugio-foz-do-iguacu-ar-condicionado-e-garagem",
    title: "Refúgio Foz do Iguaçu: Ar Condicionado e Garagem",
    max_guest: 4,
    base_price: "368",
    base_price_with_discount: 276,
    rooms: 2,
    beds: 2,
    bathrooms: 1,
    property_type: "Villa/Casa",
    main_img: {
      alt: "Refúgio Foz do Iguaçu: Ar Condicionado e Garagem",
      url: "https://d2m6h3qnuwjcmy.cloudfront.net/692da28c1e8f097861d49d34_67888de5_1786420869792.webp",
      url_original: "https://credlab.stays.net/image/692da28f37d99b618d3bfe89",
    },
    images_meta: [
      {
        _id: "692da28f37d99b618d3bfe89",
        url: "https://credlab.stays.net/image/692da28f37d99b618d3bfe89",
        area: "main",
      },
      {
        _id: "692da28e37d99b618d3bfe80",
        url: "https://credlab.stays.net/image/692da28e37d99b618d3bfe80",
        area: "room",
      },
      {
        _id: "692da290e3d87173a5424532",
        url: "https://credlab.stays.net/image/692da290e3d87173a5424532",
        area: "room",
      },
      {
        _id: "692da29157068cb2b33567a0",
        url: "https://credlab.stays.net/image/692da29157068cb2b33567a0",
        area: "room",
      },
      {
        _id: "692da292e3d87173a5424536",
        url: "https://credlab.stays.net/image/692da292e3d87173a5424536",
        area: "room",
      },
      {
        _id: "692da2981e8f097861d49d6e",
        url: "https://credlab.stays.net/image/692da2981e8f097861d49d6e",
        area: "room",
      },
      {
        _id: "692da28d1e8f097861d49d3b",
        url: "https://credlab.stays.net/image/692da28d1e8f097861d49d3b",
        area: "room",
      },
      {
        _id: "692da29257068cb2b33567ad",
        url: "https://credlab.stays.net/image/692da29257068cb2b33567ad",
        area: "room",
      },
    ],
    min_stays: 2,
    lastminutetoday: false,
    lastminute24h: false,
    lastminute48h: false,
    city: {
      id: 375,
      name: "Foz do Iguaçu",
      state_id: 28,
      keys_coverage_states: {
        id: 28,
        name: "Paraná",
        countries: { id: 1, name: "Brasil" },
      },
    },
    listing_id_external_long: "692da28c1e8f097861d49d34",
    rating: 4.9,
    reviewsCount: 62,
    competitorPlatform: "Booking.com",
  },
  {
    id: "DQ01J",
    _id: "692d90471e8f097861d3729d",
    latitude: "-17.7304798",
    longitude: "-48.6324813",
    slug: "caldas-novas-apto-resort-c-7-piscinas-7-pessoas",
    title: "Caldas Novas: Apto Resort c/ 7 Piscinas 7 Pessoas",
    max_guest: 7,
    base_price: "518",
    base_price_with_discount: 388.5,
    rooms: 2,
    beds: 4,
    bathrooms: 2,
    property_type: "Apartamento Resort",
    main_img: {
      alt: "Caldas Novas: Apto Resort c/ 7 Piscinas 7 Pessoas",
      url: "https://d2m6h3qnuwjcmy.cloudfront.net/692d90471e8f097861d3729d_db013a09_1786420868924.webp",
      url_original: "https://credlab.stays.net/image/692d905ae3bd2aecfde5401f",
    },
    images_meta: [
      {
        _id: "692d905ae3bd2aecfde5401f",
        url: "https://credlab.stays.net/image/692d905ae3bd2aecfde5401f",
        area: "main",
      },
      {
        _id: "692d904a1e8f097861d37319",
        url: "https://credlab.stays.net/image/692d904a1e8f097861d37319",
        area: "room",
      },
      {
        _id: "692d904f1e8f097861d3732f",
        url: "https://credlab.stays.net/image/692d904f1e8f097861d3732f",
        area: "room",
      },
      {
        _id: "692d90531e8f097861d37417",
        url: "https://credlab.stays.net/image/692d90531e8f097861d37417",
        area: "room",
      },
      {
        _id: "692d90561e8f097861d37426",
        url: "https://credlab.stays.net/image/692d90561e8f097861d37426",
        area: "room",
      },
      {
        _id: "692d904a1e8f097861d372db",
        url: "https://credlab.stays.net/image/692d904a1e8f097861d372db",
        area: "room",
      },
      {
        _id: "692d904d7ee4d14a1deaba85",
        url: "https://credlab.stays.net/image/692d904d7ee4d14a1deaba85",
        area: "room",
      },
      {
        _id: "692d9052e3bd2aecfde53f5e",
        url: "https://credlab.stays.net/image/692d9052e3bd2aecfde53f5e",
        area: "room",
      },
    ],
    min_stays: 2,
    lastminutetoday: false,
    lastminute24h: false,
    lastminute48h: false,
    city: {
      id: 268,
      name: "Caldas Novas",
      state_id: 31,
      keys_coverage_states: {
        id: 31,
        name: "Goiás",
        countries: { id: 1, name: "Brasil" },
      },
    },
    listing_id_external_long: "692d90471e8f097861d3729d",
    rating: 4.88,
    reviewsCount: 71,
    competitorPlatform: "Airbnb",
  },
  {
    id: "DM02J",
    _id: "692846e510e17a1a38f6e859",
    latitude: "-20.5354496",
    longitude: "-45.5856452",
    slug: "refugio-em-formiga-piscina-e-churrasqueira",
    title: "Refúgio em Formiga: Piscina e Churrasqueira",
    max_guest: 10,
    base_price: "1035",
    base_price_with_discount: 776.25,
    rooms: 2,
    beds: 8,
    bathrooms: 3,
    property_type: "Rancho / Sítio",
    main_img: {
      alt: "Refúgio em Formiga: Piscina e Churrasqueira",
      url: "https://d2m6h3qnuwjcmy.cloudfront.net/692846e510e17a1a38f6e859_98d3b192_1786420868106.webp",
      url_original: "https://credlab.stays.net/image/692846f30d31c39e9e98a0ea",
    },
    images_meta: [
      {
        _id: "692846f30d31c39e9e98a0ea",
        url: "https://credlab.stays.net/image/692846f30d31c39e9e98a0ea",
        area: "main",
      },
      {
        _id: "692846e7fe5a6f18a3fd1aa4",
        url: "https://credlab.stays.net/image/692846e7fe5a6f18a3fd1aa4",
        area: "room",
      },
      {
        _id: "692846e8112fcf38f3adffd1",
        url: "https://credlab.stays.net/image/692846e8112fcf38f3adffd1",
        area: "room",
      },
      {
        _id: "692846f6b2c4147b000999ff",
        url: "https://credlab.stays.net/image/692846f6b2c4147b000999ff",
        area: "room",
      },
      {
        _id: "692846fc10e17a1a38f6e898",
        url: "https://credlab.stays.net/image/692846fc10e17a1a38f6e898",
        area: "room",
      },
      {
        _id: "692846fd10e17a1a38f6e89d",
        url: "https://credlab.stays.net/image/692846fd10e17a1a38f6e89d",
        area: "room",
      },
      {
        _id: "692846f7b180fb8fe9b7b361",
        url: "https://credlab.stays.net/image/692846f7b180fb8fe9b7b361",
        area: "room",
      },
      {
        _id: "692846f8b180fb8fe9b7b365",
        url: "https://credlab.stays.net/image/692846f8b180fb8fe9b7b365",
        area: "room",
      },
    ],
    min_stays: 2,
    lastminutetoday: false,
    lastminute24h: false,
    lastminute48h: false,
    city: {
      id: 376,
      name: "Formiga",
      state_id: 27,
      keys_coverage_states: {
        id: 27,
        name: "Minas Gerais",
        countries: { id: 1, name: "Brasil" },
      },
    },
    listing_id_external_long: "692846e510e17a1a38f6e859",
    rating: 4.92,
    reviewsCount: 65,
    competitorPlatform: "Trivago",
  },
  {
    id: "DE02J",
    _id: "691ddd5bdf13ce96ab244785",
    latitude: "-23.6394762",
    longitude: "-47.2748758",
    slug: "chacara-ate-20-pessoas-piscina-e-churrasqueira",
    title: "Chácara até 20 pessoas: Piscina e Churrasqueira",
    max_guest: 20,
    base_price: "966",
    base_price_with_discount: 676.2,
    rooms: 3,
    beds: 14,
    bathrooms: 2,
    property_type: "Chácara",
    main_img: {
      alt: "Chácara até 20 pessoas: Piscina e Churrasqueira.",
      url: "https://d2m6h3qnuwjcmy.cloudfront.net/691ddd5bdf13ce96ab244785_a2f0fbf7_1786420867324.webp",
      url_original: "https://credlab.stays.net/image/691ddd7e125ec339cdb2dbe3",
    },
    images_meta: [
      {
        _id: "691ddd7e125ec339cdb2dbe3",
        url: "https://credlab.stays.net/image/691ddd7e125ec339cdb2dbe3",
        area: "main",
      },
      {
        _id: "691ddd6edf13ce96ab244810",
        url: "https://credlab.stays.net/image/691ddd6edf13ce96ab244810",
        area: "room",
      },
      {
        _id: "691ddd71581388dcf76b3158",
        url: "https://credlab.stays.net/image/691ddd71581388dcf76b3158",
        area: "room",
      },
      {
        _id: "691ddd79125ec339cdb2c41e",
        url: "https://credlab.stays.net/image/691ddd79125ec339cdb2c41e",
        area: "room",
      },
      {
        _id: "691ddd7bb6a9b412534e6619",
        url: "https://credlab.stays.net/image/691ddd7bb6a9b412534e6619",
        area: "room",
      },
      {
        _id: "691ddd6cdf13ce96ab2447e6",
        url: "https://credlab.stays.net/image/691ddd6cdf13ce96ab2447e6",
        area: "room",
      },
      {
        _id: "691ddd73581388dcf76b3165",
        url: "https://credlab.stays.net/image/691ddd73581388dcf76b3165",
        area: "room",
      },
      {
        _id: "691ddd76df13ce96ab244843",
        url: "https://credlab.stays.net/image/691ddd76df13ce96ab244843",
        area: "room",
      },
    ],
    min_stays: 2,
    lastminutetoday: false,
    lastminute24h: false,
    lastminute48h: false,
    city: {
      id: 184,
      name: "Ibiúna",
      state_id: 18,
      keys_coverage_states: {
        id: 18,
        name: "São Paulo",
        countries: { id: 1, name: "Brasil" },
      },
    },
    listing_id_external_long: "691ddd5bdf13ce96ab244785",
    rating: 4.93,
    reviewsCount: 88,
    competitorPlatform: "Booking.com",
  },
  {
    id: "CQ01J",
    _id: "690ba40e93f41b3921938641",
    latitude: "-12.725802",
    longitude: "-38.327601",
    slug: "camacari-casa-2-quartos-piscina-e-churrasqueira",
    title: "Camaçari casa 2 quartos, Piscina e Churrasqueira",
    max_guest: 6,
    base_price: "518",
    base_price_with_discount: 388.5,
    rooms: 2,
    beds: 5,
    bathrooms: 2,
    property_type: "Villa/Casa",
    main_img: {
      alt: "Camaçari casa 2 quartos, Piscina e Churrasqueira",
      url: "https://d2m6h3qnuwjcmy.cloudfront.net/690ba40e93f41b3921938641_027632a1_1786420864494.webp",
      url_original: "https://credlab.stays.net/image/6970e02544eccf03c00e3c60",
    },
    images_meta: [
      {
        _id: "6970e02544eccf03c00e3c60",
        url: "https://credlab.stays.net/image/6970e02544eccf03c00e3c60",
        area: "main",
      },
      {
        _id: "690ba40fa4f90321aefaf519",
        url: "https://credlab.stays.net/image/690ba40fa4f90321aefaf519",
        area: "room",
      },
      {
        _id: "690ba41eedc0abc596b81dbd",
        url: "https://credlab.stays.net/image/690ba41eedc0abc596b81dbd",
        area: "room",
      },
      {
        _id: "690ba424edc0abc596b81e0b",
        url: "https://credlab.stays.net/image/690ba424edc0abc596b81e0b",
        area: "room",
      },
      {
        _id: "690ba426edc0abc596b81e24",
        url: "https://credlab.stays.net/image/690ba426edc0abc596b81e24",
        area: "room",
      },
      {
        _id: "690ba418a4f90321aefaf56b",
        url: "https://credlab.stays.net/image/690ba418a4f90321aefaf56b",
        area: "room",
      },
      {
        _id: "690ba42172b6fc9b59b08e33",
        url: "https://credlab.stays.net/image/690ba42172b6fc9b59b08e33",
        area: "room",
      },
      {
        _id: "690ba425a4f90321aefaf5a7",
        url: "https://credlab.stays.net/image/690ba425a4f90321aefaf5a7",
        area: "room",
      },
    ],
    min_stays: 2,
    lastminutetoday: false,
    lastminute24h: false,
    lastminute48h: false,
    city: {
      id: 310,
      name: "Camaçari",
      state_id: 25,
      keys_coverage_states: {
        id: 25,
        name: "Bahia",
        countries: { id: 1, name: "Brasil" },
      },
    },
    listing_id_external_long: "690ba40e93f41b3921938641",
    rating: 4.89,
    reviewsCount: 73,
    competitorPlatform: "Airbnb",
  },
]

export const catalogSections: RoomSection[] = [
  {
    id: "event-sp",
    title: "SP - São Paulo",
    isEvent: true,
    eventBadge: "BGS +1",
    upcomingEvents: [
      {
        id: "bgs-2026",
        label: "Brasil Game Show",
        shortLabel: "BGS",
        dateFrom: "8 de out.",
        dateTo: "12 de out.",
        daysUntil: 28,
        venue: "Expo Center Norte — São Paulo",
      },
      {
        id: "f1-gp-sao-paulo-2026",
        label: "GP de São Paulo — Fórmula 1",
        shortLabel: "F1 Interlagos",
        dateFrom: "8 de nov.",
        dateTo: "10 de nov.",
        daysUntil: 57,
        venue: "Autódromo José Carlos Pace (Interlagos) — São Paulo",
      },
    ],
    rooms: rawApiRooms.filter(
      (r) =>
        r.city.keys_coverage_states.id === 18 ||
        ["DE02J", "SP01J", "ML01J", "CC01J"].includes(r.id)
    ),
  },
  {
    id: "event-rj",
    title: "RJ - Rio de Janeiro",
    isEvent: true,
    eventBadge: "Rock in Rio",
    upcomingEvents: [
      {
        id: "rock-in-rio-2026",
        label: "Rock in Rio",
        shortLabel: "Rock in Rio",
        dateFrom: "4 de set.",
        dateTo: "13 de set.",
        daysUntil: 0,
        venue: "Cidade do Rock / Parque Olímpico — Rio de Janeiro",
      },
    ],
    rooms: rawApiRooms.filter(
      (r) =>
        r.city.keys_coverage_states.id === 17 ||
        ["GY01J", "AR01J"].includes(r.id)
    ),
  },
  {
    id: "event-sc-blumenau",
    title: "SC - Blumenau",
    isEvent: true,
    eventBadge: "Oktoberfest",
    upcomingEvents: [
      {
        id: "oktoberfest-blumenau-2026",
        label: "Oktoberfest Blumenau",
        shortLabel: "Oktoberfest",
        dateFrom: "7 de out.",
        dateTo: "25 de out.",
        daysUntil: 27,
        venue: "Parque Vila Germânica — Blumenau",
      },
    ],
    rooms: rawApiRooms.filter(
      (r) =>
        r.city.keys_coverage_states.id === 20 ||
        ["NG02J", "NB01J", "MK01J", "CP01J"].includes(r.id)
    ),
  },
  {
    id: "last-minute",
    title: "Reservas Last Minute",
    subtitle: "Até 60% OFF para viagens imediatas (Hoje, Amanhã e Depois)",
    rooms: rawApiRooms.filter(
      (r) =>
        r.lastminutetoday ||
        r.lastminute24h ||
        r.id === "NG02J" ||
        r.id === "NB01J"
    ),
  },
  {
    id: "sc",
    title: "SC - Santa Catarina",
    subtitle: "Florianópolis, Bombinhas, São Francisco do Sul e Serra",
    rooms: rawApiRooms.filter((r) => r.city.keys_coverage_states.id === 20),
  },
  {
    id: "sp",
    title: "SP - São Paulo",
    subtitle: "Litoral Norte, Serra da Mantiqueira e Chácaras no Interior",
    rooms: rawApiRooms.filter((r) => r.city.keys_coverage_states.id === 18),
  },
  {
    id: "rj",
    title: "RJ - Rio de Janeiro",
    subtitle: "Angra dos Reis e Litoral Fluminense",
    rooms: rawApiRooms.filter((r) => r.city.keys_coverage_states.id === 17),
  },
  {
    id: "mg-go",
    title: "MG & GO - Minas Gerais e Goiás",
    subtitle: "Caldas Novas, Alexânia, Formiga, Mateus Leme e Itambé",
    rooms: rawApiRooms.filter((r) =>
      [27, 31].includes(r.city.keys_coverage_states.id)
    ),
  },
  {
    id: "nordeste",
    title: "Nordeste & Outros Destinos",
    subtitle: "Bahia, Caraíva, Camaçari, Piauí e Paraná",
    rooms: rawApiRooms.filter((r) =>
      [25, 39, 28].includes(r.city.keys_coverage_states.id)
    ),
  },
  {
    id: "all",
    title: "Todas as acomodações",
    subtitle: "Explore todo o catálogo exclusivo da ClubKey no Brasil",
    rooms: rawApiRooms,
  },
]
