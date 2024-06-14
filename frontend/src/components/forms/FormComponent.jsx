import FullButton from "../../ui/FullButton";
import GoogleIcon from "../icons/GoogleIcon";
import styles from "./FormComponent.module.css";

function FormComponent({
  type = "",
  heading = "",
  children,
  onConfirm,
  onGoogle,
}) {
  return (
    <div className={styles.contentContainer}>
      <div className={styles.introText}>{heading}</div>

      <div className={styles.form}>
        {children}
        <div
          className={`${styles.passwordOption} ${
            type === "signup" ? styles.signupOption : ""
          }`}
        >
          {type === "signup" ? (
            "Password must be at least 8 characters and include a lowercase letter,uppercase letter, and digit."
          ) : (
            <button className={styles.optionButton}>Forgot password?</button>
          )}
        </div>
      </div>

      <div className={styles.buttons}>
        <FullButton onClick={onConfirm}>
          {type === "signup" ? "Sign up" : "Login"}
        </FullButton>
        {type === "signup" && <div className={styles.option}>or</div>}
        <FullButton type="secondary" onClick={onGoogle}>
          <div className={styles.iconWrapper}>
            <GoogleIcon />
          </div>
          Continue with Google
        </FullButton>
      </div>

      <div className={styles.loginOption}>
        {`${type === "signup" ? "Already" : "Don’t"} have an account?`}
        <button className={styles.optionButton}>
          {type === "signup" ? "Sign up." : "Log in."}
        </button>
      </div>
    </div>
  );
}

export default FormComponent;
