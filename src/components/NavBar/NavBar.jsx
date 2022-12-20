import React from "react";
import styles from "./NavBar.module.css";
import { CART_ICON, USER_ICON, USER_CHECK_ICON } from "../../Constants/Icons";
import SignIn from "../SignIn/SignIn";
import UserCart from "../UserCart/UserCart";
import ShippingInfo from "../ShippingInfo/ShippingInfo";
import PaymentInfo from "../PaymentInfo/PaymentInfo";
import CheckoutSummary from "../CheckoutSummary/CheckoutSummary";
import Confirmation from "../Confirmation/Confirmation";


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSignedIn: false,
      userCartModal: false,
      step: 'cart',
      signModal: false,
      signOutModal: false,
      userId: '',
    }
  }

  handleState = (name, value) => {
    this.props.handleStateData(name, value);
  };

  handleSignModal = () => {
    const { signModal } = this.state;
    
    if (signModal) {
      document.body.classList.remove('active-modal');
      this.setState({
        signModal: false,
      });
    } else if (!signModal) {
      document.body.classList.add('active-modal');
      this.setState({
        signModal: true,
      });
    }
  }

  handleSignOutModal = () => {
    const { signOutModal } = this.state;
    
    if (signOutModal) {
      document.body.classList.remove('active-modal');
      this.setState({
        signOutModal: false,
      });
    } else if (!signOutModal) {
      document.body.classList.add('active-modal');
      this.setState({
        signOutModal: true,
      });
    }
  }
  
  handleCartModal = () => {
    const { userCartModal } = this.state;
    
    if (userCartModal) {
      document.body.classList.remove('active-modal');
      this.setState({
        userCartModal: false,
      });
    } else if (!userCartModal) {
      document.body.classList.add('active-modal');
      this.setState({
        userCartModal: true,
      });
    }
  }

  handleFormData = (name, value) => {
    if(name === 'totalItems') this.handleState(name, value);
    this.setState(prev => ({
        ...prev,
        [name]: value,
    }));
  }

  handleUserCart = () => {
    const { userSignedIn } = this.state;
    if(userSignedIn) {
      document.body.classList.add('active-modal');
      this.setState({
        userCartModal: true,
      });
    } else if(!userSignedIn) {
      document.body.classList.add('active-modal');
      this.setState({
        signModal: true,
      });
    }
  }

  handleUser = () => {
    const { userSignedIn } = this.state;
    if(userSignedIn) {
      document.body.classList.add('active-modal');
      this.setState({
        signOutModal: true,
      });
    } else if(!userSignedIn) {
      document.body.classList.add('active-modal');
      this.setState({
        signModal: true,
      })
    }
  }

  handleSignOut = () => {
    this.setState({
      userSignedIn: false,
      signOutModal: false,
      userId: '',
    });
    document.body.classList.remove('active-modal');
  }

  render() {
    const {
      userSignedIn,
      userCartModal,
      signModal,
      signOutModal,
      step,
      userId,
    } = this.state;
    const { data, cartData, shippingData, paymentData } = this.props;

    const steps = {
      'cart': <UserCart cartData={cartData} handleState={this.handleState} handleStep={this.handleFormData} />,
      'shipping': <ShippingInfo handleState={this.handleState} handleStep={this.handleFormData} cartData={cartData} />,
      'payment': <PaymentInfo handleState={this.handleState} handleStep={this.handleFormData} />,
      'checkout': <CheckoutSummary cartData={cartData} shippingData={shippingData} paymentData={paymentData} handleStep={this.handleFormData} />,
      'confirmation': <Confirmation user={userId} handleState={this.handleState} handleStep={this.handleFormData} cartData={cartData} />,
    }

    return (
      <>
        <div className={styles.cart_button}>
          <button type="button" className="btn btn-success me-3" onClick={this.handleUser}>{userSignedIn ? USER_CHECK_ICON :USER_ICON}</button>
          <button type="button" className="btn btn-success position-relative" onClick={this.handleUserCart}>
            {CART_ICON}
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {data ? <span>{data}</span> : null}
            </span>
          </button>
        </div>
        {signModal && (
          <div className={styles.modal_wrap}>
            <div className={styles.modal}>
              <div className={styles.overlay} onClick={this.handleSignModal}></div>
              <div className={styles.modal_content}>
                <SignIn handleFormData={this.handleFormData} />
                <button
                  className={styles.close_modal}
                  onClick={this.handleSignModal}
                >X</button>
              </div>
            </div>
          </div>  
      )}
      {signOutModal && (
        <div className={styles.modal_wrap}>
          <div className={styles.modal}>
            <div className={styles.overlay} onClick={this.handleSignModal}></div>
            <div className={styles.modal_content}>
                <div>
                  <h3>Sign Out?</h3>
                  <button type="button" className="btn btn-danger" onClick={this.handleSignOut}>Yes</button>
                  <button type="button" className="btn btn-secondary" onClick={this.handleSignOutModal}>No</button>
                </div>
              <button
                className={styles.close_modal}
                onClick={this.handleSignOutModal}
              >X</button>
            </div>
          </div>
        </div>
      )}
      {userCartModal && (
        <div className={styles.modal_wrap}>
          <div className={styles.modal}>
            <div className={styles.overlay} onClick={this.handleCartModal}></div>
            <div className={styles.modal_content}>
              { steps[step] }
              <button
                className={styles.close_modal}
                onClick={this.handleCartModal}
              >X</button>
            </div>
          </div>
        </div>
      )}
      </>
    );
  }
}

export default NavBar;