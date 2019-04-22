/* ******************************************************************************************************************************
* Copyright(C)2019
* Soltech
* All Rights Reserved
* Name      : HOG_ShippingInfoController.js
* Purpose   : This component is used  to show the shipping information   

**********************************************************************************************************************************
*   Version No                   Name                           Date                                Description

* ================================================================================================================================
*        1.0                   Rizwan Mohammed                     04/05/2019                        Initial Version
				   
*********************************************************************************************************************************** */

({
    doInit : function(component, event, helper) {  
        
        
        var clientId = component.get("v.selectedClientId");
        var orderId = component.get("v.orderId");
        
        var action = component.get("c.getAccountInfo");
        action.setParams({clientId : clientId});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state == "SUCCESS") {
                var Result = response.getReturnValue();
                
            }
            else{
                
                
            }
            
        });
        $A.enqueueAction(action);
    },
    Back : function(component, event, helper) {  
        //Send selected client id to HOG_ShippingInfo
        var createEvent = $A.get("e.c:HOG_SelectedClientEvent");
        createEvent.setParams({ "selectedClientRecId": component.get("v.selectedClientId") });
        createEvent.fire();
        
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "c:HOG_Selectclientcomponent",
            componentAttributes: {
                selectedClientId : component.get("v.selectedClientId")
            }
            
        })
        evt.fire();
    },
    
    Next: function(component, event, helper) {
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "c:HOG_UpdateInsurance",
            componentAttributes: {
                selectedClientId : component.get("v.selectedClientId")
            }
            
        })
        evt.fire();
        
    },
    
    
    sendClientId : function(component, event, helper){
        
    }
    
})