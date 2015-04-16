Ext.define('PatientApp.view.register.Register', {

    extend: 'Ext.form.Panel',
    xtype: 'registerform',
    alias: 'widget.RegisterPanel',
    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {

        title:'个人注册',
        style:{
            'padding':'1px'
        },
        fullscreen: true,
        items:[
            {
                xtype:'fieldset',
                instructions:'请填写信息',
                defaults:{
                    labelWidth:'150px'
                },
                items:[{
                    xtype:'textfield',
                    name:'name',
                    label:'姓名',
                    placeHolder:'请输入名',
                    value:1,
                    required:true,
                    clearIcon:true,
                    labelAlign:'left'
                },
                {
                    xtype:'passwordfield',
                    name:'password',
                    label:'密码',
                    placeHolder:'请输入密码',
                    required:true,
                    clearIcon:true
                },
                {
                    xtype:'passwordfield',
                    name:'passwordagain',
                    label:'密码',
                    placeHolder:'请输入密码',
                    required:true,
                    clearIcon:true
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
                        text:'注册',
                        itemId:'patientregister'
                    }
                ]
            }]


    }
});