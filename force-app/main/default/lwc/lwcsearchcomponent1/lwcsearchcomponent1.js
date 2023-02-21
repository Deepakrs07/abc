import {LightningElement,api,track} from 'lwc';
import search from '@salesforce/apex/getRecordOfConvertor.searchRecords';
import { NavigationMixin } from 'lightning/navigation';


export default class LwcSearchComponent extends NavigationMixin(LightningElement) {

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
	@track objRecordId;
	@api recordId;
	
	@track objectList = [];




	
	@track inputClass = '';
	handleClick(event) {
		this.searchTerm = event.target.value;
		
		this.records = null;
		this.getvalues();
		this.inputClass = 'slds-has-focus';
		this.boxClass = 'slds-combobox slds-dropdown-trigger slds - dropdown - trigger_click slds - has - focus slds - is - open ';
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

					const value = event.currentTarget.dataset.name;
					
						
				}
			
				onChange(event) {
					this.searchTerm = event.target.value;
					this.objName = event.detail.value;
					this.getvalues();
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


