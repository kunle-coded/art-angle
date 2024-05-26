import styles from "./Section.module.css";
import SectionTitle from "../../ui/SectionTitle";

function Section({ type, title, subtitle, link, children }) {
  return (
    <div className={type === "basic" ? "section_basic" : "section_block"}>
      <section className={styles.container}>
        {title ? (
          <SectionTitle title={title} subtitle={subtitle} link={link} />
        ) : null}
        <div className={styles.content}>{children}</div>
      </section>
    </div>
  );
}

export default Section;
