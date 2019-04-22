({
	Next : function(component, event, helper) {
        
        
       // check if selectedLookupRecord is not equal to undefined then set the accountId      
        if(component.get("v.selectedLookUpRecord").Id != undefined){
         var recordId = component.get("v.selectedLookUpRecord").Id;
            alert('recordId'+recordId);
        } 
         
        /*
       //call apex class method
      var action = component.get('c.saveContact');
        action.setParams({
            'con': conObj
        })
      action.setCallback(this, function(response) {
        //store state of response
        var state = response.getState();
        if (state === "SUCCESS") {
         alert('Record Created');
        }
      });
      $A.enqueueAction(action);
        */
		
	}
})