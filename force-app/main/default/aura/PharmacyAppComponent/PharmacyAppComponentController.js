({
    doInit : function(component, event, helper) {
        component.set('v.steps', [
            { label: 'Select A Client', value: 'Select Client' },
            { label: 'Contact Info', value: 'Contact Info' },
            { label: 'Update Insurance', value: 'Update Insurance' },
            { label: 'Add Order Items', value: 'Add Order Items' },
            { label: 'Order Instructions', value: 'Order Instructions' },
            { label: 'Order Review', value: 'Order Review' },
            { label: 'Pharmacy Working', value: 'Pharmacy Working' },
        ]);

    },
    handleNewClientSelected : function(component, event, helper) {
        helper.refreshOrder(component, event);
    }

})