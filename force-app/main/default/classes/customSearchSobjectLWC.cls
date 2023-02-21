public with sharing class customSearchSobjectLWC {
    @AuraEnabled(cacheable=true)
    public static list<EntityDefinition> getContactList(string searchKey) {
        string searchKeyword = '%' + searchKey + '%';
		
       // create contact list to store search result 
        list<EntityDefinition> contactListRecord = new list<EntityDefinition>();
     
	   // query contact records
        for(EntityDefinition conObj : [SELECT  QualifiedApiName,Id FROM EntityDefinition
                            WHERE QualifiedApiName LIKE : searchKeyword]){
           contactListRecord.add(conObj);
           system.debug('contactListRecord' +contactListRecord);
        }
        
         if(contactListRecord.size() == 0){
            throw new AuraHandledException('No Record Found..'); 
         }
         
        return contactListRecord;
    }
}