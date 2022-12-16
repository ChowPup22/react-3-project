import React from "react";
import styles from "./ShopperContainer.module.css";
import ShopperService from "../services";
import NavBar from "./NavBar/NavBar";
import ProductCard from "./ProductCard/ProductCard";

const shopper = new ShopperService();

class ShopperContainer extends React.Component {

  state = {
    data: [],
    dataReset: [],
    loading: false,
    error: false,
    cartId: '',
    categories: [],
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
            dataReset: res.data,
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

    shopper.getShopperCategories()
      .then((res) => {
        if(res) {
          this.setState({
            categories: res.data,
          });
        }
      });
  }

  handleFilter = (e) => {
    this.setState({ loading: true });
    const { value } = e.target;
    const { dataReset } = this.state;
    console.log(value);

    if(value === '0') {
      shopper.getShopperAPI()
      .then((res) => {
        if(res) {
          this.setState({
            data: res.data,
            dataReset: res.data,
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
    } else {
      const filterData = dataReset.filter(item => item.category === value);
      this.setState({
        data: filterData,
        loading: false,
      });
    }
  }

  handleSearch = (e) => {
    const { value } = e.target;
    const { dataReset } = this.state;
    
    if(value === '') {
      this.setState({
        data: dataReset,
      });
    } else {
      const filterData = dataReset.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
      this.setState({
        data: filterData,
      });
    }
  }

  render() {

    const { data, error, loading, cartId, categories, totalItems } = this.state;
    return(
      <div className="container mt-5">
        <h2 className="text-success fw-bolder fs-1 fst-italic mb-3">Shopper</h2>
        <NavBar handleStateData={this.handleStateData} data={totalItems} />
        <div className={styles.form_floating}>
          <input
            type="text"
            className={styles.form_control}
            id="product_search"
            placeholder=""
            onChange={this.handleSearch}
          />
          <label for="product_search">Product Search</label>
        </div>
        { categories.length > 0 && 
          <select
          name="Categories"
          id="categories"
          className="mb-2"
          onChange={this.handleFilter}
          style={{border: '3px solid rgb(25, 135, 87)', borderRadius: '4px'}}>
            <option value="0">All</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        }
        <br />
        <div className="row justify-content-center" style={{border: '4px solid #0de37f', borderRadius: '50px'}}>
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