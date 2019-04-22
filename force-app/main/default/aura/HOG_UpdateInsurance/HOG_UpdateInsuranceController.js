/* ******************************************************************************************************************************
* Copyright(C)2019
* Soltech
* All Rights Reserved
* Name      : HOG_UpdateInsuranceController.js
* Purpose   : This component is used  to show the Insurance information    

**********************************************************************************************************************************
*   Version No                   Name                           Date                                Description

* ================================================================================================================================
*        1.0                   Rizwan Mohammed                     04/05/2019                        Initial Version
				   
*********************************************************************************************************************************** */
({
    doInit:function(component, event, helper){
        alert('@@@@'+component.get('v.orderId'));
        //Get selected client ID
        var clientId = component.get("v.selectedClientId");
       
        //Get insurance detailes based upon client id 
        var action = component.get("c.getInsuranceInfo");
        // alert('+++1'+clientId);
        action.setParams({ClientId : clientId});
       //  alert('+++2'+clientId);
        action.setCallback(this, function(response) {
         //    alert('+++3'+clientId);
            var state = response.getState();
            if(state == "SUCCESS") {
                var CName;
                var ClientName= [];
                var Result = response.getReturnValue();
                alert(response.getReturnValue());
                if(response.getReturnValue()!=null && response.getReturnValue()!='' && response.getReturnValue()!=undefined && response.getReturnValue().length>0){
                component.set("v.ListOfRecords", response.getReturnValue());
                     CName=component.get("v.ListOfRecords")[0].Insured_Client__r.Name;
                     ClientName=CName.split("(");
                }
                
                

               
                if(ClientName!=null && ClientName!='' && ClientName!=undefined){
                component.set("v.ClientName",ClientName[0]); 
                }
               
            }
            else{
                
                alert('error');
            }
            
        });
        $A.enqueueAction(action);
        
        
        
    },
    
    newInsuranceForm : function(component, event, helper) {
        var createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams({
            "entityApiName": "Insurance_Coverage__c"
        });
        createRecordEvent.fire();
    },
    
    OpenEditModel : function(component, event, helper) {
        
        //var selectedId = event.currentTarget.dataset.variablename;
        
        var selectedId = event.currentTarget;
        var idstr = selectedId.getAttribute("data-IncId");
      //  alert('@@@'+idstr);
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
            "recordId":idstr
        });
        editRecordEvent.fire();
    },
    
Back : function(component, event, helper) {  
    var orderId = component.get("v.orderId");    
    //Send selected client id to HOG_ShippingInfo
                
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "c:HOG_ShippingInformation",
            componentAttributes: {
                selectedClientId : component.get("v.selectedClientId"),
                orderId :orderId
            }
            
        })
        evt.fire();
    },
    
    Next: function(component, event, helper) {
        alert(component.get("v.orderId"));
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "c:HOG_OrderInstructions",
            componentAttributes: {
                OrderId : component.get("v.orderId")
                
            }
            
        })
        evt.fire();
        
    },
        
    
})