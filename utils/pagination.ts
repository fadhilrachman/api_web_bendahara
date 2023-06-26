interface Pagination {
  total_page: number;
  current_page: number | null;
  next: number;
  previoes: number;
  limit?: number;
}
const createPagination = (page: number, total_page: number, limit: number) => {
  let previoes: any;
  let next: any;
  if (page <= total_page) {
    previoes = page - 1 !== 0 ? page - 1 : null;
    next = page < total_page ? Number(page) + 1 : null;
  } else {
    previoes = null;
    next = null;
  }
  let pagination: Pagination = {
    total_page,
    next,
    previoes,
    current_page: Number(page) || null,
  };
  return pagination;
};

export default createPagination;
