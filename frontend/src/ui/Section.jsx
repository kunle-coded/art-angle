import styles from "./Section.module.css";
import SectionTitle from "./SectionTitle";

function Section({ title, subtitle, link, children }) {
  return (
    <div className="section_block">
      <section className={styles.container}>
        <SectionTitle title={title} subtitle={subtitle} link={link} />
        <div className={styles.content}>{children}</div>
      </section>
    </div>
  );
}

export default Section;
