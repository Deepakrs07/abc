import {LightningElement,api,track} from 'lwc';
import search from '@salesforce/apex/getRecordOfConvertor.searchRecords';

// import getPicklistTypeFields from '@salesforce/apex/getRecordOfConvertor.getAllPicklistTypeFields'
// import getAllObjectList from '@salesforce/apex/getRecordOfConvertor.getAllObjectList';
// import getPickListvaluesByFieldName from '@salesforce/apex/getRecordOfConvertor.getOptionsForSelectedPicklistField';



import { NavigationMixin } from 'lightning/navigation';
import { Redux } from 'c/lwcRedux';
import {search1, select} from 'c/lwcSearchComponentActions';

export default class LwcSearchComponent extends Redux(LightningElement) {

    @api objectName;
	@track isLoading = false;
	@track objName;
	@api iconName;
	@api searchPlaceholder = 'Search Records';
	@track selectedId;
	@track selectedName;
	@track selectedType;
	@track selectedIcon;
	@track records;
	@track isValueSelected;
	@track blurTimeout;
	searchTerm;
	@track ranger;
	@track left;
	@track top;
	@track objRecordId;
	@api recordId;
	value = 'All';
	label;
	@track objectList = [];




	@track lstOfPicklistFields = [];
    @track objectList = [];
    @track mapofPickListValues = [];
    @track objectFieldOptionsList = [];
    @track picklistFieldsLabel = 'Picklist Fields'
    fieldSelectedToGetPicklistTypeField = '';
    objectName = '';   
    connectedCallback() { 
        getAllObjectList()
        .then((result) => {
            if (result) {
                this.objectList = [];
                for (let key in result ) {
                    this.objectList.push({ label: key, value: key });
                }
            } else {
                console.log('Error in getting objects ')
            }
        }).catch((error) => {
            console.log('Catch Error in getting objects   ')
        });
    }
    onObjectChange(event) { 
        this.objectName = event.detail.value;
        this.picklistFieldsLabel = '';
        this.picklistFieldsLabel = this.objectName + ' Picklist Fields';
        this.handleGetPicklistFields();
        
    }
    handleGetPicklistFields(){
        getPicklistTypeFields({ strAccountName: this.objectName })
        .then(result => {
            this.lstOfPicklistFields = [];
            for (let key in result) {
                this.lstOfPicklistFields.push({ label: key, value: key });
            }
        })
        .catch(error => {
            console.log('Error in getting picklist fields');
        })
    } 
    getPicklistFieldsOptions(event) { 
        this.fieldSelectedToGetPicklistTypeField = event.detail.value;
        this.getPicklistValuesForSelectedPicklistField();
    }
    async getPicklistValuesForSelectedPicklistField() {
        await getPickListvaluesByFieldName({ objectName: this.objectName, pickListFieldName: this.fieldSelectedToGetPicklistTypeField })
        .then((result) => {
          if (result) {
              this.objectFieldOptionsList = [];
            for (let key in result) {
                this.objectFieldOptionsList.push({ label: key, value: result[key] });
            }
             
          } 
        }).catch((error) => {
          console.log('Error in getting pickist values')
        })
    }

	


