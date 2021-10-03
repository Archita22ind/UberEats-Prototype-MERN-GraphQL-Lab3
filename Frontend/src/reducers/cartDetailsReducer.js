import { reduxConstants } from "../constants/reduxConstants";

export function cartDetails(state = {}, action) {
  switch (action.type) {
    case reduxConstants.ORDER_CREATE:
      return { orderId: action.orderId };
    default:
      return state;
  }
}
