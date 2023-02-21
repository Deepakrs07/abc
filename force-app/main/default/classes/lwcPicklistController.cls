public with sharing class lwcPicklistController {
    @AuraEnabled
 public static List<QuoteLineItem> createRecord1(Decimal uPrice, Decimal quoteQuantity, String quoteIds, String product2Ids,
  String PricebookEntryids, Date effectiveStart,
   Date effectiveEnd , String customProduct , String utiType , String stateType , String conTerm , String pricing){
 
 List<QuoteLineItem> accList = new List<QuoteLineItem>();
 if(uPrice != NULL){
     QuoteLineItem obj = new QuoteLineItem();
    
     obj.UnitPrice = uPrice;
     obj.Quantity = quoteQuantity;
     obj.QuoteId = quoteIds;
     obj.Product2Id = product2Ids;
     obj.PricebookEntryId = PricebookEntryids;
     obj.Effective_Start_Date__c = effectiveStart;
     obj.Effective_End_Date__c =  effectiveEnd;
      obj.Product__c = customProduct;
      obj.Utility_Type__c = utiType;
      obj.States_Picklist__c = stateType;
      obj.Contract_Terms__c = conTerm;
      obj.Pricing_Method__c = pricing;
     accList.add(obj);
     System.debug('AccList ' +accList);
 }
 if(!accList.isEmpty()){
     insert accList;
     return accList;
 }
 return NULL;
     }
 }