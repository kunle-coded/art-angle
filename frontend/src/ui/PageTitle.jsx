import styles from "./PageTitle.module.css";

function PageTitle({ title = "", size = "" }) {
  return (
    <h1
      className={`${styles.title} ${size === "small" ? styles.smallTitle : ""}`}
    >
      {title}
    </h1>
  );
}

export default PageTitle;
