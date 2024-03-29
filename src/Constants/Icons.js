import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCartShopping, faUser, faUserCheck, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export const hidden = <FontAwesomeIcon icon={faEye} className="pass-icon" id="pass-icon"/>;
export const visible = <FontAwesomeIcon icon={faEyeSlash} className="pass-icon" id="pass-icon"/>;
export const CART_ICON = <FontAwesomeIcon icon={faCartShopping} />
export const USER_ICON = <FontAwesomeIcon icon={faUser} />
export const USER_CHECK_ICON = <FontAwesomeIcon icon={faUserCheck} />
export const CONFIRM_ICON = <FontAwesomeIcon icon={faCircleCheck} style={{fontSize: '100px', color: '#0de37f', margin: '0 auto'}} />