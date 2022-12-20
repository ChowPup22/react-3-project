import React from "react";

class UserCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
    }
  }

  handleSubtotal = () => {
    const { cartData } = this.props;
    let newSubtotal = 0;
    cartData.items.forEach((item) => {
      newSubtotal += parseFloat(item.itemTotal);
    });
    return newSubtotal.toFixed(2);
  }

  componentDidMount() {
    const { cartData } = this.props;
    this.setState({ loading: true});

    if(cartData) {
      cartData.subtotal = this.handleSubtotal();
      this.setState({ loading: false });
    } else {
      this.setState({ loading: false, error: true });
    }

  }

  handleRemoveItem = (e) => {
    e.preventDefault();
    const index = this.props.cartData.items.findIndex((item) => item.id === e.target.id);
    this.props.cartData.totalItems -= this.props.cartData.items[index].quantity;
    this.props.cartData.items.splice(index, 1);
    this.props.cartData.subtotal = this.handleSubtotal();
    this.props.handleState('cartData', this.props.cartData);
  }

  handleIncrease = (e) => {
    e.preventDefault();
    const index = this.props.cartData.items.findIndex((item) => item.id === e.target.id);
    const { inventory, price } = this.props.cartData.items[index];

    if (inventory > e.target.value) {
      const newQuantity = parseInt(e.target.value) + 1;
      const newPrice = (price * newQuantity).toFixed(2);
      this.props.cartData.items[index].quantity = newQuantity;
      this.props.cartData.items[index].itemTotal = newPrice;
      this.props.cartData.totalItems += 1;
      this.props.cartData.subtotal = this.handleSubtotal();
      this.props.handleState('cartData', this.props.cartData);
    } else if (inventory === e.target.value) {
      return;
  };
  }

  handleDecrease = (e) => {
    e.preventDefault();
    const index = this.props.cartData.items.findIndex((item) => item.id === e.target.id);
    const { price } = this.props.cartData.items[index];

    if (e.target.value > 1) {
      const newQuantity = parseInt(e.target.value) - 1;
      const newPrice = (price * newQuantity).toFixed(2);
      this.props.cartData.items[index].quantity = newQuantity;
      this.props.cartData.items[index].itemTotal = newPrice;
      this.props.cartData.totalItems -= 1;
      this.props.cartData.subtotal = this.handleSubtotal();
      this.props.handleState('cartData', this.props.cartData);
    } else if (e.target.value === 0) {
      return;
    }
  }

  handleSubmit = () => {
    const { cartData } = this.props;
    if (cartData.totalItems === 0) {
      alert('Please add items to your cart before proceeding.');
      return;
    } else {
      cartData.priceData.taxes = (cartData.subtotal * 0.07).toFixed(2);
      this.props.handleState('cartData', this.props.cartData);
      this.props.handleStep('step', 'shipping');
    }
  }

  render() {
    const { error, loading } = this.state;
    const { cartData } = this.props;

    return (
      <div style={{ width: '500px' }}>
        <h1>Cart</h1>
        { loading ? <div>Loading...</div> 
        : 
        ( <>
          <br />
          {cartData.totalItems > 0 && cartData.items.map((item) => (
            <div key={item.id} className='d-flex flex-row justify-content-between mb-2'>
              <button id={item.id} className="btn btn-close mt-auto mb-auto" onClick={this.handleRemoveItem}></button>
              <img src={item.img} alt={item.name} style={{width: '50px', height: '50px'}} />
              <div className="fs-5 mt-auto mb-auto">{item.name}</div>
              <div className="input-group w-25 fs-5">
              <button id={item.id} className="input-group-text" value={item.quantity} onClick={this.handleDecrease}>-</button>
              <input type="text" className="form-control text-center" pattern="[0-9]" value={item.quantity} readOnly={true}/>
              <button id={item.id} className="input-group-text" value={item.quantity} onClick={this.handleIncrease}>+</button>
            </div>
              <div className="fs-5 mt-auto mb-auto">${item.itemTotal}</div>
            </div>
          ))
          }
          <br />
          <div className="float-end">{`Total Items: ${cartData.totalItems}`}</div>
          <br />
          <div className="float-end">{`Subtotal: $${cartData.subtotal}`}</div>
          <br />
          <br />
          <div>
            <button className="btn btn-success" onClick={this.handleSubmit}>Begin Checkout</button>
          </div>
        </> ) }
        { error && <h3 className="text-danger">Error loading data 😔</h3> }
      </div>
    )
  }
}

export default UserCart;