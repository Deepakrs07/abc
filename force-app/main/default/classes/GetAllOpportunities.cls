public with sharing class GetAllOpportunities {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAllOpps(){
    return [Select Id, Name From Account];
    
    }
    
  
}
    
    