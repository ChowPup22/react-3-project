import React from "react";
import { CONFIRM_ICON } from "../../Constants/Icons";
import styles from './Confirmation.module.css';
import ShopperService from "../../services";

const shopper = new ShopperService();

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      loading: false,
      error: false,
    }
  }

  handleState = (name, value) => {
    this.props.handleState(name, value);
  };

  handleStep = (name, value) => {
    this.props.handleStep(name, value);
  }

  componentDidMount() {
    this.setState({ loading: true });
    shopper.getUserById(this.props.user).then((res) => {
      if(res){
        this.setState({
          user: res,
          loading: false,
        });
      } else {
        this.setState({ loading: false });
      }
    }, (error) => {
      console.log(error);
      this.setState({
        loading: false,
        error: true,
      });
    });
  }

  handleConfirmCode = () => {
    let lower = 'abcdefghijklmnopqrstuvwxyz';
    let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let num = '0123456789';
    let code1 = lower.charAt(Math.floor(Math.random()* lower.length)) + lower.charAt(Math.floor(Math.random()* lower.length)) + num.charAt(Math.floor(Math.random()* num.length)) + '-';
    let code2 = lower.charAt(Math.floor(Math.random()* lower.length)) + upper.charAt(Math.floor(Math.random()* upper.length)) + upper.charAt(Math.floor(Math.random()* upper.length)) + lower.charAt(Math.floor(Math.random()* lower.length)) + '_';
    let code3 = num.charAt(Math.floor(Math.random()* num.length)) + num.charAt(Math.floor(Math.random()* num.length))+ upper.charAt(Math.floor(Math.random()* upper.length)) + num.charAt(Math.floor(Math.random()* num.length)) + '_';
    let code4 = num.charAt(Math.floor(Math.random()* num.length)) + upper.charAt(Math.floor(Math.random()* upper.length)) + lower.charAt(Math.floor(Math.random()* lower.length)) + upper.charAt(Math.floor(Math.random()* upper.length)) + '-';
    let code5 = lower.charAt(Math.floor(Math.random()* lower.length)) + num.charAt(Math.floor(Math.random()* num.length)) + upper.charAt(Math.floor(Math.random()* upper.length));

    return 'SHOPPER# '+code1+code2+code3+code4+code5;
  }

  handleCopyCode = (e) => {
      navigator.clipboard.writeText(e.target.innerText);
      e.preventDefault();
  }

  handleReturn = () => {
    const cart = {
      items: [],
      totalItems: 0,
      subtotal: '',
      priceData: {
        taxes: '',
        shipping: '',
        total: '',
      },
  };

    this.handleState('cartData', cart);
    this.handleState('shippingData', {});
    this.handleState('paymentData', {});
    this.handleStep('userCartModal', false);
    this.handleStep('step', 'cart');
  }
  
  render() {
    const { user, loading, error } = this.state;
    const confirmCode = this.handleConfirmCode();
    return (
        <>
          {loading ? <div className='text-success'>Loading...</div> :
            <div className={styles.confirm_wrap}>
            <h2>Confirmation: </h2>
            <br />
            <br />
            <br />
            <div className={styles.icon_wrap}>{CONFIRM_ICON}</div>
            <p>Thank you <b>{user.firstName}</b> for your purchase!</p>
            <h5>Your confirmation code is: </h5>
            <span style={{fontSize: '10px'}}>CLICK TO COPY</span>
            <div className={styles.confirm_code} onClick={this.handleCopyCode}>
              <p id='code'>{confirmCode}</p>
            </div>
            <input type="button" value="BACK TO HOME" className={styles.btn_return} onClick={this.handleReturn} />
          </div> 
          }
          {error ? <div className='text-danger'>Error: Something went wrong!</div> : null}
        </>
    )
  }
}

export default Confirmation;