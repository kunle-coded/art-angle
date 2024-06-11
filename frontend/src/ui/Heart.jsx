import { useState } from "react";
import styles from "./Heart.module.css";

function Heart() {
  const [isLike, setIsLike] = useState(false);

  const handleLike = () => {
    setIsLike((prevState) => !prevState);
  };

  return (
    <div
      className={`${styles.like} ${isLike ? styles.liked : ""}`}
      onClick={handleLike}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.31798 6.31804C3.90011 6.7359 3.56864 7.23198 3.34249 7.77795C3.11634 8.32392 2.99994 8.90909 2.99994 9.50004C2.99994 10.091 3.11634 10.6762 3.34249 11.2221C3.56864 11.7681 3.90011 12.2642 4.31798 12.682L12 20.364L19.682 12.682C20.5259 11.8381 21 10.6935 21 9.50004C21 8.30656 20.5259 7.16196 19.682 6.31804C18.8381 5.47412 17.6935 5.00001 16.5 5.00001C15.3065 5.00001 14.1619 5.47412 13.318 6.31804L12 7.63604L10.682 6.31804C10.2641 5.90017 9.76803 5.5687 9.22207 5.34255C8.6761 5.1164 8.09093 5 7.49998 5C6.90903 5 6.32386 5.1164 5.77789 5.34255C5.23192 5.5687 4.73584 5.90017 4.31798 6.31804Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default Heart;
