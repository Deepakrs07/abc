
public with sharing class fetchAllRelatedRecords {

    @AuraEnabled(cacheable=true)

    public static List<Opportunity> retrieveOpportunity(string keySearch){

    List<Opportunity> myOpportunityList = [Select Id, Name ,StageName, CloseDate, Type, Owner.Name, Amount From Opportunity Where StageName=:keySearch];

    return myOpportunityList;

    }

    @AuraEnabled(cacheable=true)

    public static List<Opportunity> retrieveOpportunity1(string keySearch){

    List<Opportunity> myOpportunityList1 = [Select Id, Name ,StageName, CloseDate, Type, Owner.Name, Amount From Opportunity Where Type=:keysearch] ;

    return myOpportunityList1;

    }

    @AuraEnabled(cacheable=true)

    public static List<Opportunity> retrieveOpportunity2(string keySearch){

    List<Opportunity> myOpportunityList2 = [Select Id, Name ,StageName, CloseDate, Type, Owner.Name, Amount From Opportunity Where Owner.Name=:keysearch];

    return myOpportunityList2;

    }
  
    }