import React from "react";
import styles from './InputBase.module.css';
import { CARD, CARDICON } from "../../Constants/Cards";


const InputBase = ({ passData, errorM, header, isCard, cardType, select, ...props}) => (
  <label>
    {header && <div className={styles.header}>{header}</div>}
    {!select ? (errorM ? <input style={{border: '2px solid red'}} className={styles.input_root} {...props}/> :
    <input className={styles.input_root} {...props}/> ): null}
    {errorM && <div className={styles.error}>{errorM}</div>}
    {(!errorM || !errorM.cardError) && isCard && CARD.includes(cardType) && (
      <img
      style={{
        position: "absolute",
        top: "45px",
        right: "10px",
        width: "50px",
        height: "33px",
      }}
      src={CARDICON[cardType]}
      alt="card"
      />
    )}
    {select && <select name={props.name} className={styles.select_root} onChange={props.onSelect} {...props}>
      {props.name === 'country' ? props.optionscountry.map((option) => (
        <option key={option.id} value={option.name}>{option.name}</option>
      )) : null}
      {props.name === 'state' ? props.optionsstate.map((option) => (
        <option key={option.id} value={option.name}>{option.name}</option>
      )) : null}
      {props.name === 'city' ? props.optionscity.map((option) => (
        <option key={option.country + option.id + option.name} value={option.name}>{option.name}</option>
      )) : null}
      </select> }
  </label>
)
export default InputBase;