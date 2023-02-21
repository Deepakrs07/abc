import { LightningElement, track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/lwcApexController.searchAccountNameMethod';
const DELAY = 100;
const columns = [
    { label : 'Name', fieldName: 'Name'},
    {label : 'Phone', fieldName: 'Phone'}
] 
export default class SearchLightningDataTable extends LightningElement {
    @track data =[];
    
    accountName = '';
    accountPhone = '';
    accountWebsite = '';
    accountIndustry = '';
    accountDescription = '';
  @track accountList= [];
  @wire (getAccounts,{
        accStrName:'$accountName',
        accStrPhone:'$accountPhone',
        accStrWebsite:'$accountWebsite',
        accStrIndustry:'$accountIndustry',
        accStrDescription:'$accountDescription'
     })
  retrieveAccounts({error, data}){
      if(data){
          this.accountList=data;          
      }
      else if(error){
 
      }
      
  }
 
 
  searchAccountAction(event){
      //this.accountName = event.target.value;
      const searchString = event.target.value;
      window.clearTimeout(this.delayTimeout);
      this.delayTimeout = setTimeout(() => {
          this.accountName = searchString; 
      }, DELAY);
  }
  selectall(event) {
    const checkBoxList = this.template.querySelectorAll('[data-id^="checkbox"]');
    for (const checkBoxElement of checkBoxList) {
        checkBoxElement.checked = event.target.checked;
       alert('jkl;dskf=========>' +checkBoxElement.checked);
        
    }
    alert('Second=========>' +checkBoxList);
}

getSelectedRows(event){

    const selectedRowDetails =  event.detail.selectedRows;
    window.alert(JSON.stringify(selectedRowDetails));
    alert('Datatable ==========>' +selectedRowDetails)
} 
}