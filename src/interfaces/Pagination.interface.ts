export interface IPagination<type> {
  data: type[] // Array de dados da página atual
  total: number // Total de registros que correspondem aos filtros
  limit: number // Limite de registros por página
  offset: number // Total de páginas no total
  offsets: number  // Número de páginas restantes após a página atual
}