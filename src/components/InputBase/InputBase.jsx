import React from "react";
import styles from './InputBase.module.css';

const InputBase = ({ passData, errorM, header, isCard, cardType, ...props}) => (
  <label>
    {header && <div className={styles.header}>{header}</div>}
    {errorM ? <input style={{border: '2px solid red'}} className={styles.input_root} {...props}/> :
    <input className={styles.input_root} {...props}/> }
    {errorM && <div className={styles.error}>{errorM}</div>}
  </label>
)
export default InputBase;