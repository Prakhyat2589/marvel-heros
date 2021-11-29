import React from "react";
import ReactPaginate from "react-paginate";
import style from "./Pagination.module.css";

const Pagination = ({ pageCount, handlePageClick, initialPage }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="< previous"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      renderOnZeroPageCount={null}
      className={style.paginationBar}
      initialPage={initialPage}
    />
  );
};

export { Pagination };
