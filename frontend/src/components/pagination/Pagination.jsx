import PaginationButton from "./PaginationButton";
import styles from "./Pagination.module.css";
import PaginationNumber from "./PaginationNumber";
import { useState } from "react";

function Pagination({ isLink, linkHref }) {
  const [current, setCurrent] = useState(1);
  const [nextCurrent, setNextCurrent] = useState(2);
  const [pages] = useState(10);

  function handleNextPage() {
    if (current < pages) {
      setCurrent((prevCurrent) => prevCurrent + 1);

      setNextCurrent((prevNextCurr) =>
        current >= 4 && current < pages - 1 ? prevNextCurr + 1 : prevNextCurr
      );
    }
  }

  function handlePrevPage() {
    if (current > 1) {
      setCurrent((prevCurrent) => prevCurrent - 1);

      setNextCurrent((prevNextCurr) =>
        current <= 7 && current > 2 ? prevNextCurr - 1 : prevNextCurr
      );
    }
  }

  function handleNumberClick(number) {
    if (number === current) return;

    setCurrent(number);

    if (number > 4 && number < pages - 1) {
      setNextCurrent(number - 1);
    } else if (number <= 4) {
      setNextCurrent(2);
    } else if (number >= pages - 1) {
      setNextCurrent(pages - 3);
    }
  }

  return (
    <nav className={styles.container}>
      <PaginationButton onClick={handlePrevPage} isLink={current > 1} />

      <div className={styles.pageNumbers}>
        <PaginationNumber
          number={1}
          isCurrent={current}
          onClick={handleNumberClick}
        />
        {nextCurrent > 2 && <div className={styles.elipses}>…</div>}

        {[...Array(3)].map((_, i) => (
          <PaginationNumber
            key={i}
            number={nextCurrent + i}
            isCurrent={current}
            onClick={handleNumberClick}
          />
        ))}

        {nextCurrent < pages - 3 && <div className={styles.elipses}>…</div>}
        <PaginationNumber
          number={pages}
          isCurrent={current}
          onClick={handleNumberClick}
        />
      </div>
      <PaginationButton
        direction="next"
        isLink={current < pages}
        onClick={handleNextPage}
      />
    </nav>
  );
}

export default Pagination;
