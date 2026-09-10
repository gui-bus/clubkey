export interface DestinationState {
  id: number
  name: string
  uf: string
}

export interface DestinationCity {
  id: number
  name: string
  stateId: number
  state: {
    id: number
    name: string
    uf: string
  }
}

export interface DestinationOption {
  id: string
  label: string
  name: string
  uf: string
  type: "state" | "city"
}

export const destinationStates: DestinationState[] = [
  {
    id: 19,
    name: "Alagoas",
    uf: "AL",
  },
  {
    id: 25,
    name: "Bahia",
    uf: "BA",
  },
  {
    id: 21,
    name: "Ceará",
    uf: "CE",
  },
  {
    id: 26,
    name: "Espírito Santo",
    uf: "ES",
  },
  {
    id: 31,
    name: "Goiás",
    uf: "GO",
  },
  {
    id: 38,
    name: "Maranhão",
    uf: "MA",
  },
  {
    id: 32,
    name: "Mato Grosso do Sul",
    uf: "MS",
  },
  {
    id: 27,
    name: "Minas Gerais",
    uf: "MG",
  },
  {
    id: 33,
    name: "Pará",
    uf: "PA",
  },
  {
    id: 24,
    name: "Paraíba",
    uf: "PB",
  },
  {
    id: 28,
    name: "Paraná",
    uf: "PR",
  },
  {
    id: 23,
    name: "Pernambuco",
    uf: "PE",
  },
  {
    id: 39,
    name: "Piauí",
    uf: "PI",
  },
  {
    id: 17,
    name: "Rio de Janeiro",
    uf: "RJ",
  },
  {
    id: 16,
    name: "Rio Grande do Norte",
    uf: "RN",
  },
  {
    id: 22,
    name: "Rio Grande do Sul",
    uf: "RS",
  },
  {
    id: 20,
    name: "Santa Catarina",
    uf: "SC",
  },
  {
    id: 18,
    name: "São Paulo",
    uf: "SP",
  },
  {
    id: 34,
    name: "Tocantins",
    uf: "TO",
  },
]

