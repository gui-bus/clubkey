import { rawApiRooms } from "./mockRooms"

export interface RoomDetailPhoto {
  _id: string
  url: string
  area: string
}

export interface RoomDetailPriceBreakdown {
  lastMinute?: {
    days: number
    basePrice: string
    basePricePerNight: string
    discount: number
    discountedPrice: string
    discountedPricePerNight: string
  }
  regular?: {
    days: number
    basePrice: string
    basePricePerNight: string
    discountedPrice: string
    discountedPricePerNight: string
  }
  othersPlataforms?: {
    airbnbTotal: string
    bookingTotal: string
    trivagoTotal?: string
  }
  totalDays: number
}

export interface RoomDetailData {
  id: string
  _id: string
  latitude: string
  longitude: string
  slug: string
  title: string
  max_guest: number
  base_price: string
  rooms: number
  beds: number
  bathrooms: number
  property_type: string
  property_type_meta: string
  property_subtype: string
  main_img: {
    alt: string
    url: string
    url_original: string
  }
  images_meta: RoomDetailPhoto[]
  property_meta: {
    _msdesc: Record<string, string>
    address: {
      zip: string
      city: string
      state: string
      region: string
      street: string
      stateCode: string
      additional: string
      countryCode: string
      streetNumber: string
    }
    _msnotes?: Record<string, string>
    _msspace?: Record<string, string>
    _msaccess?: Record<string, string>
    _mssummary?: Record<string, string>
    _mstransit?: Record<string, string>
    _mshouserules: Record<string, string>
    _msinteraction?: Record<string, string>
    _msneighborhood_overview?: Record<string, string>
  }
  policy: {
    _id: string
    _t_meta: {
      internalName: string
      _mstitle: Record<string, string>
      _msdesc: Record<string, string>
    }
    checkInTime: string
    checkInTimeEnd: string
    checkOutTime: string
  }
  price: {
    total: string
    currency: string
    fees: Array<{
      _id: string
      internalName: string
      amount: number
      type: string
    }>
    breakdown: RoomDetailPriceBreakdown
  }
  otaChannels: Array<{
    name: string
    hostId?: string
    listingId?: string
  }>
  keys_hosts: {
    name: string
    description: string | null
    url_image: string | null
  }
  city: {
    id: number
    name: string
    state_id: number
    keys_coverage_states: {
      id: number
      name: string
      countries: {
        id: number
        name: string
      }
    }
  }
  amenitiesList: Array<{
    id: string
    name: string
    icon: string
    category: string
  }>
}

