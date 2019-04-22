({
    refreshOrder : function(component, event) {
        var order = event.getParam("order");
        component.set("v.order", order);
    }
})