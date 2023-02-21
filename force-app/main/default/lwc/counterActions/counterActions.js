import {EDIT_ACTION, UPDATE_ACTION, CANCEL_ACTION} from 'c/counterConstant';
export const edit = ()=> {
    return {
       type: EDIT_ACTION
    }
 }
 export const update = () => {
    return {
       type: UPDATE_ACTION
    }
 }
 export const cancel = () => {
    return { 
      type: CANCEL_ACTION 
   }
 }