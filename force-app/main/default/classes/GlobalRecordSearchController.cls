public with sharing class GlobalRecordSearchController {
  @AuraEnabled(cacheable = true)
  public static List<ObjectWrapper> searchRecords(String searchTerm) {
      
      List<ObjectWrapper> wrapperList = new List<ObjectWrapper>();
      
  if(searchTerm != null){
         // String myQuery1 = 'FIND \'' + searchTerm + '\'  IN ALL FIELDS RETURNING Account(NAME WHERE NAME Like  \'%' + searchTerm + '%\' Order by LastViewedDate DESC), Contact(NAME WHERE NAME Like  \'%' + searchTerm + '%\' Order by LastViewedDate DESC), Opportunity(NAME WHERE NAME Like  \'%' + searchTerm + '%\' Order by LastViewedDate DESC) LIMIT 5';
         String myQuery1 = 'FIND \'' + searchTerm + '\'  IN ALL FIELDS RETURNING Account(NAME), Contact(Id,NAME,Email), Opportunity(NAME), Quote(Id,Name), Product2(Name), Lead(Name), Pricebook2(Name), Campaign(Name) LIMIT 10';

          List<List<sObject>> searchList = System.Search.query(myQuery1);
          List <Account> searchAccounts = searchList.get(0);
          List <Contact> searchContact = searchList.get(1);
          List <Opportunity> searchOpportunity = searchList.get(2);
          //List <Bear__c> searchBear = searchList.get(3);
          List <Quote> searchQuote = searchList.get(3);
          List <Product2> searchProduct = searchList.get(4);
          List <Lead> searchLead = searchList.get(5);
          List <Pricebook2> searchPricebook = searchList.get(6);
          

          
          
          
          for(Pricebook2 Pricebook : searchPricebook) {
              ObjectWrapper objWrapper = new ObjectWrapper();
              objWrapper.Id = Pricebook.Id;
              objWrapper.Name = Pricebook.Name;
              objWrapper.Type = 'Pricebook2';
              objWrapper.Icon = 'standard:pricebook';
              wrapperList.add(objWrapper);
          }
        
          for(Lead Lead : searchLead) {
              ObjectWrapper objWrapper = new ObjectWrapper();
              objWrapper.Id = Lead.Id;
              objWrapper.Name = Lead.Name;
              objWrapper.Type = 'Lead';
              objWrapper.Icon = 'standard:lead';
              wrapperList.add(objWrapper);
          }

          for(Product2 Pro : searchProduct) {
            ObjectWrapper objWrapper = new ObjectWrapper();
            objWrapper.Id = Pro.Id;
            objWrapper.Name = Pro.Name;
            objWrapper.Type = 'Product2';
            objWrapper.Icon = 'standard:products';
            wrapperList.add(objWrapper);
        }
          for(Account acc : searchAccounts) {
              ObjectWrapper objWrapper = new ObjectWrapper();
              objWrapper.Id = acc.Id;
              objWrapper.Name = acc.Name;
              objWrapper.Type = 'Account';
              objWrapper.Icon = 'standard:account';
              wrapperList.add(objWrapper);
          }
          for(Contact cont : searchContact) { 
              ObjectWrapper objWrapper = new ObjectWrapper();
              objWrapper.Id = cont.Id;
              objWrapper.Name = cont.Name;
              objWrapper.Email = cont.Email;
              objWrapper.Type = 'Contact';
              objWrapper.Icon = 'standard:contact';
              wrapperList.add(objWrapper);
          }
          for(Opportunity opp : searchOpportunity) {
              ObjectWrapper objWrapper = new ObjectWrapper();
              objWrapper.Id = opp.Id;
              objWrapper.Name = opp.Name;
              objWrapper.Type = 'Opportunity';
              objWrapper.Icon = 'standard:opportunity';
              wrapperList.add(objWrapper);
          }
        //   for(Bear__c bear : searchBear) {
        //     ObjectWrapper objWrapper = new ObjectWrapper();
        //     objWrapper.Id = bear.Id;
        //     objWrapper.Name = bear.Name;
        //     objWrapper.Type = 'Bear__c';
        //     objWrapper.Icon = 'standard:custom_notification';
        //     wrapperList.add(objWrapper);
        // }
        
        for(Quote Quote : searchQuote) {
            ObjectWrapper objWrapper = new ObjectWrapper();
            objWrapper.Id = Quote.Id;
            objWrapper.Name = Quote.Name;
            objWrapper.Type = 'Quote';
            objWrapper.Icon = 'standard:quotes';
            wrapperList.add(objWrapper);
        }
      }
      return wrapperList;
  }
  public class ObjectWrapper {
      @AuraEnabled
      public String Id{get;set;}
      @AuraEnabled
      public String Name{get;set;}
      @AuraEnabled
      public String Type{get;set;}
      @AuraEnabled
      public String Email{get;set;}
      @AuraEnabled
      public String Icon{get;set;}
  }
}







