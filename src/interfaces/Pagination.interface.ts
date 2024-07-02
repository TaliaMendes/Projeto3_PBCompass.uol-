export interface IPagination<type> {
  data: type[];
  total: number;
  page: number;
  pages: number;
}