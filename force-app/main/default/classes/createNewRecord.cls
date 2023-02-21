
public with sharing class createNewRecord {

    @AuraEnabled
    public static void saveRecord(QuoteLineItem objAcc) {

        try{
            System.debug('============='+objAcc);
            insert objAcc;
        }

        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    

    }
}