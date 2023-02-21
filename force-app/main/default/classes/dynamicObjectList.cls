public with sharing class dynamicObjectList {
  @AuraEnabled

   public static void getGlobalDescribe(string id, string uid){
    Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe();

    for(Schema.SObjectType thisObj : gd.values()) {
        System.debug(thisObj);

    }
   
}
}