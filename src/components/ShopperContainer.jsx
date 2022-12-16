import React from "react";
import ShopperService from "../services";
import NavBar from "./NavBar/NavBar";
import ProductCard from "./ProductCard/ProductCard";

const shopper = new ShopperService();

class ShopperContainer extends React.Component {

  state = {
    data: [],
    loading: false,
    error: false,
    cartId: '',
    totalItems: 0,
  }

  handleStateData = (name, value) => {
    this.setState(prev => ({
        ...prev,
        [name]: value,
    }));
  }

  componentDidMount() {
    this.setState({ loading: true });

    shopper.getShopperAPI()
      .then((res) => {
        if(res) {
          this.setState({
            data: res.data,
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

    const { data, error, loading, cartId, totalItems } = this.state;
    return(
      <div className="container mt-5">
        <h2>Shopper</h2>
        <NavBar handleStateData={this.handleStateData} data={totalItems} />
        <div className="row justify-content-center">
          { !loading ? data.map(item => (
            <ProductCard data={item} key={item.id} cartId={cartId} handleStateData={this.handleStateData} />
          )) : <div>Loading...</div> }
        </div>
        { error && <h3 className="text-danger">Error loading data 😔</h3> }
      </div>
    )
  }
}

export default ShopperContainer;