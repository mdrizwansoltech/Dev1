public without sharing class HOG_ClientShippingInfo  {
   @AuraEnabled
    public static   Order getOrderDetails(String RecordId) { 
         Order ord= [Select id, account.PersonBirthdate, account.FirstName, account.LastName,Client_Chart__c from Order where Id =: RecordId];
        return ord;
    }
    
    @AuraEnabled
    public static   Order getAccountInfo(String ClientId) {
       Order ord= [Select id, account.PersonBirthdate, account.FirstName, account.LastName from Order where Client_Chart__c =:ClientId];
        return ord;
        
    }
        
       @AuraEnabled
    public static Order saveClientToOrder(String ClientId, String OrderId) {
        Order ord= new order();
        try {
          Client_Chart__c Chat = [select id,Account__c,account__r.FirstName, account__r.LastName,account__r.Name  from Client_Chart__c where id =:ClientId Limit 1];      
            ord.Client_Chart__c = ClientId;
            ord.EffectiveDate =system.today();
            ord.Status = 'New';
            if(!string.isEmpty(Chat.Account__c)){
              ord.AccountId = Chat.Account__c;  
            }
            if(!string.isEmpty(OrderId)){
              ord.Id = OrderId;  
            }
          upsert ord;
        }catch(exception ex){
            system.debug(''+ ex.getMessage());
        }
        return ord;
  }
}