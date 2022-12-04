import React from 'react';
import styles from './SignIn.module.css';
import InputBase from '../InputBase/InputBase';
import { emailValidation, onlyTextValidation, passwordValidation, zipCodeValidation } from '../../Constants/Validations';
import { INIT_PASS, INIT_CREATE, INIT_SIGN, INIT_FORM, } from '../../Constants/States';
import { visible } from '../../Constants/Icons';
import ShopperService from '../../services';

const shopper = new ShopperService();

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: INIT_FORM,
      error: {},
      button: 'Create Account',
      inputData: INIT_CREATE,
      passData: INIT_PASS,
      users: shopper.getAllUsers(),
    }
  }

  handleState = (name, value) => {
    this.props.handleFormData(name, value);
  };

  passVisibility = () => {
    if(!this.state.passData.passVisible) {
      this.setState({
        passData: {
          passVisible: true,
          passIcon: visible,
          passType: 'text',
        }
      });
    } else if (this.state.passData.passVisible) {
      this.setState({
        passData: INIT_PASS,
      });
    }
  };

  handleSignUI = () => {
      this.setState({
        inputData: INIT_SIGN,
        formData: {
          email: '',
          pass: '',
        },
        error: {},
        button: 'Sign In',
      });
  };

  handleCreateUI = () => {
    this.setState({
      inputData: INIT_CREATE,
      error: {},
      button: 'Create Account',
    });
  };

  handleInputData = ({ target: {name, value}}) => {
    this.setState((prev) => ({
        formData: {
          ...prev.formData,
          [name]: value,
        }
    }));
  };

  handleValidations = (type, value) => {
    const { pass, passConfirm } = this.state.formData;
    let errorText;
    switch(type) {
      case 'email':
        errorText = emailValidation(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            emailError: errorText,
          }
        }));
        break;
      case 'pass':
        errorText = passwordValidation(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            passError: errorText,
          }
        }));
        break;
      case 'passConfirm':
        errorText = passwordValidation(value);
        if (pass === passConfirm) {
          this.setState((prevState) => ({
            error: {
              ...prevState.error,
              passConfirmError: errorText,
            }
          }));
        } else if (pass !== passConfirm){
          this.setState((prevState) => ({
            error: {
              ...prevState.error,
              passConfirmError: 'Passwords must match to continue!',
            }
          }));
        }
        break;
        case 'firstName':
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            firstNameError: errorText,
          }
        }));
        break;
        case 'lastName':
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            lastNameError: errorText,
          }
        }));
        break;
        case 'zipCode':
        errorText = zipCodeValidation(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            zipCodeError: errorText,
          }
        }));
        break;
      default:
        break;
    }
  };

  handleBlur = ({ target: {name, value}}) => this.handleValidations(name, value);

  checkErrorBeforeSave = () => {
    const { formData, error } = this.state;
    let errorValue = {};
    let isError = false;
    Object.keys(formData).forEach((val) => {
      if (!formData[val].length) {
        errorValue = {...errorValue, [`${val}Error`] : 'Required'};
        isError = true;
      } else if (error[`${val}Error`]) {
        errorValue = {...errorValue, [`${val}Error`] : error[`${val}Error`]};
        isError = true;
      }
    });
    this.setState({ error: errorValue });
    return isError;
  };

  handleCreateUser = (e) => {
    const { formData } = this.state;
    e.preventDefault();

    const errorCheck = this.checkErrorBeforeSave();
    if (!errorCheck) {
      const cart = shopper.createShopperCart().then((res) => res.id)
      const newBody = {
        email: formData.email,
        firstname: formData.firstName,
        lastname: formData.lastName,
        phone: formData.phone,
        meta: {
          password: formData.pass,
          userCart: cart,
        },
      }
      shopper.postNewUser(newBody)
        .then((res) => {
          this.handleState('userId', res.id);
        })
      this.handleState('signModal', false);
      this.handleState('userSignedIn', true);
    }
  };

  handleSignIn = (e) => {
    const { formData } = this.state;
    e.preventDefault();
    const errorCheck = this.checkErrorBeforeSave();
    if (!errorCheck) {
    }
  };

  render() {
    const {
      formData,
      error,
      inputData,
      button,
      passData,
    } = this.state;

    return (
      <div className={styles.sign_wrap}>
        <div className={styles.radial_wrap}>
          <label>
            <input onChange={this.handleSignUI} type="radio" name="radioResponse" id="signIn" />
            SIGN IN
          </label>
          <label>
            <input onChange={this.handleCreateUI} type="radio" name="radioResponse" id="createAccount" defaultChecked/>
            CREATE ACCOUNT
          </label>
        </div>
        <form onSubmit={button === 'Create Account' ? this.handleCreateUser : this.handleSignIn}>
        {inputData.length ? inputData.map((item) => (
            // file deepcode ignore ReactMissingArrayKeys: <n/a>
            <InputBase
            header={item.header}
            placeholder={item.label}
            type={item.isPass ? passData.passType : item.type}
            value={formData && formData[item.name]}
            onChange={this.handleInputData}
            autoComplete= 'off'
            name={item.name}
            key={item.name}
            onBlur={this.handleBlur}
            errorM={
              (error
              && error[item.error]
              && error[item.error].length > 1)
              ? error[item.error]
              : null
            }
          />
          )) : null}
          <span className={styles.pass_toggle} onClick={this.passVisibility}>{passData.passIcon}</span>
          <div className={styles.btn_wrapper}>
            <InputBase type="submit" value={button} className={styles.main}/>
          </div>
        </form>  
      </div>
    )
  }
};

export default SignIn;