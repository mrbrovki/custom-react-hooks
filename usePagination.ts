import { useState } from 'react';

interface UsePaginationProps{
  contentPerPage: number;
  totalItems: number;
}

interface UsePaginationReturn{
  page: number;
  totalPages: number;
  firstContentIndex: number;
  lastContentIndex: number;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
}

type pageDir = "next" | "prev" | "default";
type UsePagination = (props: UsePaginationProps) => UsePaginationReturn;

const usePagination:UsePagination = ({ contentPerPage, totalItems }) => {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(totalItems/contentPerPage);
  const lastIndex = page * contentPerPage - 1;
  const firstIndex = lastIndex - contentPerPage + 1;

  const changePage = (direction: pageDir, page: number = 1) =>{
    if(direction === "next"){
      if(page < pageCount){
        setPage(prev => prev + 1);
      }
    }
    else if(direction === "default"){
      setPage(page);
    }
    else{
      if(page > pageCount){
        setPage(prev => prev - 1);
      }
    }
  }
  return {
  page: page,
  totalPages: pageCount,
  firstContentIndex: firstIndex,
  lastContentIndex: lastIndex,
  nextPage: () => changePage("next"),
  prevPage: () => changePage("prev"),
  setPage: (page: number) => changePage("default", page)
  }
};

export default usePagination;
