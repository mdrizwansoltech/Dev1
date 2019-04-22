({ 
    doInit: function(component, event, helper) {
        
        helper.getClientId(component, event);  
    },
    Previous : function(component, event, helper) {
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "c:HOG_Selectclientcomponent",
            componentAttributes: {  
                recordId : component.get("v.orderId")
            }
        });
        evt.fire();
    },
    handleSubmit : function(component, event, helper) {
        
        var shipName = component.find("NameField").get("v.value");
        var streetfield = component.find("StreetFieldID").get("v.value");
        var cityfield = component.find("CityFieldID").get("v.value");
        var statefield = component.find("StateFieldID").get("v.value");
        var coutyfield = component.find("CoutyFieldID").get("v.value");
        var zipfield = component.find("ZipFieldID").get("v.value");
        var addfield = component.find("addreesTypeID").get("v.value");
        var addtypefield = component.find("addreespurposeID").get("v.value");
        
        // perform validations as required based on the value retrieved
        if(shipName === "" || shipName === null ||  shipName === undefined ) {
            helper.showToast('error','Error Message','Street Name Should not be Blank'); 
            event.preventDefault(); // stop form submission
        }
        
        if(streetfield === "" || streetfield === null ||  streetfield === undefined ) {
            helper.showToast('error','Error Message','Street Name Should not be Blank'); 
            event.preventDefault(); // stop form submission
        }
        if(cityfield === "" || cityfield === null ||  cityfield === undefined ) {
            helper.showToast('error','Error Message','City Name Should not be Blank'); 
            event.preventDefault(); // stop form submission
        }
        if(statefield === "" || statefield === null ||  statefield === undefined ) {
            helper.showToast('error','Error Message','State Name Should not be Blank'); 
            event.preventDefault(); // stop form submission
        }
        if(coutyfield === "" || coutyfield === null ||  coutyfield === undefined ) {
            helper.showToast('error','Error Message','Counrty Name Should not be Blank'); 
            event.preventDefault(); // stop form submission
        }
        if(zipfield === "" || zipfield === null ||  zipfield === undefined ) {
            helper.showToast('error','Error Message','Zipcode Name Should not be Blank'); 
            event.preventDefault(); // stop form submission
        }
        if(addfield === "" || addfield === null ||  addfield === undefined ) {
            helper.showToast('error','Error Message','Address Type Name Should not be Blank'); 
            event.preventDefault(); // stop form submission
        }
        if(addtypefield === "" || addtypefield === null ||  addtypefield === undefined ) {
            helper.showToast('error','Error Message','Address Pupose Name Should not be Blank'); 
            event.preventDefault(); // stop form submission
        }
        
    },
    
    SubmitPhonefiled : function(component, event, helper) {
        
        var phoneFld = component.find("Phone").get("v.value");
        var placedByFld = component.find("PlacedBy").get("v.value");
        
        if(phoneFld === "" || phoneFld === null ||  phoneFld === undefined ) {
            helper.showToast('error','Error Message','Phone Pupose Name Should not be Blank'); 
            event.preventDefault(); // stop form submission
        }
    },
    SubmitPlacedbyfiled : function(component, event, helper) {
        if(placedByFld === "" || placedByFld === null ||  placedByFld === undefined ) {
            helper.showToast('error','Error Message','Placed BY Should not be Blank'); 
            event.preventDefault(); // stop form submission
        }
    },
    
    
    NextScreen : function(component, event, helper) {
        var phoneFld = component.find("Phone").get("v.value");
        var placedByFld = component.find("PlacedBy").get("v.value");
        var shipName = component.find("ShipToName").get("v.value");
        var shipAdd = component.find("shipAddid").get("v.value");
        var signtre = component.find("Signaturerequired").get("v.value");
        if( phoneFld == '' || phoneFld == '' || phoneFld == null ){
            // component.find("Phone").set("v.errors", [{message:"Please Enter Phone before Proceeding"}]);
            helper.showToast('error','Error Message','Please Enter Phone before Proceeding'); 
          //  alert(placedByFld);
        }
        if(placedByFld == undefined || placedByFld == '' || placedByFld == null){
            // component.find("PlacedBy").set("v.errors", [{message:"Please Enter Placed By before Proceeding"}]);
            helper.showToast('error','Error Message','Please Enter Placed By before Proceeding'); 
        }
        if(shipName == undefined || shipName == '' || shipName == null){
            helper.showToast('error','Error Message','Please Enter Ship to Name before Proceeding');    
        }
        if(shipAdd == undefined || shipAdd == '' || shipAdd == null){
            helper.showToast('error','Error Message','Please Enter Ship Address before Proceeding');
        } 
        if(signtre == undefined || signtre == '' || signtre == null){
            helper.showToast('error','Error Message','Please Enter Signature before Proceeding');    
        }
        
        
        else{
            var OrderAccName = component.get('v.Client_Chart__c.Account__r.Id');
            var orderRecord = component.get('v.Order');
            var orderId = component.get('v.orderId');
            var action = component.get('c.createOrderRec');
            action.setParams({
                
                "orderRecord" : orderRecord,
                "OrderAccName": OrderAccName,
                "orderId" : orderId
            });
            action.setCallback(this, $A.getCallback(function (response) {
                
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Success Message',
                    message: 'Order created Successfully',
                    messageTemplate: 'Record {0} created! See it {1}!',
                    duration:' 5000',
                    key: 'info_alt',
                    type: 'success',
                    mode: 'pester'
                });
                // toastEvent.fire();
                var state = response.getState();
                if (state === "SUCCESS") {
                    var untitleProject = response.getReturnValue();
                    message = 'Order created Successfully.';
                    //Redirecting to shipping component along with orderId and clientId
                    
                    var evt = $A.get("e.force:navigateToComponent");
                    
                    evt.setParams({
                        componentDef : "c:HOG_UpdateInsurance",
                        componentAttributes: {
                            selectedClientId : component.get("v.selectedClientId"),
                            orderId :component.get('v.orderId')
                        }
                        
                    })
                    evt.fire();
                    
                } 
                
                else {
                    var toastEvent = $A.get("e.force:showToast");
                    var message = '';
                    if (state === "INCOMPLETE") {
                        message = 'Server could not be reached. Check your internet connection.';
                    } else if (state === "ERROR") {
                        var errors = response.getError();
                        if (errors) {
                            for(var i=0; i < errors.length; i++) {
                                for(var j=0; errors[i].pageErrors && j < errors[i].pageErrors.length; j++) {
                                    message += (message.length > 0 ? '\n' : '') + errors[i].pageErrors[j].message;
                                }
                                if(errors[i].fieldErrors) {
                                    for(var fieldError in errors[i].fieldErrors) {
                                        var thisFieldError = errors[i].fieldErrors[fieldError];
                                        for(var j=0; j < thisFieldError.length; j++) {
                                            message += (message.length > 0 ? '\n' : '') + thisFieldError[j].message;
                                        }
                                    }
                                }
                                if(errors[i].message) {
                                    message += (message.length > 0 ? '\n' : '') + errors[i].message;
                                }
                            }
                        } else {
                            message += (message.length > 0 ? '\n' : '') + 'Unknown error';
                        }
                    }
                    toastEvent.setParams({
                        title: 'Error',
                        type: 'error',
                        message: message
                    });
                    toastEvent.fire();
                }//Error code ends 
                
            }));
            $A.enqueueAction(action);
        }
    },
    
    openModel: function(component, event, helper) {
        // for Display Model,set the "isOpen" attribute to "true"
        component.set("v.isOpen", true);
    },
    
    closeModel: function(component, event, helper) {
        // for Hide/Close Model,set the "isOpen" attribute to "Fasle" 
        
        component.set("v.isOpen", false);
    },
    closeModel1: function(component, event, helper) {
        // for Hide/Close Model,set the "isOpen" attribute to "Fasle" 
        
        alert('Record is Created Successfully'); 
   helper.showToast('success','Success Message','Record is Created Successfully'); 
 
        
        
        component.set("v.isOpen", false);
    },
    
    likenClose: function(component, event, helper) {
        // Display alert message on the click on the "Like and Close" button from Model Footer 
        // and set set the "isOpen" attribute to "False for close the model Box.
       // alert('thanks for like Us :)');
        component.set("v.isOpen", false);
        
        
    }
    
})