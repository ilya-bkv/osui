export interface Nft {
  contract: Contract
  id: Id
  title?: string
  description?: string
  tokenUri: TokenUri
  media: Medum[]
  metadata: Metadata
  timeLastUpdated?: string
  contractMetadata?: ContractMetadata
}

export interface Contract {
  address: string
}

export interface Id {
  tokenId: string
  tokenMetadata: TokenMetadata
}

export interface TokenMetadata {
  tokenType: string
}

export interface TokenUri {
  raw: string
  gateway: string
}

export interface Medum {
  raw: string
  gateway: string
  thumbnail: string
  format: string
  bytes: number
}

export interface Metadata {
  name: string
  description: string
  image: string
  attributes: []
}

export interface ContractMetadata {
  name: string
  symbol: string
  tokenType: string
  openSea: OpenSea
}

export interface OpenSea {
  floorPrice: number
  collectionName: string
  safelistRequestStatus: string
  imageUrl: string
  description: string
  lastIngestedAt: string
}
