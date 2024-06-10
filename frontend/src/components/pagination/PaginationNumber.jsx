import styles from "./PaginationNumber.module.css";

function PaginationNumber({ isCurrent, number, onClick }) {
  return (
    <a
      href="/page"
      className={`${styles.pageNumber} ${
        isCurrent === number ? styles.active : ""
      }`}
      onClick={() => onClick(number)}
    >
      {number}
    </a>
  );
}

export default PaginationNumber;
