import React from "react";

interface Props {
  total: number;
  current: number
  onPaginationClick: (a: number) => void
}
export const Pagination: React.FC<Props> = ({ total, current, onPaginationClick }) => {

  const pages = []
  for (let i = 1; i <= total; i++) {
    pages.push(i)
  }
  return <>

    <div className="pagination-wrapper">
      {pages.map(a => <button key={a} className={current === a ? "active" : "not-active"} onClick={() => onPaginationClick(a)}>{a}</button>)}
    </div>
  </>;
};
