import React from 'react';
import styles from './SignIn.module.css';
import InputBase from '../InputBase/InputBase';
import { validations} from '../../Constants/Validations';
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
      users: [],
    }
  }

  async getUsers() {
    const users = await shopper.getAllUsers();
    this.setState({ users });
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
    this.getUsers();
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
    const { pass } = this.state.formData;

    const validationSign = {
      ...validations,
      passConfirm: (value) => (pass === value) ? null : 'Passwords do not match',
    }

    const errorText = validationSign[type](value);
    this.setState((prevState) => ({
      error: {
        ...prevState.error,
        [`${type}Error`]: errorText,
      }
    }));
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

  handleCreateUser = async (e) => {
    const { formData } = this.state;
    e.preventDefault();

    const errorCheck = this.checkErrorBeforeSave();
    if (!errorCheck) {
      const cart = await shopper.createShopperCart().then((res) => res.id)
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
          this.handleState('cartId', res.meta.userCart);
        })
      this.handleState('signModal', false);
      this.handleState('userSignedIn', true);
    }
  };

  handleSignIn = (e) => {
    const { formData, users } = this.state;
    e.preventDefault();
    const errorCheck = this.checkErrorBeforeSave();
    if (!errorCheck) {
      const user = users.find((item) => item.email === formData.email);
      if (user) {
        if (user.meta.password === formData.pass) {
          this.handleState('userId', user.id);
          this.handleState('cartId', user.meta.userCart);
          this.handleState('signModal', false);
          this.handleState('userSignedIn', true);
        } else {
          this.setState({
            error: {
              passError: 'Incorrect password',
            }
          });
        }
      } else {
        this.setState({
          error: {
            emailError: 'Email does not exist',
          }
        });
      }
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
            <InputBase type="submit" value={button} className={styles.main} onSubmit={button === 'Sign In' ? this.handleSignIn : this.handleCreateUser }/>
          </div>
        </form>  
      </div>
    )
  }
};

export default SignIn;