import { hidden } from "./Icons";

export const INIT_FORM = {
  email: '',
  pass: '',
  passConfirm: '',
  firstName: '',
  lastName: '',
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
