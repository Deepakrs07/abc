import { LightningElement,api,track} from 'lwc';
// import server side apex class method 
import getContactList from '@salesforce/apex/customSearchSobjectLWC1.getContactList';
// import standard toast event 
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
import { NavigationMixin } from 'lightning/navigation'; 

export default class CustomSearch extends NavigationMixin(LightningElement) {
    @track checkedValue=[];
    @track contactsRecord=[];
    searchValue = '';
 @api recordId;
    // update searchValue var when input field value change
    searchKeyword(event) {
        this.searchValue = event.target.value;
    }
 
    // call apex method on button click 
    handleSearchKeyword() {
        
        if (this.searchValue !== '') {
            getContactList({
                    searchKey: this.searchValue
                })
                .then(result => {
                    // set @track contacts variable with return contact list from server  
                    this.contactsRecord = result;
                })
                .catch(error => {
                   
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                    this.dispatchEvent(event);
                    // reset contacts var with null   
                    this.contactsRecord = null;
                });
        } else {
            // fire toast event if input field is blank
            const event = new ShowToastEvent({
                variant: 'error',
                message: 'Search text missing..',
            });
            this.dispatchEvent(event);
        }
    }
    navigateToRecordPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Contact',
                actionName: 'view'
            }
        });
 }
selectall(event) {
    const checkBoxList = this.template.querySelectorAll('[data-id^="checkbox"]');
    for (const checkBoxElement of checkBoxList) {
        checkBoxElement.checked = event.target.checked;
        
    }
}
}