export const destinationCities: DestinationCity[] = [
  {
    id: 263,
    name: "Águas de Lindóia",
    stateId: 18,
    state: {
      id: 18,
      name: "São Paulo",
      uf: "SP",
    },
  },
  {
    id: 153,
    name: "Águas Mornas",
    stateId: 20,
    state: {
      id: 20,
      name: "Santa Catarina",
      uf: "SC",
    },
  },
  {
    id: 377,
    name: "Alexânia",
    stateId: 31,
    state: {
      id: 31,
      name: "Goiás",
      uf: "GO",
    },
  },
  {
    id: 181,
    name: "Angra dos Reis",
    stateId: 17,
    state: {
      id: 17,
      name: "Rio de Janeiro",
      uf: "RJ",
    },
  },
  {
    id: 287,
    name: "Aparecida",
    stateId: 18,
    state: {
      id: 18,
      name: "São Paulo",
      uf: "SP",
    },
  },
  {
    id: 294,
    name: "Aparecida de Goiânia",
    stateId: 31,
    state: {
      id: 31,
      name: "Goiás",
      uf: "GO",
    },
  },
  {
    id: 137,
    name: "Aquiraz",
    stateId: 21,
    state: {
      id: 21,
      name: "Ceará",
      uf: "CE",
    },
  },
  {
    id: 279,
    name: "Aracati",
    stateId: 21,
    state: {
      id: 21,
      name: "Ceará",
      uf: "CE",
    },
  },
  {
    id: 164,
    name: "Armação dos Búzios",
    stateId: 17,
    state: {
      id: 17,
      name: "Rio de Janeiro",
      uf: "RJ",
    },
  },
  {
    id: 188,
    name: "Arujá",
    stateId: 18,
    state: {
      id: 18,
      name: "São Paulo",
      uf: "SP",
    },
  },
  {
    id: 281,
    name: "Atibaia",
    stateId: 18,
    state: {
      id: 18,
      name: "São Paulo",
      uf: "SP",
    },
  },
  {
    id: 179,
    name: "Balneário Camboriú",
    stateId: 20,
    state: {
      id: 20,
      name: "Santa Catarina",
      uf: "SC",
    },
  },
  {
    id: 135,
    name: "Balneário Piçarras",
    stateId: 20,
    state: {
      id: 20,
      name: "Santa Catarina",
      uf: "SC",
    },
  },
  {
    id: 191,
    name: "Belo Horizonte",
    stateId: 27,
    state: {
      id: 27,
      name: "Minas Gerais",
      uf: "MG",
    },
  },
  {
    id: 295,
    name: "Bento Gonçalves",
    stateId: 22,
    state: {
      id: 22,
      name: "Rio Grande do Sul",
      uf: "RS",
    },
  },
  {
    id: 182,
    name: "Bertioga",
    stateId: 18,
    state: {
      id: 18,
      name: "São Paulo",
      uf: "SP",
    },
  },
  {
    id: 266,
    name: "Blumenau",
    stateId: 20,
    state: {
      id: 20,
      name: "Santa Catarina",
      uf: "SC",
    },
  },
  {
    id: 296,
    name: "Bom Jardim da Serra",
    stateId: 20,
    state: {
      id: 20,
      name: "Santa Catarina",
      uf: "SC",
    },
  },
  {
    id: 291,
    name: "Bom Retiro",
    stateId: 20,
    state: {
      id: 20,
      name: "Santa Catarina",
      uf: "SC",
    },
  },
  {
    id: 328,
    name: "Bombinhas",
    stateId: 20,
    state: {
      id: 20,
      name: "Santa Catarina",
      uf: "SC",
    },
  },
  {
    id: 272,
    name: "Bonito",
    stateId: 32,
    state: {
      id: 32,
      name: "Mato Grosso do Sul",
      uf: "MS",
    },
  },
  {
    id: 168,
    name: "Cabedelo",
    stateId: 24,
    state: {
      id: 24,
      name: "Paraíba",
      uf: "PB",
    },
  },
  {
    id: 288,
    name: "Cabo Frio",
    stateId: 17,
    state: {
      id: 17,
      name: "Rio de Janeiro",
      uf: "RJ",
    },
  },
  {
    id: 354,
    name: "Caeté",
    stateId: 27,
    state: {
      id: 27,
      name: "Minas Gerais",
      uf: "MG",
    },
  },
  {
    id: 368,
    name: "Caieiras",
    stateId: 18,
    state: {
      id: 18,
      name: "São Paulo",
      uf: "SP",
    },
  },
  {
    id: 358,
    name: "Cajobi",
    stateId: 18,
    state: {
      id: 18,
      name: "São Paulo",
      uf: "SP",
    },
  },
  {
    id: 268,
    name: "Caldas Novas",
    stateId: 31,
    state: {
      id: 31,
      name: "Goiás",
      uf: "GO",
    },
  },
  {
    id: 310,
    name: "Camaçari",
    stateId: 25,
    state: {
      id: 25,
      name: "Bahia",
      uf: "BA",
    },
  },
  {
    id: 190,
    name: "Campos do Jordão",
    stateId: 18,
    state: {
      id: 18,
      name: "São Paulo",
      uf: "SP",
    },
  },
  {
    id: 262,
    name: "Caraguatatuba",
    stateId: 18,
    state: {
      id: 18,
      name: "São Paulo",
      uf: "SP",
    },
  },
  {
    id: 140,
    name: "Caucaia",
    stateId: 21,
    state: {
      id: 21,
      name: "Ceará",
      uf: "CE",
    },
  },
  {
    id: 166,
    name: "Ceará-Mirim",
    stateId: 16,
    state: {
      id: 16,
      name: "Rio Grande do Norte",
      uf: "RN",
    },
  },
  {
    id: 275,
    name: "Conde",
    stateId: 24,
    state: {
      id: 24,
      name: "Paraíba",
      uf: "PB",
    },
  },
  {
    id: 363,
    name: "Coronel Xavier Chaves",
    stateId: 27,
    state: {
      id: 27,
      name: "Minas Gerais",
      uf: "MG",
    },
  },
  {
    id: 374,
    name: "Correia Pinto",
    stateId: 20,
    state: {
      id: 20,
      name: "Santa Catarina",
      uf: "SC",
    },
  },
  {
    id: 258,
    name: "Cotia",
    stateId: 18,
    state: {
      id: 18,
      name: "São Paulo",
      uf: "SP",
    },
  },
  {
    id: 265,
    name: "Curitiba",
    stateId: 28,
    state: {
      id: 28,
      name: "Paraná",
      uf: "PR",
    },
  },
  {
    id: 367,
    name: "Esmeraldas",
    stateId: 27,
    state: {
      id: 27,
      name: "Minas Gerais",
      uf: "MG",
    },
  },
  {
    id: 270,
    name: "Extremoz",
    stateId: 16,
    state: {
      id: 16,
      name: "Rio Grande do Norte",
      uf: "RN",
    },
  },
  {
    id: 152,
    name: "Florianópolis",
    stateId: 20,
    state: {
      id: 20,
      name: "Santa Catarina",
      uf: "SC",
    },
  },
  {
    id: 376,
    name: "Formiga",
    stateId: 27,
    state: {
      id: 27,
      name: "Minas Gerais",
      uf: "MG",
    },
  },
  {
    id: 138,
    name: "Fortaleza",
    stateId: 21,
    state: {
      id: 21,
      name: "Ceará",
      uf: "CE",
    },
  },
  {
    id: 142,
    name: "Fortim",
    stateId: 21,
    state: {
      id: 21,
      name: "Ceará",
      uf: "CE",
    },
  },
  {
    id: 375,
    name: "Foz do Iguaçu",
    stateId: 28,
    state: {
      id: 28,
      name: "Paraná",
      uf: "PR",
    },
  },
  {
    id: 257,
    name: "Garopaba",
    stateId: 20,
    state: {
      id: 20,
      name: "Santa Catarina",
      uf: "SC",
    },
  },
  {
    id: 292,
    name: "Goiânia",
    stateId: 31,
    state: {
      id: 31,
      name: "Goiás",
      uf: "GO",
    },
  },
  {
    id: 256,
    name: "Governador Celso Ramos",
    stateId: 20,
    state: {
      id: 20,
      name: "Santa Catarina",
      uf: "SC",
    },
  },
  {
    id: 148,
    name: "Gramado",
    stateId: 22,
    state: {
      id: 22,
      name: "Rio Grande do Sul",
      uf: "RS",
    },
  },
  {
    id: 187,
    name: "Guarapari",
    stateId: 26,
    state: {
      id: 26,
      name: "Espírito Santo",
      uf: "ES",
    },
  },
  {
    id: 132,
    name: "Guarujá",
    stateId: 18,
    state: {
      id: 18,
      name: "São Paulo",
      uf: "SP",
    },
  },
  {
    id: 184,
    name: "Ibiúna",
    stateId: 18,
    state: {
      id: 18,
      name: "São Paulo",
      uf: "SP",
    },
  },
  {
    id: 285,
    name: "Ilhabela",
    stateId: 18,
    state: {
      id: 18,
      name: "São Paulo",
      uf: "SP",
    },
  },
  {
    id: 156,
    name: "Imbituba",
    stateId: 20,
    state: {
      id: 20,
      name: "Santa Catarina",
      uf: "SC",
    },
  },
  {
    id: 167,
    name: "Ipojuca",
    stateId: 23,
    state: {
      id: 23,
      name: "Pernambuco",
      uf: "PE",
    },
  },
  {
    id: 378,
    name: "Itambé do Mato Dentro",
    stateId: 27,
    state: {
      id: 27,
      name: "Minas Gerais",
      uf: "MG",
    },
  },
  {
    id: 298,
    name: "Itamonte",
    stateId: 27,
    state: {
      id: 27,
      name: "Minas Gerais",
      uf: "MG",
    },
  },
  {
    id: 186,
    name: "Itanhaém",
    stateId: 18,
    state: {
      id: 18,
      name: "São Paulo",
      uf: "SP",
    },
  },
  {
    id: 176,
    name: "Itapema",
    stateId: 20,
    state: {
      id: 20,
      name: "Santa Catarina",
      uf: "SC",
    },
  },
  {
    id: 356,
    name: "Jaboticabal",
    stateId: 18,
    state: {
      id: 18,
      name: "São Paulo",
      uf: "SP",
    },
  },
  {
    id: 158,
    name: "Jaguaruna",
    stateId: 20,
    state: {
      id: 20,
      name: "Santa Catarina",
      uf: "SC",
    },
  },
  {
    id: 362,
    name: "Jaraguá do Sul",
    stateId: 20,
    state: {
      id: 20,
      name: "Santa Catarina",
      uf: "SC",
    },
  },
  {
    id: 269,
    name: "Jijoca de Jericoacoara",
    stateId: 21,
    state: {
      id: 21,
      name: "Ceará",
      uf: "CE",
    },
  },
  {
    id: 170,
    name: "João Pessoa",
    stateId: 24,
    state: {
      id: 24,
      name: "Paraíba",
      uf: "PB",
    },
  },
  {
    id: 161,
    name: "Laguna",
    stateId: 20,
    state: {
      id: 20,
      name: "Santa Catarina",
      uf: "SC",
    },
  },
  {
    id: 371,
    name: "Luís Correia",
    stateId: 39,
    state: {
      id: 39,
      name: "Piauí",
      uf: "PI",
    },
  },
  {
    id: 134,
    name: "Maceió",
    stateId: 19,
    state: {
      id: 19,
      name: "Alagoas",
      uf: "AL",
    },
  },
  {
    id: 185,
    name: "Mairiporã",
    stateId: 18,
    state: {
      id: 18,
      name: "São Paulo",
      uf: "SP",
    },
  },
  {
    id: 260,
    name: "Mangaratiba",
    stateId: 17,
    state: {
      id: 17,
      name: "Rio de Janeiro",
      uf: "RJ",
    },
  },
  {
    id: 147,
    name: "Marechal Deodoro",
    stateId: 19,
    state: {
      id: 19,
      name: "Alagoas",
      uf: "AL",
    },
  },
  {
    id: 357,
    name: "Mateiros",
    stateId: 34,
    state: {
      id: 34,
      name: "Tocantins",
      uf: "TO",
    },
  },
  {
    id: 382,
    name: "Mateus Leme",
    stateId: 27,
    state: {
      id: 27,
      name: "Minas Gerais",
      uf: "MG",
    },
  },
  {
    id: 370,
    name: "Mongaguá",
    stateId: 18,
    state: {
      id: 18,
      name: "São Paulo",
      uf: "SP",
    },
  },
  {
    id: 381,
    name: "Monteiro Lobato",
    stateId: 18,
    state: {
      id: 18,
      name: "São Paulo",
      uf: "SP",
    },
  },
  {
    id: 274,
    name: "Mulungu",
    stateId: 21,
    state: {
      id: 21,
      name: "Ceará",
      uf: "CE",
    },
  },
  {
    id: 169,
    name: "Natal",
    stateId: 16,
    state: {
      id: 16,
      name: "Rio Grande do Norte",
      uf: "RN",
    },
  },
  {
    id: 174,
    name: "Nisia Floresta",
    stateId: 16,
    state: {
      id: 16,
      name: "Rio Grande do Norte",
      uf: "RN",
    },
  },
  {
    id: 130,
    name: "Niterói",
    stateId: 17,
    state: {
      id: 17,
      name: "Rio de Janeiro",
      uf: "RJ",
    },
  },
  {
    id: 264,
    name: "Orleans",
    stateId: 20,
    state: {
      id: 20,
      name: "Santa Catarina",
      uf: "SC",
    },
  },
  {
    id: 157,
    name: "Palhoça",
    stateId: 20,
    state: {
      id: 20,
      name: "Santa Catarina",
      uf: "SC",
    },
  },
  {
    id: 273,
    name: "Paracuru",
    stateId: 21,
    state: {
      id: 21,
      name: "Ceará",
      uf: "CE",
    },
  },
  {
    id: 369,
    name: "Paraibuna",
    stateId: 18,
    state: {
      id: 18,
      name: "São Paulo",
      uf: "SP",
    },
  },
  {
    id: 131,
    name: "Paraty",
    stateId: 17,
    state: {
      id: 17,
      name: "Rio de Janeiro",
      uf: "RJ",
    },
  },
  {
    id: 277,
    name: "Parnamirim",
    stateId: 16,
    state: {
      id: 16,
      name: "Rio Grande do Norte",
      uf: "RN",
    },
  },
  {
    id: 271,
    name: "Pedro Leopoldo",
    stateId: 27,
    state: {
      id: 27,
      name: "Minas Gerais",
      uf: "MG",
    },
  },
  {
    id: 183,
    name: "Penha",
    stateId: 20,
    state: {
      id: 20,
      name: "Santa Catarina",
      uf: "SC",
    },
  },
  {
    id: 165,
    name: "Petrópolis",
    stateId: 17,
    state: {
      id: 17,
      name: "Rio de Janeiro",
      uf: "RJ",
    },
  },
  {
    id: 290,
    name: "Pinheiral",
    stateId: 17,
    state: {
      id: 17,
      name: "Rio de Janeiro",
      uf: "RJ",
    },
  },
  {
    id: 194,
    name: "Pontal do Paraná",
    stateId: 28,
    state: {
      id: 28,
      name: "Paraná",
      uf: "PR",
    },
  },
  {
    id: 289,
    name: "Porto Alegre",
    stateId: 22,
    state: {
      id: 22,
      name: "Rio Grande do Sul",
      uf: "RS",
    },
  },
  {
    id: 293,
    name: "Porto Nacional",
    stateId: 34,
    state: {
      id: 34,
      name: "Tocantins",
      uf: "TO",
    },
  },
  {
    id: 334,
    name: "Porto Seguro",
    stateId: 25,
    state: {
      id: 25,
      name: "Bahia",
      uf: "BA",
    },
  },
  {
    id: 259,
    name: "Praia Grande",
    stateId: 18,
    state: {
      id: 18,
      name: "São Paulo",
      uf: "SP",
    },
  },
  {
    id: 150,
    name: "Rancho Queimado",
    stateId: 20,
    state: {
      id: 20,
      name: "Santa Catarina",
      uf: "SC",
    },
  },
  {
    id: 172,
    name: "Recife",
    stateId: 23,
    state: {
      id: 23,
      name: "Pernambuco",
      uf: "PE",
    },
  },
  {
    id: 129,
    name: "Rio de Janeiro",
    stateId: 17,
    state: {
      id: 17,
      name: "Rio de Janeiro",
      uf: "RJ",
    },
  },
  {
    id: 286,
    name: "Riviera de São Lourenço",
    stateId: 18,
    state: {
      id: 18,
      name: "São Paulo",
      uf: "SP",
    },
  },
  {
    id: 366,
    name: "Salinópolis",
    stateId: 33,
    state: {
      id: 33,
      name: "Pará",
      uf: "PA",
    },
  },
  {
    id: 173,
    name: "Salvador",
    stateId: 25,
    state: {
      id: 25,
      name: "Bahia",
      uf: "BA",
    },
  },
  {
    id: 151,
    name: "Santo Amaro da Imperatriz",
    stateId: 20,
    state: {
      id: 20,
      name: "Santa Catarina",
      uf: "SC",
    },
  },
  {
    id: 282,
    name: "Santos",
    stateId: 18,
    state: {
      id: 18,
      name: "São Paulo",
      uf: "SP",
    },
  },
  {
    id: 384,
    name: "São Francisco do Sul",
    stateId: 20,
    state: {
      id: 20,
      name: "Santa Catarina",
      uf: "SC",
    },
  },
  {
    id: 255,
    name: "São Gonçalo do Amarante",
    stateId: 21,
    state: {
      id: 21,
      name: "Ceará",
      uf: "CE",
    },
  },
  {
    id: 386,
    name: "São João da Barra",
    stateId: 17,
    state: {
      id: 17,
      name: "Rio de Janeiro",
      uf: "RJ",
    },
  },
  {
    id: 160,
    name: "São José",
    stateId: 20,
    state: {
      id: 20,
      name: "Santa Catarina",
      uf: "SC",
    },
  },
  {
    id: 365,
    name: "São José de Ribamar",
    stateId: 38,
    state: {
      id: 38,
      name: "Maranhão",
      uf: "MA",
    },
  },
  {
    id: 163,
    name: "São Paulo",
    stateId: 18,
    state: {
      id: 18,
      name: "São Paulo",
      uf: "SP",
    },
  },
  {
    id: 344,
    name: "São Pedro da Aldeia",
    stateId: 17,
    state: {
      id: 17,
      name: "Rio de Janeiro",
      uf: "RJ",
    },
  },
  {
    id: 154,
    name: "São Pedro de Alcântara",
    stateId: 20,
    state: {
      id: 20,
      name: "Santa Catarina",
      uf: "SC",
    },
  },
  {
    id: 133,
    name: "São Sebastião",
    stateId: 18,
    state: {
      id: 18,
      name: "São Paulo",
      uf: "SP",
    },
  },
  {
    id: 372,
    name: "Sorocaba",
    stateId: 18,
    state: {
      id: 18,
      name: "São Paulo",
      uf: "SP",
    },
  },
  {
    id: 175,
    name: "Tamandaré",
    stateId: 23,
    state: {
      id: 23,
      name: "Pernambuco",
      uf: "PE",
    },
  },
  {
    id: 128,
    name: "Tibau do Sul",
    stateId: 16,
    state: {
      id: 16,
      name: "Rio Grande do Norte",
      uf: "RN",
    },
  },
  {
    id: 139,
    name: "Trairi",
    stateId: 21,
    state: {
      id: 21,
      name: "Ceará",
      uf: "CE",
    },
  },
  {
    id: 284,
    name: "Ubatuba",
    stateId: 18,
    state: {
      id: 18,
      name: "São Paulo",
      uf: "SP",
    },
  },
  {
    id: 297,
    name: "Urubici",
    stateId: 20,
    state: {
      id: 20,
      name: "Santa Catarina",
      uf: "SC",
    },
  },
]

export const destinationOptions: DestinationOption[] = [
  ...destinationStates.map((s) => ({
    id: `state-${s.id}`,
    label: s.name,
    name: s.name,
    uf: s.uf,
    type: "state" as const,
  })),
  ...destinationCities.map((c) => ({
    id: `city-${c.id}`,
    label: `${c.name} (${c.state.uf})`,
    name: c.name,
    uf: c.state.uf,
    type: "city" as const,
  })),
]