export const defaultRoomDetail: RoomDetailData = {
  id: "NG02J",
  _id: "6a774f4ac75dd693e2a3833c",
  latitude: "-27.424288",
  longitude: "-48.40342108",
  slug: "ape-c-piscina-ingleses-2-suites-300m-do-mar",
  title: "Apê c/ piscina Ingleses | 2 Suítes 300m do mar",
  max_guest: 5,
  base_price: "473",
  rooms: 2,
  beds: 3,
  bathrooms: 2,
  property_type: "Apartamento",
  property_type_meta: "Apartamento",
  property_subtype: "entire_home",
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
    {
      _id: "6aa16ebb344a6028f94d801b",
      url: "https://sra.stays.com.br/image/6aa16ebb344a6028f94d801b",
      area: "room",
    },
    {
      _id: "6aa16ebbeb6ba7f7b57ca7ce",
      url: "https://sra.stays.com.br/image/6aa16ebbeb6ba7f7b57ca7ce",
      area: "room",
    },
    {
      _id: "6aa16ebb246eef8e41145e7b",
      url: "https://sra.stays.com.br/image/6aa16ebb246eef8e41145e7b",
      area: "room",
    },
    {
      _id: "6aa16ebb05d7a47dec41d40f",
      url: "https://sra.stays.com.br/image/6aa16ebb05d7a47dec41d40f",
      area: "room",
    },
    {
      _id: "6aa16ebbffb5b9083b049b94",
      url: "https://sra.stays.com.br/image/6aa16ebbffb5b9083b049b94",
      area: "room",
    },
    {
      _id: "6aa16ebb67f8af2be29a3673",
      url: "https://sra.stays.com.br/image/6aa16ebb67f8af2be29a3673",
      area: "room",
    },
    {
      _id: "6aa16ebb05d7a47dec41d410",
      url: "https://sra.stays.com.br/image/6aa16ebb05d7a47dec41d410",
      area: "room",
    },
    {
      _id: "6aa16ebc7692666ab0bb86ff",
      url: "https://sra.stays.com.br/image/6aa16ebc7692666ab0bb86ff",
      area: "room",
    },
    {
      _id: "6aa16ebc344a6028f94d801f",
      url: "https://sra.stays.com.br/image/6aa16ebc344a6028f94d801f",
      area: "room",
    },
    {
      _id: "6aa16ebc5cd1e844ae428f5e",
      url: "https://sra.stays.com.br/image/6aa16ebc5cd1e844ae428f5e",
      area: "room",
    },
    {
      _id: "6aa16ebcffb5b9083b049b95",
      url: "https://sra.stays.com.br/image/6aa16ebcffb5b9083b049b95",
      area: "room",
    },
    {
      _id: "6aa170218a195968c5219574",
      url: "https://sra.stays.com.br/image/6aa170218a195968c5219574",
      area: "room",
    },
    {
      _id: "6aa16ebdb30cbfcde64a85e7",
      url: "https://sra.stays.com.br/image/6aa16ebdb30cbfcde64a85e7",
      area: "room",
    },
    {
      _id: "6aa16ebc8c448feae76b3832",
      url: "https://sra.stays.com.br/image/6aa16ebc8c448feae76b3832",
      area: "room",
    },
  ],
  property_meta: {
    _msdesc: {
      pt_BR:
        "Hospede-se neste apartamento encantador em Ingleses Norte, ideal para seu lazer. O imóvel dispõe de duas suítes, varanda gourmet e vaga de garagem coberta. Oferecemos home box exclusivo com kit praia completo: carrinho, cadeiras e prancha. Após o mar, no rooftop do prédio, usufrua da piscina com vista mar e um lindo pôr do sol. Com ambientes integrados e decoração acolhedora, você encontrará o refúgio perfeito para suas férias na ilha, unindo descanso e utilidade.\n\nPara assegurar uma permanência fluida e sem preocupações, disponibilizamos uma cozinha totalmente equipada, permitindo autonomia absoluta no preparo de suas refeições. A unidade destaca-se pela funcionalidade de seus espaços, sendo excelente tanto para casais, famílias, quanto para pequenos grupos que priorizam bem-estar.\n\nA arquitetura interna privilegia a circulação de ar e a luminosidade, criando uma atmosfera revigorante em todos os cômodos. A sala de estar convida ao relaxamento e conforto. O layout inteligente conecta harmoniosamente as áreas sociais, transformando a moradia em um santuário de paz. Possui elevador especial para cadeirantes.",
    },
    address: {
      zip: "88058-578",
      city: "Florianópolis",
      state: "Santa Catarina",
      region: "Ingleses Norte",
      street: "Rua Mário Giocondo Crocetta",
      stateCode: "SC",
      additional: "Apto 305",
      countryCode: "BR",
      streetNumber: "164",
    },
    _msneighborhood_overview: {
      pt_BR:
        "Viver a experiência de Ingleses Norte é estar cercado por uma infraestrutura completa e vibrante. A região é famosa por reunir mercados, padarias, lojas e serviços essenciais a poucos passos de distância. Você terá a conveniência de explorar centros comerciais e opções gastronômicas diversificadas, mantendo o contato com a serenidade de um bairro residencial seguro.",
    },
    _mshouserules: {
      pt_BR:
        "Horário de Silêncio: Das 22h às 9h.\nIdentificação: Precisamos da foto de todos os documentos de identificação dos hóspedes para o Cadastro de Locatários.\nComportamento: Não fazer barulho excessivo ou tocar música alta. Proibido festas ou eventos sem autorização.\nProibido fumar em áreas internas (multa de R$ 250,00).\nCheck-in das 16:00 às 22:00 e Check-out até às 10:00.",
    },
  },
  policy: {
    _id: "617b0295fe06a4988b47be7c",
    _t_meta: {
      internalName: "Rigorosa",
      _mstitle: { pt_BR: "Rigorosa" },
      _msdesc: {
        pt_BR:
          "Para receber um reembolso integral (menos taxas administrativas), os hóspedes devem cancelar até 48h após a confirmação e pelo menos 14 dias antes do check-in. Cancelamentos entre 7 e 14 dias recebem 50% de reembolso.",
      },
    },
    checkInTime: "16:00",
    checkInTimeEnd: "22:00",
    checkOutTime: "10:00",
  },
  price: {
    total: "909.25",
    currency: "BRL",
    fees: [
      {
        _id: "fees",
        internalName: "Taxas de Limpeza & Serviços",
        amount: 412,
        type: "fee",
      },
      {
        _id: "paymentProvider",
        internalName: "Custo de Processamento",
        amount: 9,
        type: "processing",
      },
    ],
    breakdown: {
      lastMinute: {
        days: 1,
        basePrice: "315.00",
        basePricePerNight: "315.00",
        discount: 30,
        discountedPrice: "220.50",
        discountedPricePerNight: "220.50",
      },
      regular: {
        days: 1,
        basePrice: "315.00",
        basePricePerNight: "315.00",
        discountedPrice: "267.75",
        discountedPricePerNight: "267.75",
      },
      othersPlataforms: {
        airbnbTotal: "1198.30",
        bookingTotal: "1198.30",
        trivagoTotal: "1250.00",
      },
      totalDays: 2,
    },
  },
  otaChannels: [
    { name: "Airbnb", hostId: "248671830", listingId: "1756582903406601673" },
    { name: "Booking.com", listingId: "17116927" },
  ],
  keys_hosts: {
    name: "Luga",
    description:
      "Anfitrião Profissional parceiro oficial ClubKey com suporte concierge 24h.",
    url_image: null,
  },
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
  amenitiesList: [
    {
      id: "pool",
      name: "Piscina no Rooftop com Vista Mar",
      icon: "Waves",
      category: "Destaque",
    },
    {
      id: "ac",
      name: "Ar-condicionado Split",
      icon: "Wind",
      category: "Conforto",
    },
    {
      id: "wifi",
      name: "Wi-Fi Fibra de Alta Velocidade",
      icon: "Wifi",
      category: "Conectividade",
    },
    {
      id: "kitchen",
      name: "Cozinha 100% Equipada",
      icon: "Utensils",
      category: "Cozinha",
    },
    {
      id: "balcony",
      name: "Varanda Gourmet c/ Churrasqueira",
      icon: "Flame",
      category: "Lazer",
    },
    {
      id: "parking",
      name: "Vaga de Garagem Coberta",
      icon: "Car",
      category: "Estacionamento",
    },
    {
      id: "beach-kit",
      name: "Kit Praia Completo (Cadeiras + Carrinho)",
      icon: "Umbrella",
      category: "Lazer",
    },
    {
      id: "elevator",
      name: "Elevador com Acessibilidade",
      icon: "ArrowUpDown",
      category: "Acessibilidade",
    },
    {
      id: "washer",
      name: "Máquina de Lavar Roupas",
      icon: "Shirt",
      category: "Conveniência",
    },
    {
      id: "tv",
      name: "Smart TV 55 pol. c/ Streaming",
      icon: "Tv",
      category: "Entretenimento",
    },
    {
      id: "workspace",
      name: "Espaço dedicado para trabalho",
      icon: "Laptop",
      category: "Trabalho",
    },
    {
      id: "hairdryer",
      name: "Secador de Cabelo",
      icon: "Zap",
      category: "Banheiro",
    },
    {
      id: "iron",
      name: "Ferro e Tábua de Passar",
      icon: "Sparkles",
      category: "Conveniência",
    },
    {
      id: "linens",
      name: "Roupa de Cama e Banho Premium",
      icon: "BedDouble",
      category: "Conforto",
    },
    {
      id: "security",
      name: "Condomínio Fechado com Câmeras",
      icon: "ShieldCheck",
      category: "Segurança",
    },
  ],
}

