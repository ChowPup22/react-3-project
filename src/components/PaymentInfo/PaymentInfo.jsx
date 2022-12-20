import React from "react";
import styles from './PaymentInfo.module.css';
import InputBase from "../InputBase/InputBase";
import { OTHERCARDS, INIT_CARD_INPUT, INIT_CARD } from "../../Constants/Cards";
import { validations } from "../../Constants/Validations";

class PaymentInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentData: INIT_CARD,
      error: {},
      maxLength: OTHERCARDS.length,
      cardType: null,
    }
  }

  handleState = (name, value) => {
    this.props.handleState(name, value);
  };

  handleSteps = (name, value) => {
    this.props.handleStep(name, value);
  };

  findCardType = (cardNumber) => {
    const regexPattern = {
      MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
      VISA: /^4[0-9]{2,}$/,
      AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
      DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    };

    for (const card in regexPattern) {
      if (cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) return card;
    }
    return '';
  }

  handleValidations = (type, value) => {
    const errorText = validations[type](value);
    this.setState((prevState) => ({
      error: {
        ...prevState.error,
        [`${type}Error`]: errorText,
      }
    }), type === 'card' ? () => { const cardType = this.findCardType(value) 
      this.setState({ cardType }) } : null);
  }

  handleBlur = ({ target: {name, value}}) => this.handleValidations(name, value);

  handleInputData = ({ target: {name, value}}) => {

    if (name === 'card') {
      let mask = value.split(' ').join('');
      if(mask.length) {
        mask = mask.match(new RegExp('.{1,4}', 'g')).join(' ');

        this.setState((prev) => ({
            paymentData: {
              ...prev.paymentData,
              [name]: mask,
            },
        }));
      } else {
        this.setState((prev) => ({
            paymentData: {
              ...prev.paymentData,
              [name]: '',
            }
        }));
      }
    } else {
      this.setState((prev) => ({
          paymentData: {
            ...prev.paymentData,
            [name]: value,
          }
      }));
    }
  };

  checkErrorBeforeSave = () => {
    const { paymentData, error } = this.state;
    let errorValue = {};
    let isError = false;
    Object.keys(paymentData).forEach((val) => {
      if (!paymentData[val].length) {
        errorValue = {...errorValue, [`${val}Error`] : 'Required'};
        isError = true;
      } else if (error[`${val}Error`]) {
        errorValue = {...errorValue, [`${val}Error`] : error[`${val}Error`]};
        isError = true;
      }
    });
    this.setState({ error: errorValue });
    return isError;
  }

  handleProceed = (e) => {
    e.preventDefault();
    const { paymentData } = this.state;

    const errorCheck = this.checkErrorBeforeSave();
    if (!errorCheck) {
      this.handleState('paymentData', paymentData)
      this.handleSteps('step', 'checkout')
    }
  }

  handleReturn = () => {
    this.handleSteps('step', 'shipping');
  }

  render() {

    const {
      paymentData,
      error,
      cardType,
      maxLength,
    } = this.state;


    return (
        <div className={styles.payment_wrap}>
          <h2 className="text-success fw-bolder fs-1 fst-italic mb-3">Payment Information</h2>
          <form >
            {INIT_CARD_INPUT.length ? INIT_CARD_INPUT.map((item) => (
              <InputBase
              header={item.header}
              placeholder={item.label}
              type={item.type}
              value={paymentData && paymentData[item.name]}
              onChange={this.handleInputData}
              autoComplete= 'off'
              maxLength={maxLength}
              name={item.name}
              key={item.name}
              onBlur={this.handleBlur}
              cardType={cardType}
              isCard={item.name === 'card'}
              errorM={
                (error
                && error[item.error]
                && error[item.error].length > 1)
                ? error[item.error]
                : null
              }
            />
            )) : null}
          </form>
          <input type="button" value="BACK" className={styles.btn_return} onClick={this.handleReturn} />
          <button className="btn btn-success btn-lg ms-5" onClick={this.handleProceed}>Pay Now</button>
        </div>
    )
  }
}

export default PaymentInfo;