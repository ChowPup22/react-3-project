import React from "react";
import styles from "./UserCart.module.css";
import ShopperService from "../../services";

const shopper = new ShopperService();

class UserCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartData: {},
      shippingInfo: {},
      loading: false,
      error: false,
    }
  }

  componentDidMount() {
    this.setState({ loading: true});

    shopper.getShopperCart(this.props.data)
      .then((res) => {
        if(res) {
          this.setState({
            cartData: res,
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
      })
  }

  render() {
    const { cartData, error, loading } = this.state;
    return (
      <div className={styles.cart_wrap}>
        <h1>Test Cart</h1>
        { loading ? <div>Loading...</div> : null }
        { error && <h3 className="text-danger">Error loading data 😔</h3> }
      </div>
    )
  }
}

export default UserCart;