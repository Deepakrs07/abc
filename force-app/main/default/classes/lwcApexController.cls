public with sharing class lwcApexController {
    
   
    @AuraEnabled(cacheable=true)
    public static List<Account> searchAccountNameMethod (String accStrName, String accStrPhone, String accStrWebsite, String accStrIndustry, String accStrDescription){
        String keyNameString = '%' +  accStrName + '%';
        return [Select Id, Name, Phone, Website, Industry, Description From Account Where Name like:keyNameString OR Phone like:keyNameString OR Website like:keyNameString OR  Industry like:keyNameString];
     }    
 
   }