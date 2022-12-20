import { HEADERS, SHOPPER_URL } from "./Constants/API.js";

class ShopperService {

  async getShopperAPI() {
    return new Promise(async ( success, failure ) => {
      try {
        const response = await fetch(`${SHOPPER_URL}/products`, {method: 'GET', headers: HEADERS})
        if (response.ok) {
          let data = [];
          const json = await response.json();
          data = json.data
            .map(item => ({
              name: item.name,
              id: item.id,
              desc: item.description.replace(/(<p[^>]+?>|<p>|<\/p>)/img, " "),
              price: item.price.raw,
              inventory: item.inventory.available,
              category: item.categories[0].id,
              img: item.image.url,
            }));
          const response2 = await fetch(`${SHOPPER_URL}/products?page=2`, {method: 'GET', headers: HEADERS})
          if (response2.ok) {
            const json2 = await response2.json();
            data = data.concat(json2.data
              .map(item => ({
                name: item.name,
                id: item.id,
                desc: item.description.replace(/(<p[^>]+?>|<p>|<\/p>)/img, " "),
                price: item.price.raw,
                inventory: item.inventory.available,
                category: item.categories[0].id,
                img: item.image.url,
              })));
          }
          success({ data, response });
        } else {
          const json = await response.json();
          failure( {error: `Error ${json.status_code}: ${json.error.message}`} );
          alert(`Error ${json.status_code}: ${json.error.message}`);
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

  async getShopperCategories() {
    return new Promise(async ( success, failure ) => {
      try {
        const response = await fetch(`${SHOPPER_URL}/categories`, {method: 'GET', headers: HEADERS})
        if (response.ok) {
          const json = await response.json();
          const data = json.data
            .map(item => ({
              name: item.name,
              id: item.id,
            }));
          success({ data, response });
        } else {
          const json = await response.json();
          failure( {error: `Error ${json.status_code}: ${json.error.message}`} );
          alert(`Error ${json.status_code}: ${json.error.message}`);
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
          success( data, response );
        } else {
          const json = await response.json();
          failure( {error: `Error ${json.status_code}: ${json.error.message}`} );
          alert(`Error ${json.status_code}: ${json.error.message}`);
        }
      } catch (error) {
        failure(error);
      }
    })
  }

  async getUserById(id) {
    return new Promise(async ( success, failure ) => {
      try {
        const response = await fetch(`${SHOPPER_URL}/customers/${id}`, {method: 'GET', headers: HEADERS})
        if(response.ok) {
          const json = await response.json();
          const data = {
            id: json.id,
            firstName: json.firstname,
            lastName: json.lastname,
            email: json.email,
            phone: json.phone,
            meta: json.meta,
          };
          success( data, response );
        } else {
          const json = await response.json();
          failure( {error: `Error ${json.status_code}: ${json.error.message}`} );
          alert(`Error ${json.status_code}: ${json.error.message}`);
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
          failure( {error: `Error ${json.status_code}: ${json.error.message}`} );
          alert(`Error ${json.status_code}: ${json.error.message}`);
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
}

export default ShopperService;