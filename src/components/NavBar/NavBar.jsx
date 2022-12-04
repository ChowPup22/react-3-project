import React from "react";
import styles from "./NavBar.module.css";
import { CART_ICON, USER_ICON } from "../../Constants/Icons";
import ShopperService from "../../services";
import SignIn from "../SignIn/SignIn";

const shopper = new ShopperService();

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSignedIn: false,
      userCart: false,
      signModal: false,
      userId: '',
    }
  }

  handleModal = () => {
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

  handleFormData = (name, value) => {
    this.setState(prev => ({
        ...prev,
        [name]: value,
    }));
  }

  handleUserCart = () => {
    const { userSignedIn, userCart, userId } = this.state;
    if(userSignedIn) {
      
    }
  }

  handleUser = () => {
    const { userSignedIn } = this.state;
    if(userSignedIn) {
      // show user profile  
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
      userCart,
      signModal
    } = this.state;
    const x = 2;
    return (
      <>
        <div className={styles.cart_button}>
          <button type="button" className="btn btn-primary me-3" onClick={this.handleUser}>{USER_ICON}</button>
          <button type="button" className="btn btn-primary position-relative" onClick={this.handleUserCart}>
            {CART_ICON}
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {x ? <span>{x}</span> : null}
            </span>
          </button>
        </div>
        {signModal && (
          <div className={styles.modal_wrap}>
            <div className={styles.modal}>
              <div className={styles.overlay} onClick={this.handleModal}></div>
              <div className={styles.modal_content}>
                <SignIn handleFormData={this.handleFormData} />
                <button
                  className={styles.close_modal}
                  onClick={this.handleModal}
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