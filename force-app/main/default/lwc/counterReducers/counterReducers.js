import {EDIT_ACTION, UPDATE_ACTION, CANCEL_ACTION} from 'c/counterConstant';
import {counter} from 'c/counter';

const reducer = (action) => {
    switch (action.type) {
       case EDIT_ACTION: return openModal;
       case UPDATE_ACTION: return handleSubmit;
       case CANCEL_ACTION : return closeModal;
       default: return counter;
    }
 }
export default {
    counter: reducer
}