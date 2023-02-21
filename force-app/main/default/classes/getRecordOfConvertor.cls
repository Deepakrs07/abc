 public class getRecordOfConvertor {
    @AuraEnabled(cacheable = true)
    public static List<ObjectWrapper> searchRecords(String searchTerm , string objectName) {      
  
       List<ObjectWrapper> wrapperList = new List<ObjectWrapper>();
  
       if(searchTerm != null){
  
         String myQuery1 = 'FIND \'' + searchTerm + '\'  IN ALL FIELDS RETURNING Account(Id,Name) LIMIT 5';
  
          List<List<sObject>> searchList = Search.query(myQuery1);
  
            for(List<sObject> objectList: searchList) {
              for(sObject obj: objectList) {
                 ObjectWrapper objWrapper = new ObjectWrapper();
  
        System.debug('obj'+obj);
        System.debug('objectList'+objectList);
  
                  objWrapper.Id = obj.Id;
                  objWrapper.Name = obj.Id;
                 objWrapper.Type = obj.Id;
  
                objWrapper.Icon = 'standard: sObject.toLowerCase()';
  
                  System.debug(objWrapper.Id);
  
                 wrapperList.add(objWrapper);        
  
              } } }
  
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
  
          public String Icon{get;set;}
  
             } 
            }   
 