export function getRoomDetail(id?: string, slug?: string): RoomDetailData {
  if (!id && !slug) return defaultRoomDetail
  const match = rawApiRooms.find((r) => r.id === id || r.slug === slug)
  if (!match) return defaultRoomDetail

  const basePriceNum = parseFloat(match.base_price) || 473
  const discountPriceNum =
    match.base_price_with_discount || Math.round(basePriceNum * 0.7)

  const uniquePhotos = [...(match.images_meta || [])]
  for (const photo of defaultRoomDetail.images_meta) {
    if (!uniquePhotos.some((p) => p.url === photo.url)) {
      uniquePhotos.push(photo)
    }
  }

  return {
    ...defaultRoomDetail,
    id: match.id,
    _id: match._id,
    latitude: match.latitude || defaultRoomDetail.latitude,
    longitude: match.longitude || defaultRoomDetail.longitude,
    slug: match.slug,
    title: match.title,
    base_price: match.base_price,
    rooms: match.rooms,
    beds: match.beds,
    bathrooms: match.bathrooms,
    max_guest: match.max_guest,
    property_type: match.property_type,
    property_type_meta: match.property_type,
    main_img: match.main_img,
    images_meta:
      uniquePhotos.length >= 5 ? uniquePhotos : defaultRoomDetail.images_meta,
    city: {
      id: match.city.id,
      name: match.city.name,
      state_id: match.city.state_id,
      keys_coverage_states: {
        id: match.city.keys_coverage_states.id,
        name: match.city.keys_coverage_states.name,
        countries: match.city.keys_coverage_states.countries,
      },
    },
    property_meta: {
      ...defaultRoomDetail.property_meta,
      address: {
        ...defaultRoomDetail.property_meta.address,
        city: match.city.name,
        state: match.city.keys_coverage_states.name,
      },
    },
    price: {
      ...defaultRoomDetail.price,
      total: String(Math.round(discountPriceNum * 3 + 180)),
      breakdown: {
        ...defaultRoomDetail.price.breakdown,
        regular: {
          days: 3,
          basePrice: basePriceNum.toFixed(2),
          basePricePerNight: basePriceNum.toFixed(2),
          discountedPrice: (discountPriceNum * 3).toFixed(2),
          discountedPricePerNight: discountPriceNum.toFixed(2),
        },
        othersPlataforms: {
          airbnbTotal: (basePriceNum * 1.15 * 3).toFixed(2),
          bookingTotal: (basePriceNum * 1.08 * 3).toFixed(2),
          trivagoTotal: (basePriceNum * 1.12 * 3).toFixed(2),
        },
      },
    },
  }
}
