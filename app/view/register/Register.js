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
        layout: 'fit',
        fullscreen: true,
        items:[
            {
                xtype: 'container',
                layout: 'fit',
                items:[
                    {
                        xtype:'fieldset',
                        instructions:'请填写信息',
                        centered: true,
                        defaults:{
                            labelWidth:'150px'
                        },
                        items:[{
                            xtype:'textfield',
                            name:'username',
                            label:'用户名',
                            placeHolder:'请输入用户名',
                            required:true,
                            clearIcon:true,
                            labelAlign:'left'
                        },{
                            xtype:'textfield',
                            name:'realname',
                            label:'姓名',
                            placeHolder:'请输入姓名',
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
                                label:'密码确认',
                                placeHolder:'请重复输入密码',
                                required:true,
                                clearIcon:true
                            }
                        ]
                    }
                ]

            },

            {
                xtype   : 'toolbar',
                docked  : 'bottom',
                layout  : {
                    pack  : 'center'
                },
                items:[
                    {
                        xtype:'button',
                        text:'注册',
                        itemId:'patientregister'
                    }
                ]
            }
        ]


    }
});