	get options() {
		return [{
				label: 'All',
				value: 'All'
			},
			{
				label: 'Account',
				value: 'Account'
			},
			{
				label: 'Contact',
				value: 'Contact'
			},
			{
				label: 'Opportunity',
				value: 'Opportunity'
			},
		];
	}
	//css
	@track boxClass = 'slds-combobox slds-dropdown-trigger slds - dropdown - trigger_click slds - has - focus ';
	@track inputClass = '';
	handleClick(event) {
		this.searchTerm = event.target.value;
		
		this.records = null;
		this.getvalues();
		this.inputClass = 'slds-has-focus';
		this.boxClass = 'slds-combobox slds-dropdown-trigger slds - dropdown - trigger_click slds - has - focus slds - is - open ';
	}
	onBlur() {
			this.blurTimeout = setTimeout(() => {
					this.boxClass = 'slds-combobox slds - dropdown - trigger slds - dropdown - trigger_click slds - has - focus '}, 300);
				}
				onSelect(event) {
					let selectedId = event.currentTarget.dataset.id;
					let selectedName = event.currentTarget.dataset.name;
					this.isValueSelected = true;
					this.selectedName = selectedName;
					this.selectedId = selectedId;
					for (let i = 0; i < this.records.length; i++) {
						if (this.records[i].Id == this.selectedId) {
							this.selectedIcon = this.records[i].Icon;
						}
					}
					//alert('Selected Record Id--' + this.selectedId);
					this[NavigationMixin.Navigate]({
						type: 'standard__recordPage',
						attributes: {
							recordId: this.selectedId,
						//	objectApiName: 'Account',
							actionName: 'view'
						},
					});

					if (this.blurTimeout) {
						clearTimeout(this.blurTimeout);
					}
					this.boxClass = 'slds-combobox slds-dropdown-trigger slds - dropdown - trigger_click slds - has - focus ';
					const value = event.currentTarget.dataset.name;
					
						
				}
				handleRemovePill() {
					this.isValueSelected = false;
					this.searchTerm = '';
				}
				onChange(event) {
					this.searchTerm = event.target.value;
					this.objName = event.detail.value;
					this.getvalues();
				}
				handleRadioChange(event) {
					this.searchTerm = '';
					this.value = event.target.value;
					console.log(this.value);
					this.isValueSelected = false;
				}
				getvalues() {
					if (this.searchTerm.length >= 2) {
						search({
								searchTerm: this.searchTerm,
								//objectName: this.objectList
							})
							.then(result => {
								this.isLoading = true;
								this.records = result;
							})
					}
					if (this.searchTerm.length <= 0) {
						this.records = null;
					}
				}
			}





//     import {LightningElement,api,track,wire } from 'lwc';
// import search from '@salesforce/apex/getRecordOfConvertor.searchRecords';
// import { NavigationMixin } from 'lightning/navigation';

// export default class Lwcsearchcomponent extends NavigationMixin(LightningElement) { 
// 	@track isLoading = false;
// 	@api objName;
// 	@api searchPlaceholder = 'Search Records';
// 	@track selectedId;
// 	@track selectedName;
// 	@track selectedIcon;
// 	@track records;
// 	@track isValueSelected;
// 	searchTerm;
// 	@api recordId;
// 	value = 'All';
// 	label;
// 	get options() {
// 		return [{
// 				label: 'All the Object',
// 				value: 'All'
// 			},
			
// 		];
// 	}
	
	
	
// 	// handleClick(event) { 
// 	// 	this.searchTerm = event.target.value;
	
// 	// }
	
// 				onSelect(event) {
// 					let selectedId = event.currentTarget.dataset.id;
// 					//let selectedName = event.currentTarget.dataset.name;
// 					this.isValueSelected = true;
// 					//this.selectedName = selectedName;
// 					this.selectedId = selectedId;
// 					for (let i = 0; i < this.records.length; i++) {
// 						if (this.records[i].Id == this.selectedId) {
// 							this.selectedIcon = this.records[i].Icon;
// 						}
// 					}
// 					//alert('Selected Record Id--' + this.selectedId);

//                      this[NavigationMixin.Navigate]({
//                         type: 'standard__recordPage',
//                         attributes: {
//                             recordId: this.selectedId,
//                             objectApiName: 'objName',
//                             actionName: 'view'
//                         },
//                     });
// 				}
			
// 				onChange(event) {
// 					this.searchTerm = event.target.value;
// 					this.getvalues();
// 				}
// 				getvalues() {
// 					if (this.searchTerm.length >= 2) {
// 						search({
// 								searchTerm: this.searchTerm,
								
// 							})
// 							.then(result => {
// 								this.isLoading = true;
// 								this.records = result;
// 							})
// 					}
// 					if (this.searchTerm.length <= 0) {
// 						this.records = null;
// 					}
// 				}
// 			}