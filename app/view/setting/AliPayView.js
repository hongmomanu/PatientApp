Ext.define('PatientApp.view.setting.AliPayView', {

    extend: 'Ext.Panel',
    xtype: 'alipayview',
    alias: 'widget.AliPayView',
    //itemId: 'registerpanel',
    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],
    layout : 'fit',
    config: {
        title:'在线支付',
        scrollable:true,
        style:{
            'padding':'1px'
        },
        //layout : 'fit',
        fullscreen: true,
        html: '<iframe id="payframe" style="height: '+(Ext.getBody().getHeight()-75)+'px;width: 100%;"  width="100%" height="100%"   ">Your device does not support iframes.</iframe>'


    }
});