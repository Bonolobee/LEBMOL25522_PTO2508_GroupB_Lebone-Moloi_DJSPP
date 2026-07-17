import React from "react";
import styles from "./Error.module.css";

/**
 * Error component.
 *
 * Displays an error message in a styled container.
 * Used to inform the user when data fetching or other operations fail.
 *
 * @param {Object} props
 * @param {string} props.message - The error message to display.
 *
 * @returns {JSX.Element} A styled error message element.
 */
export default function Error({ message }) {
  return (
    <div className={styles.messageContainer}>
      <div className={styles.error}>{message}</div>
    </div>
  );
}
