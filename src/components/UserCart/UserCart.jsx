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
          console.log(res);
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
        { loading ? <div>Loading...</div> 
        : 
        ( <>
          <br />
          {cartData.totalItems > 0 && cartData.items.map((item) => (
            <div key={item.id} className='d-flex flex-row justify-content-between'>
              <div>{item.name}</div>
              <div>{item.quantity}</div>
              <div>{item.lineTotal}</div>
            </div>
          ))
          }
          <br />
          <div className="float-end">{`Total Items: ${cartData.totalItems}`}</div>
          <br />
          <div className="float-end">{`Subtotal: ${cartData.subtotal}`}</div>
          <br />
          <br />
          <div>
            <button className="btn btn-success">Checkout</button>
          </div>
        </> ) }

        { error && <h3 className="text-danger">Error loading data 😔</h3> }
      </div>
    )
  }
}

export default UserCart;