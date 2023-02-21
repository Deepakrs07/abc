import { LightningElement, track, wire } from 'lwc';
import retrieveOpportunity from '@salesforce/apex/fetchAllRelatedRecords.retrieveOpportunity';
import retrieveOpportunity1 from '@salesforce/apex/fetchAllRelatedRecords.retrieveOpportunity1';
import retrieveOpportunity2 from '@salesforce/apex/fetchAllRelatedRecords.retrieveOpportunity2';
import getAllOpps from '@salesforce/apex/GetAllOpportunities.getAllOpps';

import { Redux } from 'c/lwcRedux';
import {edit, update, cancel} from 'c/counterActions';

export default class Counter extends Redux(LightningElement) {
    @wire (getAllOpps) wiredAccounts({data,error}){
        if (data) {
        console.log(data); 
        } else if (error) {
        console.log(error);
        }
   }
@track currentFilter;
@track searchName;
handleChangeAccName(event){
this.currentFilter = event.target.value;
}
handleOpportunitySearch(){
this.searchName = this.currentFilter;
}

@track records;
@track dataNotFound;
@wire (retrieveOpportunity,{keySearch:'$searchName'})
wireRecord({data,error}){
if(data){
this.records = data;
this.error = undefined;
this.dataNotFound = '';
if(this.records == ''){
this.dataNotFound = 'There is no Opportunity found related to Opportunity name';
}
}else{
this.error = error;
this.data=undefined;
}
}

@track currentFilter1;
@track searchName1;
handleChangeAccName1(event){
this.currentFilter1 = event.target.value;
}
handleOpportunitySearch1(){
this.searchName1 = this.currentFilter1;
}
@track records;
@track dataNotFound;
@wire (retrieveOpportunity1,{keySearch:'$searchName1'})
wireRecord1({data,error}){
if(data){
this.records = data;
this.error = undefined;
this.dataNotFound = '';
if(this.records == ''){
this.dataNotFound = 'There is no Opportunity found related to Opportunity name';
}
}else{
this.error = error;
this.data=undefined;
}
}

@track currentFilter2;
@track searchName2;
handleChangeAccName2(event){
this.currentFilter2 = event.target.value;
}
handleOpportunitySearch2(){
this.searchName2 = this.currentFilter2;
}
@track records;
@track dataNotFound;
@wire (retrieveOpportunity2,{keySearch:'$searchName2'})
wireRecord2({data,error}){
if(data){
this.records = data;
this.error = undefined;
this.dataNotFound = '';
if(this.records == ''){
this.dataNotFound = 'There is no Opportunity found related to Opportunity name';
}
}else{
this.error = error;
this.data=undefined;
}
}

    error;
    @ track data;
    showModal = false;
    recId;
    recName;


    openModal(event){
        this.showModal = true;
        this.recId = event.target.value.Id;
        console.log("id" +event.target.value.Id);
        this.recName = event.target.value.Name;
        console.log('Opp Record '+event.target.value.Name);
    } 

    closeModal(event){
        console.log('onsubmit: '+ event.detail.fields);
        this.showModal = false;
    }

    handleSubmit(event){
        const fields = event.detail.fields;
        console.log( "Fields: ", fields );
        this.showModal = false;
    }

myMethod(){
    this.showmodal = false;
    }


}