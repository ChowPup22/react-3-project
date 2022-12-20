import VISA_ICON from '../assets/visa.png';
import AMERICAN_EXPRESS_ICON from '../assets/amex.png';
import DISCOVER_ICON from '../assets/discover.png';
import MASTER_ICON from '../assets/masterCard.png';

export const INIT_CARD = {
  card: '',
  cardHolder: '',
  expiry: '',
  securityCode: '',
};

export const INIT_CARD_INPUT = [
  { header: 'Card Number', label: '', name: 'card', type: 'text', error: 'cardError'},
  { header: 'Cardholder\'s Name', label: '', name: 'cardHolder', type: 'text', error: 'cardHolderError'},
  { header: 'Expiry Date ', label: '(MM/YY)', name: 'expiry', type: 'text', error: 'expiryError'},
  { header: 'Security Code', label: '', name: 'securityCode', type: 'text', error: 'securityCodeError'},
]

export const OTHERCARDS = [
  /[1-9]/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
]

export const AMERICAN_EXPRESS = [
  /[1-9]/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
]

export const CARD = [
  'VISA',
  'MASTERCARD',
  'AMERICAN_EXPRESS',
  'DISCOVER'
]

export const CARDICON = {
  VISA: VISA_ICON,
  AMERICAN_EXPRESS: AMERICAN_EXPRESS_ICON,
  MASTERCARD: MASTER_ICON,
  DISCOVER: DISCOVER_ICON,
}