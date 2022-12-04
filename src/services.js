import { HEADERS, SHOPPER_URL } from "./Constants/API.js";


class ShopperService {

  async getShopperAPI() {
    return new Promise(async ( success, failure ) => {
      try {
        const response = await fetch(`${SHOPPER_URL}/products`, {method: 'GET', headers: HEADERS})
        if (response.ok) {
          const json = await response.json();
          const data = json.data
            .map(item => ({
              name: item.name,
              id: item.id,
              desc: item.description.replace(/(<p[^>]+?>|<p>|<\/p>)/img, " "),
              price: item.price.raw,
              inventory: item.inventory.available,
              category: item.categories.name,
              img: item.image.url,
            }));
          success({ data, response });
        } else {
          const json = await response.json();
          failure( {error: `Error ${json.status_code}: ${json.error.message} -- ${json.error.errors.email}`} );
          alert(`Error ${json.status_code}: ${json.error.message} -- ${json.error.errors.email}`);
        }
      } catch(error) {
        console.log(error);
        if(error.status_code === 400) {
          failure({error: `Bad Request: ${error.type} -- ${error.message}`}, error);
        } else {
          failure({error: `Server Error: ${error.message}`}, error);
        }
      }
    })
  }

  async getAllUsers () {
    return new Promise(async ( success, failure ) => {
      try {
        const response = await fetch(`${SHOPPER_URL}/customers`, {method: 'GET', headers: HEADERS})
        if(response.ok) {
          const json = await response.json();
          const data = json.data.map(item => ({
            id: item.id,
            email: item.email,
            firstName: item.firstname,
            meta: item.meta,
          }));
          console.log(data);
          success( data, response );
        } else {
          const json = await response.json();
          failure( {error: `Error ${json.status_code}: ${json.error.message} -- ${json.error.errors.email}`} );
          alert(`Error ${json.status_code}: ${json.error.message} -- ${json.error.errors.email}`);
        }
      } catch (error) {
        failure(error);
      }
    })
  }

  async postNewUser(body) {
    return new Promise(async ( success, failure ) => {
      try {
        const response = await fetch(`${SHOPPER_URL}/customers`, {method: 'POST', headers: HEADERS, body: JSON.stringify(body)})
        if(response.ok) {
          const json = await response.json();
          console.log(json);
          const data = {
            id: json.id,
            firstName: json.firstname,
            lastName: json.lastname,
            email: json.email,
            phone: json.phone,
            meta: json.meta,
          };
          success( data, response );
          return data;
        } else if(response.status === 403) {
          failure( {error: 'Forbidden'}, response );
        } else {
          const json = await response.json();
          failure( {error: `Error ${json.status_code}: ${json.error.message} -- ${json.error.errors.email}`} );
          alert(`Error ${json.status_code}: ${json.error.message} -- ${json.error.errors.email}`);
        }
      } catch (error) {
        console.log(error);
        if(error.status_code === 400) {
          failure({error: `Bad Request: ${error.type} -- ${error.message}`}, error);
        } else {
          failure({error: `Server Error: ${error.message}`}, error);
          alert(`Server Error: ${error.message}`);
        }
      } 
    })
  }

  async createShopperCart() {
    return new Promise(async ( success, failure ) => {
      try {
        const response = await fetch(`${SHOPPER_URL}/carts`, {method: 'GET', headers: HEADERS})
        if(response.ok) {
          const json = await response.json();
          const data = {
            id: json.id,
            totalItems: json.total_items,
            subtotal: json.subtotal.formatted_with_symbol,
            items: json.line_items.map(item => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              lineTotal: item.line_total.formatted_with_symbol
            })),
          };
          success( data, response );
        } else {
          const json = await response.json();
          failure( {error: `Error ${json.status_code}: ${json.error.message} -- ${json.error.errors.email}`} );
          alert(`Error ${json.status_code}: ${json.error.message} -- ${json.error.errors.email}`);
        }
      } catch (error) {
        console.log(error);
        if(error.status_code === 400) {
          failure({error: `Bad Request: ${error.type} -- ${error.message}`}, error);
        } else {
          failure({error: `Server Error: ${error.message}`}, error);
        }
      }
    })
  }

  async getShopperCart(cartId) {
    return new Promise(async ( success, failure ) => {
      try {
        const response = await fetch(`${SHOPPER_URL}/carts/${cartId}`, {method: 'GET', headers: HEADERS})
        if(response) {
          const json = await response.json();
          const data = {
            id: json.id,
            totalItems: json.total_items,
            subtotal: json.subtotal.formatted_with_symbol,
            items: json.line_items.map(item => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              lineTotal: item.line_total.formatted_with_symbol
            })),
          };
          success( data, response );
        } else {
          const json = await response.json();
          failure( {error: `Error ${json.status_code}: ${json.error.message} -- ${json.error.errors.email}`} );
          alert(`Error ${json.status_code}: ${json.error.message} -- ${json.error.errors.email}`);
        }
      } catch (error) {
        failure(error);
      }
    })
  }
}

export default ShopperService;