import React from "react";
import styles from "./Loading.module.css";

/**
 * Loading component.
 *
 * Displays a spinner and an optional message while content is loading.
 * Typically used during data fetch operations to indicate progress to the user.
 *
 * @param {Object} props
 * @param {string} props.message - The message to display alongside the spinner.
 *
 * @returns {JSX.Element} A styled loading indicator with a message.
 */
export default function Loading({ message }) {
  return (
    <div className={styles.messageContainer}>
      <div className={styles.spinner}></div>
      <p>{message}</p>
    </div>
  );
}
