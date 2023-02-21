public with sharing class ChildComponent {
// Apex Class Retrieving Data From Product Fields


@AuraEnabled(cacheable=true)
  public static List<Product2> getCustomLookupAccount (String proName){
   
   List<Product2> productList =  new List<Product2>();
   if(proName != ''){
       String productName = '%' + proName + '%';
       productList = [Select Id,Name From Product2 Where Name like:productName];
       return productList;
   }
   return productList;
}     

    }

