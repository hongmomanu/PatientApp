Ext.define('PatientApp.view.setting.AliPayView', {
    extend: 'Ext.Panel',
    xtype: 'alipayview',
    alias: 'widget.alipayView',

    config: {
        title:'在线支付',
        scrollable:true,

        //layout : 'fit',
        fullscreen: true,
        html: '<iframe id="payframe"></iframe>'


    }
});