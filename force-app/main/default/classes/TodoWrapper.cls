public with sharing class TodoWrapper {
    @AuraEnabled
    public String id {get;set;}

    @AuraEnabled
    public String content {get;set;}

    @AuraEnabled
    public String status {get;set;}

    public TodoWrapper(){}

    public TodoWrapper(Opportunity todo){
        this.id = todo.Id;
     
    }

    public static Opportunity getSobject(TodoWrapper wrapper, Boolean isCreate){
        Opportunity todo = new Opportunity();
       
        if(!isCreate){
            todo.Id = wrapper.id;
        }
        return todo;
    }
}
