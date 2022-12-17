import React from "react";
import styles from "./ProductCard.module.css";

class ProductCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productModal: false,
      quantity: 1,
      modalPrice: 0,
      addPopup: false,
      noInvPopup: false,
    }
  }

  handleState = (name, value) => {
    this.props.handleStateData(name, value);
  };

  componentDidMount() {
    const { price } = this.props.data;
    this.setState({
      productModal: false,
      modalPrice: price,
    });
  }

  handleModal = () => {
    const { productModal } = this.state;
    
    if (productModal) {
      document.body.classList.remove('active-modal');
      this.setState({
        productModal: false,
      });
    } else if (!productModal) {
      document.body.classList.add('active-modal');
      this.setState({
        productModal: true,
      });
    }
  }

  handleIncrease = (e) => {
    e.preventDefault();
    const { inventory, price } = this.props.data;
    if (inventory > e.target.value) {
      const newQuantity = parseInt(e.target.value) + 1;
      const newPrice = (price * newQuantity).toFixed(2);
      this.setState({ quantity: newQuantity, modalPrice: newPrice });
    } else if (inventory === e.target.value) {
      return;
  };
  }

  handleDecrease = (e) => {
    e.preventDefault();
    const { price } = this.props.data;
    if (e.target.value >= 1) {
      const newQuantity = parseInt(e.target.value) - 1;
      const newPrice = (price * newQuantity).toFixed(2);
      this.setState({ quantity: newQuantity, modalPrice: newPrice });
    } else if (e.target.value === 0) {
      return;
    }
  }

  handlePopup = (name) => {
    const { addPopup, noInvPopup } = this.state;

    if (name === 'add' && !addPopup) {
      this.setState({ addPopup: true });
      setTimeout(() => {
        this.setState({ addPopup: false });
      }, 2000);
    } else if (name === 'no' && !noInvPopup) {
      this.setState({ noInvPopup: true });
      setTimeout(() => {
        this.setState({ noInvPopup: false });
      }, 2000);
    }
  }

  handleTotalItems = () => {
    const { cartData } = this.props;
    let total = 0;
    cartData.items.forEach(item => {
      total += item.quantity;
    });
    return total;
  }

  handleAddToCart = (e) => {
    e.preventDefault();
    const { modalPrice, quantity } = this.state;
    const { id, img, inventory, name, price } = this.props.data;
    const { cartData } = this.props;

    const newBody = {
      id: id,
      img: img,
      name: name,
      quantity: quantity,
      price: price,
      inventory: inventory,
      itemTotal: modalPrice,
    }

    const itemTotal = this.handleTotalItems() + quantity;
    const index = cartData.items.findIndex(item => item.id === id)

    if (index >= 0) {
      const newQuantity = cartData.items[index].quantity + quantity;
      if (newQuantity <= inventory) {
        cartData.items[index].quantity = newQuantity;
        cartData.items[index].itemTotal = (newQuantity * price).toFixed(2);
        cartData.totalItems = itemTotal;
        this.handleState('cartData', cartData);
        this.handlePopup('add');
      } else if (newQuantity > inventory) {
        this.handlePopup('no');
      }
    } else {
      cartData.items.push(newBody);
      cartData.totalItems = itemTotal;
      this.handleState('cartData', cartData);
      this.handlePopup('add');
    }
  }

  render() {
    const {
      name,
      desc,
      price,
      inventory,
      img,
    } = this.props.data;

    const { productModal, quantity, addPopup, noInvPopup } = this.state;

    const invStyle = inventory > 0 ? 'text-success' : 'text-danger text-decoration-line-through';
    const invBtn = inventory > 0 ? "Add to Cart" : "Out of Stock";
    const hoverText = inventory > 0 ? "View Product" : "Out of Stock";
  return (
    <>
      <div className={["col-md-3 m-3 d-block text-center", styles.div_hover]}>
        <div className={["card px-3 py-3 position-relative shadow", styles.div_hover]} style={{height: '300px'}}>
          <a className={styles.div_hover} href='#'>
            <div onClick={this.handleModal} className={styles.hidden}>{hoverText}</div>
            { addPopup && <div className={styles.popup}>Added to Cart!</div> }
            { noInvPopup && <div className={styles.noPopup}>Not enough inventory!</div> }
            <h3 className="card-title">{name}</h3>
            <img src={img} alt={name} className={styles.product_img}/>
          </a>
          <p className={["card-text position-absolute start-0 bottom-0 ps-2", invStyle]} style={{marginBottom: '10px', marginLeft: '10px', fontWeight: '800'}}>${price}</p>
          <button
            disabled={invBtn === 'Out of Stock'}
            type="button"
            className={invBtn === 'Out of Stock' ?
               "position-absolute btn btn-danger btn-sm w-50 end-0 bottom-0" 
               : "position-absolute btn btn-success btn-sm w-50 end-0 bottom-0"}
            style={{marginBottom: '5px', marginRight: '5px'}}
            onClick={this.handleAddToCart}
            >{invBtn}</button>
        </div>
      </div>
      {productModal && (
        <div className={styles.modal}>
          <div className={styles.overlay} onClick={this.handleModal}></div>
          <div className={styles.modal_content}>
          { addPopup && <div className={styles.popup}>Added to Cart!</div> }
          { noInvPopup && <div className={styles.noPopup}>Not enough inventory!</div> }
            <h2>{name}</h2>
            <img src={img} alt={name} />
            <p>{desc}</p>
            <div className="card-text d-flex justify-content-between mb-3">
              <p className={invStyle}>Unit Price: <b>${price}</b></p>
              <p className={invStyle}>Inventory Available: <b>{inventory}</b></p>
            </div>
            <button
              className={styles.close_modal}
              onClick={this.handleModal}
            >X</button>
            <div className="input-group w-25 position-absolute start-0 bottom-0" style={{marginBottom: '18px', marginLeft: '18px'}}>
              <button className="input-group-text" value={quantity} onClick={this.handleDecrease}>-</button>
              <input type="text" className="form-control text-center" pattern="[0-9]" value={quantity} readOnly={true}/>
              <button className="input-group-text" value={quantity} onClick={this.handleIncrease}>+</button>
            </div>
            <p className="card-text mt-3 w-25 mx-auto">Total Price: <b>${(price * quantity).toFixed(2)}</b></p>
            <button
            disabled={invBtn === 'Out of Stock'}
            type="button"
            className={invBtn === 'Out of Stock' ?
              "position-absolute btn btn-danger btn-sm w-25 end-0 bottom-0" :
              "position-absolute btn btn-success btn-sm w-25 end-0 bottom-0"}
            style={{marginBottom: '18px', marginRight: '18px', fontSize: '1.3rem'}}
            onClick={this.handleAddToCart}
            >{invBtn}</button>
          </div>
        </div>
      )}
    </>
  )
  }
}

export default ProductCard;