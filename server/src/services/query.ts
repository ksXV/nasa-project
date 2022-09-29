const DEFAULT_PAGE_LIMIT = 0;
const DEFAULT_PAGE_NUMBER = 1;

export function getPagination(query: { page: string; limit: string }) {
  const page = Math.abs(Number(query.page)) || DEFAULT_PAGE_NUMBER;
  const limit = Math.abs(Number(query.limit)) || DEFAULT_PAGE_LIMIT;
  const skip = (page - 1) * limit;

  return {
    skip,
    limit,
  };
}
