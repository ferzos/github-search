export const clamp = (totalPage: number, maxPagePagination: number) =>
  totalPage > maxPagePagination ? maxPagePagination : totalPage;
