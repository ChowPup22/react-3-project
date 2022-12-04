
export const onlyTextValidation = (value) => {
  if (value) {
    if (/^[a-zA-Z\s]*$/i.test(value)) {
      return undefined;
    } else {
      return 'Alphabetical characters only';
    }
  } else {
    return undefined;
  }
};

export const streetAddressValidation = (value) => {
  if (value) {
    if (/^[#.0-9a-zA-Z\s,-]+$/i.test(value)) {
      return undefined;
    } else {
      return 'No special characters allowed';
    }
  } else {
    return undefined;
  }
};

export const zipCodeValidation = (value) => {
  if (value) {
    if (/^\d{5}([ -]\d{4})?$/i.test(value)) {
      return undefined;
    } else {
      return 'Numeric characters only. **12345(-1234)**';
    }
  } else {
    return undefined;
  }
};

export const cellPhoneValidation = (value) =>{
  if (value) {
    if (/^[0-9\s-]{10,12}$/i.test(value)) {
      return undefined;
    } else {
      return 'Numeric characters and "-" only, 10-12 characters max';
    }
  } else {
    return undefined;
  }
}

export const emailValidation = (value) => {
  if (value) {
    if (/\S+@\S+\.\S+/i.test(value)) {
      return undefined;
    } else {
      return 'Not a valid Email format';
    }
  } else {
    return undefined;
  }
};

export const passwordValidation = (value) => {
  if (value) {
    if (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/i.test(value)) {
      return undefined;
    } else {
      return 'Password does not meet the minimum requirements';
    }
  } else {
    return undefined;
  }
}

export const cardNumberValidation = (cardNumber) => {
  const regexPattern = {
    MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
    VISA: /^4[0-9]{2,}$/,
    AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
    DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
  };

  for (const card in regexPattern) {
    if (cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) {
      if (cardNumber) {
        return cardNumber && /^[1-6]{1}[0-9]{14,15}$/i.test(cardNumber.replace(/[^\d]/g, '').trim())
        ? ''
        : 'Enter a valid Card';
      }
    }
  }
  return 'Enter a valid Card';
}

export const securityCodeValidation = (min, value) =>
  (value && value.length < min) ? 'Must be 3 characters or more' : undefined;