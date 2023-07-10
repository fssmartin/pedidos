export interface Root {
  data: Daum[]
  meta: Meta
}

export interface Daum {
  id: number
  attributes: Pedido
}

export interface Pedido {
  createdAt: string
  updatedAt: string
  publishedAt: string
  Clave: string
  DireccionPedido: DireccionPedido
  EstadoPedido: EstadoPedido
  PosicionPedido: PosicionPedido
  tienda: TiendaRoot
  usuario: UsuarioRoot
}

export interface DireccionPedido {
  id: number
  Latitud: number
  Longitud: number
  Direccion_completa: string
}

export interface EstadoPedido {
  id: number
  status: string
}

export interface PosicionPedido {
  id: number
  Latitud: number
  Longitud: number
  Direccion_completa: string
}

export interface TiendaRoot {
  data: Data
}

export interface Data {
  id: number
  attributes: Tienda
}

export interface Tienda {
  Nombre: string
  Direccion: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  Latitud: number
  Longitud: number
  Clave: string
  marca: MarcaRoot
}

export interface MarcaRoot {
  data: Data2
}

export interface Data2 {
  id: number
  attributes: Marca
}

export interface Marca {
  createdAt: string
  updatedAt: string
  publishedAt: string
  Nombre: string
  Color1: string
  Color2: string
  Color3: string
  Logo: Logo
}

export interface Logo {
  data: Daum2[]
}

export interface Daum2 {
  id: number
  attributes: Attributes4
}

export interface Attributes4 {
  name: string
  alternativeText: any
  caption: any
  width: number
  height: number
  formats: Formats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: any
  provider: string
  provider_metadata: ProviderMetadata5
  createdAt: string
  updatedAt: string
}

export interface Formats {
  thumbnail: Thumbnail
  large: Large
  small: Small
  medium: Medium
}

export interface Thumbnail {
  name: string
  hash: string
  ext: string
  mime: string
  path: any
  width: number
  height: number
  size: number
  url: string
  provider_metadata: ProviderMetadata
}

export interface ProviderMetadata {
  public_id: string
  resource_type: string
}

export interface Large {
  name: string
  hash: string
  ext: string
  mime: string
  path: any
  width: number
  height: number
  size: number
  url: string
  provider_metadata: ProviderMetadata2
}

export interface ProviderMetadata2 {
  public_id: string
  resource_type: string
}

export interface Small {
  name: string
  hash: string
  ext: string
  mime: string
  path: any
  width: number
  height: number
  size: number
  url: string
  provider_metadata: ProviderMetadata3
}

export interface ProviderMetadata3 {
  public_id: string
  resource_type: string
}

export interface Medium {
  name: string
  hash: string
  ext: string
  mime: string
  path: any
  width: number
  height: number
  size: number
  url: string
  provider_metadata: ProviderMetadata4
}

export interface ProviderMetadata4 {
  public_id: string
  resource_type: string
}

export interface ProviderMetadata5 {
  public_id: string
  resource_type: string
}

export interface UsuarioRoot {
  data: Data3
}

export interface Data3 {
  id: number
  attributes: Usuario
}

export interface Usuario {
  Nombre: string
  Correo: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface Infopedido {
  estado :EstadoPedido
  posicion: PosicionPedido
  direccion: DireccionPedido
}

