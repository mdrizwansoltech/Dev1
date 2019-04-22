public class Pharmacycontroller {
    
      
      @auraEnabled  
    public static Client_chart__c getclient(String clientId) {  
          
        return [ SELECT Id,Account__r.id,account__r.FirstName, account__r.LastName, Name,Shipping_Address__c,Date_of_birth__c FROM Client_chart__c WHERE Id =: clientId ];   
          
    }
   
    
     @auraEnabled  
    public static Pharmacy_Order__c getPharmacyOrder(String clientId) {  
          system.debug('clientId:::'+clientId);
      return [ SELECT Id,Account__r.id, Name,LastModifiedDate,Deliver_By_Date__c,Instructions__c,
              Previous_Date__c,Order_Previous_Instructions__c FROM Pharmacy_Order__c WHERE Id =: clientId Order BY LastModifiedDate Desc];   
           
    }
    
    public class untitleSObject {
        @AuraEnabled
        public String currentworkingTitleId {get; set;}
        @AuraEnabled
        public String currentworkingTitleName {get; set;}
    }
    
    @AuraEnabled
    public static Order createOrderRec( order orderRecord, ID OrderAccName, String orderId) {
        
        Order ord= new order();
        try {
        ord.Placed_by__c = orderRecord.Placed_by__c ;
        ord.Phone__c = orderRecord.Phone__c ;
        ord.Ship_To_Name__c = orderRecord.Ship_To_Name__c ;
        ord.Shipping_Address__c = orderRecord.Shipping_Address__r.Id;
        ord.Signature__c = orderRecord.Signature__c ;
        
        list<order> orr = [SELECT Id, Instructions__c, Previous_Instructions__c, EffectiveDate, Previous_Order__c FROM Order WHERE AccountId =:OrderAccName ORDER BY CreatedDate DESC] ;
         ord.Previous_Instructions__c = orr.get(0).Instructions__c ;
         ord.Previous_Order__c = orr.get(0). EffectiveDate ;
        
            
            if(!string.isEmpty(OrderId)){
              ord.Id = OrderId;  
            }
            
          upsert ord;
        }catch(exception ex){
            system.debug(''+ ex.getMessage());
            
        }
        
        return ord;
        
        
        /*System.debug('orderRecord:::'+orderRecord);
        orderRecord.AccountID = OrderAccName ;
        orderRecord.Status = 'New';
        orderRecord.EffectiveDate = system.today();
        orderRecord.Placed_by__c = orderRecord.Placed_by__c ;
        orderRecord.Phone__c = orderRecord.Phone__c ;
        orderRecord.Ship_To_Name__c = orderRecord.Ship_To_Name__c ;
        orderRecord.Shipping_Address__c = orderRecord.Shipping_Address__r.Name;
        orderRecord.Signature__c = orderRecord.Signature__c ;
        
        list<order> orr = [SELECT Id, Instructions__c, Previous_Instructions__c, EffectiveDate, Previous_Order__c FROM Order WHERE AccountId =:OrderAccName  ORDER BY CreatedDate DESC ] ;
         orderRecord.Previous_Instructions__c = orr.get(0).Instructions__c ;
         orderRecord.Previous_Order__c = orr.get(0). EffectiveDate ;
        
        untitleSObject untitleProjec = new untitleSObject();
		
        Database.SaveResult[] results1 = Database.Insert(new SObject[] {orderRecord});
        order orRec = [select Id,Name from order where id =: orderRecord.Id];
        untitleProjec.currentworkingTitleId = orderRecord.Id;
        untitleProjec.currentworkingTitleName = orRec.Name; 
        return untitleProjec;*/
    }

}