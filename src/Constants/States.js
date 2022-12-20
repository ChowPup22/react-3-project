import { hidden } from "./Icons";

export const INIT_FORM = {
  email: '',
  pass: '',
  passConfirm: '',
  firstName: '',
  lastName: '',
};

export const INIT_CART = {
    items: [],
    totalItems: 0,
    subtotal: '',
    priceData: {
      taxes: '',
      shipping: '',
      total: '',
    },
}

export const INIT_SHIPPING_DATA = {
  addresseeName: '',
  streetAddress: '',
  country: '',
  city: '',
  state: '',
  zipCode: '',
  cellPhone: '',
  shippingMethod: '',
};

export const INIT_PASS = {
  passVisible: false,
  passIcon: hidden,
  passType: 'password',
};

export const INIT_CREATE = [
  {header: 'Your E-Mail Address', label: '', name: 'email', type: 'text', error: 'emailError'},
  {header: 'Create Password', label: '', name: 'pass', type: 'password', error: 'passError', id: 'password', isPass: true},
  {header: 'Confirm Password', label: '', name: 'passConfirm', type: 'password', error: 'passConfirmError', id: 'password', isPass: true},
  {header: 'First Name', label: '', name: 'firstName', type: 'text', error: 'firstNameError'},
  {header: 'Last Name', label: '', name: 'lastName', type: 'text', error: 'lastNameError'},
];

export const INIT_SIGN = [
  {header: 'Enter E-Mail *', label: '', name: 'email', type: 'text', error: 'emailError'},
  {header: 'Enter Password *', label: '', name: 'pass', type: 'password', error: 'passError', id: 'password', isPass: true},
];

export const INIT_SHIPPING_INPUT = [
  {header: 'Full Name', label: '', name: 'addresseeName', type: 'text', error: 'addresseeNameError'},
  {header: 'Street Address', label: '', name: 'streetAddress', type: 'text', error: 'streetAddressError'},
  {header: 'Country', label: '', name: 'country', type: 'select', error: 'countryError', id:'country'},
  {header: 'State', label: '', name: 'state', type: 'select', error: 'stateError', id:'state'},
  {header: 'City', label: '', name: 'city', type: 'select', error: 'cityError', id:'city'},
  {header: 'Zip Code', label: '', name: 'zipCode', type: '', error: 'zipCodeError'},
  {header: 'Cell Phone Number', label: '', name: 'cellPhone', type: 'text', error: 'cellPhoneError'},
]