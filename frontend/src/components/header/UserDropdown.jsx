import { useState } from "react";
import styles from "./UserDropdown.module.css";

function UserDropdown({ showDropdown }) {
  const [isDropdown, setIsDropdown] = useState(false);
  console.log(isDropdown);

  return (
    <div
      className={`${styles.dropdown} ${
        showDropdown || isDropdown ? styles.show : ""
      }`}
      onMouseEnter={() => setIsDropdown(true)}
      onMouseLeave={() => setIsDropdown(false)}
    >
      <h3 datatype="fullname">John Doe</h3>
      <div className={styles.linkItem}>Profile</div>
      <div className={styles.linkItem}>Wishlist</div>
      <div className={styles.linkItem}>Cart</div>
      <div className={styles.linkItem}>Logout</div>
    </div>
  );
}

export default UserDropdown;
