import { useState, useEffect } from "react";
import { Admin } from "../types/admin";

const usePagination = (
  data: Array<Admin>,
  itemsPerPage: number,
  query?: string
) => {
  //   console.log(data.length);
  const [current, setCurrent] = useState<Admin[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(Math.ceil(data.length / itemsPerPage));

  useEffect(() => {
    const begin = query ? 0 : (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    if (query) {
      const a = data
        .filter(
          (a) =>
            searchQuery(query, a.email) ||
            searchQuery(query, a.name) ||
            a.role.toLowerCase() === query.toLowerCase()
        )
        .slice(begin, end);
      setCurrent(a);
      setMaxPage(Math.ceil(a.length / itemsPerPage));
    } else {
      setCurrent(data.slice(begin, end));
      setMaxPage(Math.ceil(data.length / itemsPerPage));
    }
  }, [currentPage, data, itemsPerPage, query]);
  const searchQuery = (queryString: string, value: string) => {
    queryString = queryString.toLowerCase();
    value = value.toLowerCase();
    const index = value.includes(queryString, 0);
    return index;
  };
  // function currentData(q?: string) {
  //   const begin = (currentPage - 1) * itemsPerPage;
  //   const end = begin + itemsPerPage;
  //   const a = q
  //     ? data.filter(
  //         (a) =>
  //           searchQuery(q, a.email) ||
  //           searchQuery(q, a.name) ||
  //           a.role.toLowerCase() === q.toLowerCase()
  //       )
  //     : data.slice(begin, end);

  //   return a;
  // }
  //   const currentData = useCallback(() => {
  //     const begin = (currentPage - 1) * itemsPerPage;
  //     const end = begin + itemsPerPage;
  //     const a = data.slice(begin, end);
  //     return a;
  //   }, [currentPage, data, itemsPerPage]);

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jump(page: number) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(() => Math.min(pageNumber, maxPage));
  }
  // function deleteFromList(ids: string[]) {
  //   // console.log(ids);
  //   const a = data.filter((a) => ids.includes(a.id) === false);
  //   setCurrent(a);
  // }

  return {
    next,
    prev,
    jump,
    currentData: current,
    currentPage,
    maxPage,
    // deleteFromList,
  };
};

export default usePagination;
