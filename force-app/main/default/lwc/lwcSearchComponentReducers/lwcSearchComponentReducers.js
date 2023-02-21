import {SEARCH_ACTION, SELECT_ACTION} from 'c/lwcSearchComponentConstant';
import {lwcSearchComponent} from 'c/lwcSearchComponent';

const reducer = (action) => {
    switch (action.type) {
       case SEARCH_ACTION: return openModal;
       case SELECT_ACTION: return handleSubmit;
       
       default: return lwcSearchComponent;
    }
 }
export default {
    lwcSearchComponent: reducer
}