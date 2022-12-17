import React from "react";
import styles from "./NavBar.module.css";
import { CART_ICON, USER_ICON, USER_CHECK_ICON } from "../../Constants/Icons";
import SignIn from "../SignIn/SignIn";
import UserCart from "../UserCart/UserCart";


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSignedIn: false,
      userCartModal: false,
      signModal: false,
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
      // sign out user modal/ confirm sign out
    } else if(!userSignedIn) {
      document.body.classList.add('active-modal');
      this.setState({
        signModal: true,
      })
    }
  }

  render() {
    const {
      userSignedIn,
      userCartModal,
      signModal
    } = this.state;
    const { data, cartData } = this.props;
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
      {userCartModal && (
        <div className={styles.modal_wrap}>
          <div className={styles.modal}>
            <div className={styles.overlay} onClick={this.handleCartModal}></div>
            <div className={styles.modal_content}>
              <UserCart cartData={cartData} handleStateData={this.handleState}/>
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