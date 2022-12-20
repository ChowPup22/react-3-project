import React from "react";
import styles from './CheckoutSummary.module.css';

class CheckoutSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      isConfirm: false,
      total: 0,
    }
  }

  handleSteps = (name, value) => {
    this.props.handleStep(name, value);
  };

  handleTotal = () => {
    const { cartData } = this.props;
    let total = 0;
    total += parseFloat(cartData.subtotal);
    total += parseFloat(cartData.priceData.shipping);
    total += parseFloat(cartData.priceData.taxes);

    return total.toFixed(2);
  }

  componentDidMount() {
    this.setState({ loading: true });
    const total = this.handleTotal();
    if(total > 0) {
      this.setState({ loading: false, total, isConfirm: true });
    } else {
      this.setState({ loading: false, error: true });
    }
  }

  handleItemSummary = (dataset) => {
    let x = 0;
    let items = [];
    for(; x < dataset.length; x++) {
      if (dataset[x].quantity > 0) {
        let newItem = {
          img: dataset[x].img,
          alt: dataset[x].name,
          key: dataset[x].id,
          title: dataset[x].name,
          quantity: dataset[x].quantity,
          productTotal: dataset[x].itemTotal,
        }
        items.push(newItem);
      }
    }
    return items;
  };

  handleConfirm = () => {
    this.handleSteps('step', 'confirmation');
  }

  handleReturn = () => {
    this.handleSteps('step', 'payment');
  }

  render() {
    const {
      loading,
      error,
      total,
      isConfirm
    } = this.state;

    const {
      cartData,
      shippingData,
      paymentData,
    } = this.props;

    const imgStyle = {
      width: '25px',
      height: '25px'
    };

    const handleCardTrim = () => {
      const card = paymentData.card;
      const trim = card.slice(15, 19)

      return trim;
    }

    const items = this.handleItemSummary(cartData.items);
    return (
      <>
      {loading ? <div className="text-success">Loading...</div> : 
      !error &&
        <div className={styles.checkout_wrap}>
          <h5>SUMMARY</h5>
          <br />
          <hr />
          { isConfirm && items.length ? 
            <div>
              {items.map(item => {
                return (
                  <div className={styles.item_sum_wrap} key={item.key}>
                    <img src={item.img} alt={item.alt} style={imgStyle} />
                    <p className={styles.item_sum_title}>{item.title}</p>
                    <p className={styles.quantity}>{item.quantity}</p>
                    <p className={styles.item_sum_total}>${(item.productTotal)}</p>
                  </div>
                )
              })}
              <hr />
            </div>
          : null}
          <div className="d-flex flex-row justify-content-between">
            { isConfirm && shippingData ? 
              <div className={styles.shipping_sum_wrap}>
                <h5>Shipping to:</h5>
                <br />
                <p>{shippingData.addresseeName}</p>
                <p>{shippingData.streetAddress}</p>
                <p>{shippingData.city+', '+shippingData.state+' '+ shippingData.zipCode}</p>
                <p>{shippingData.cellPhone}</p>
              </div>
            : null}
            <div className={styles.total_wrap}>
              <div className={`${styles.subtotal} ${styles.pair_wrap}`}>
                <p>Cart Subtotal: </p>
                <p className={styles.b_total}>${cartData.subtotal}</p>
              </div>
              <div className={`${styles.sH} ${styles.pair_wrap}`}>
                <p>Shipping Cost: </p>
                <p className={styles.b_total}>{'$'+cartData.priceData.shipping}</p>
              </div>
              <div className={`${styles.sH} ${styles.pair_wrap}`}>
                <p>Taxes: </p>
                <p className={styles.b_total}>{'$'+cartData.priceData.taxes}</p>
              </div>
              <p className={styles.total}>Cart Total: </p>
              <p className={`${styles.p_total} ${styles.b_total}`}>${total}</p>
            </div>
          </div>
          <hr className={styles.hr_bottom} />
          <div>
            <span className={styles.pay_confirm_span}>Paying with card ending in {handleCardTrim()}</span>
          </div>
          <input type="button" value="BACK" className={styles.btn_return} onClick={this.handleReturn} />
          <button className="btn btn-success btn-lg ms-5 mb-3" onClick={this.handleConfirm}>Confirm Payment</button>
        </div>
      }
      { error && <h3 className="text-danger">Error loading data... 😔</h3> }
      </>
    )
  }
}

export default CheckoutSummary;