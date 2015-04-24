Ext.define('PatientApp.view.login.Login', {

    extend: 'Ext.NavigationView',
    xtype: 'loginform',
    autoDestroy: true,
    alias: 'widget.LoginPanel',
    itemId: 'loginpanel',
    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {
        fullscreen: true,


        //scrollable: false,
        scrollable: 'vertical',
        style: {
            'padding': '1px'
        },

        items: [
            {
                title: '个人登录',
                xtype:'formpanel',
                itemId:'loginformcontent',
                layout: 'fit',
                scrollable:true,
                items: [
                    {
                        xtype: 'container',
                        layout: 'fit',
                        //scrollable:true,
                        items:[
                            {
                                xtype: 'fieldset',
                                centered: true,
                                //title: '医生登录',
                                instructions: '请填写信息',
                                defaults: {
                                    labelWidth: '150px'
                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        name: 'username',
                                        label: '用户名',
                                        placeHolder: '请输入用户名',
                                        required: true,
                                        clearIcon: true,



                                        labelAlign: 'left'
                                    },
                                    {
                                        xtype: 'passwordfield',
                                        name: 'password',
                                        label: '密码',
                                        placeHolder: '请输入密码',
                                        required: true,
                                        clearIcon: true
                                    }
                                ]
                            }
                        ]

                    }
                    ,
                    {
                        xtype   : 'toolbar',
                        docked  : 'bottom',
                        layout  : {
                            pack  : 'center',
                            type  : 'hbox'
                        },
                        items:[ {
                            xtype: 'button',
                            text: '登录',
                            ui:'confirm',
                            itemId: 'patientlogin'
                        },
                            {
                                xtype: 'button',
                                text: '注册',
                                ui:'decline',
                                itemId: 'newpatient'
                            }]
                    }
                    ]

            }


        ]


    }
});