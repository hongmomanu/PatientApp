Ext.define('PatientApp.view.setting.AddMoneyForm', {

    extend: 'Ext.form.Panel',
    xtype: 'addmoneyform',
    alias: 'widget.AddMoneyForm',
    //itemId: 'registerpanel',
    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {
        title:'推送定制',
        style:{
            'padding':'1px'
        },
        fullscreen: true,
        items:[
            {
                xtype:'fieldset',
                instructions:'账户充值',
                defaults:{
                    labelWidth:'150px'
                },
                items:[

                    {
                        xtype: 'selectfield',
                        label: '充值金额',
                        name:'money',
                        options: [
                            {text: '0.01元',  value: 0.01},
                            {text: '10元',  value: 10},
                            {text: '15元', value: 15},
                            {text: '20元',  value: 20},
                            {text: '30元',  value: 30}
                        ]
                    }
                ]
            },
            {
                xtype:'container',
                layout:{
                    type:'vbox'
                },
                items:[
                    {
                        xtype:'button',
                        text:'确定',
                        itemId:'confirmbtn'
                    }
                ]
            }]


    }
});