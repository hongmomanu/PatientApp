Ext.define('PatientApp.view.setting.Settings', {

    extend: 'Ext.form.Panel',
    xtype: 'settingsform',
    //alias: 'widget.RegisterPanel',
    //itemId: 'registerpanel',
    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {

        title:'我的设置',
        scrollable:true,
        style:{
            'padding':'1px'
        },
        listeners: {
            painted: function(){
                //alert('hey!');
                //var main = this.up('main');
                //testobj=this;
                this.fireEvent('viewshow', this);
            }
        },
        items:[

            {
                xtype:'fieldset',
                title: '个人信息',

                defaults:{
                    labelWidth:'35%',
                    labelAlign:'top'
                },
                listeners: {
                    tap: function(){
                        //alert('hey!');
                        //var main = this.up('main');
                        //testobj=this;
                        //this.fireEvent('viewshow', this);
                    }
                },
                layout: 'hbox',
                items:[
                    {
                        layout:'vbox',
                        items:[
                            {
                                xtype: 'textfield',
                                label: '用户名',
                                //disabled:true,
                                readOnly:true,
                                itemId:'username',
                                name: 'username'

                            },
                            {
                                xtype: 'textfield',
                                label: '姓名',
                                //disabled:true,
                                readOnly:true,
                                itemId:'realname',
                                name: 'realname'

                            },
                            {
                                xtype: 'textfield',
                                label: '我的余额',
                                name:'money',
                                readOnly:true,
                                //disabled:true,
                                itemId:'moneyInfo'
                            }

                        ],
                        /*html:'<div>hello jack</div>',
                        itemId:'userInfo',*/
                        flex:3
                    }
                    ,
                    {
                        flex:1,
                        xtype:'container',
                        //padding:'15 0 0 20',
                        layout: {
                            type: 'vbox',
                            align: 'middle'
                        },
                        items:[
                            {
                                centered:true,
                                xtype:'image',
                                itemId:'doctorCodepicSmall',
                                id:'doctorCodepicSmall'
                            }
                        ]
                    }


                ],
                label:'我的账户'

            },
            {
                xtype:'fieldset',
                defaults:{
                    labelWidth:'35%',
                    labelAlign:'top'
                },
                items:[
                    {
                        xtype:'button',
                        itemId:'addmoneybtn',
                        //label:'我的账户'
                        text:'我要充值'
                    }
                ]
            },
            {
                xtype:'fieldset',
                defaults:{
                    labelWidth:'35%',
                    labelAlign:'top'
                },
                items:[
                    {
                        xtype:'button',
                        ui  : 'confirm',
                        itemId:'scanbtn',
                        text:'扫描二维码'
                    }

                ]

            }
            ,
            {
                xtype:'fieldset',
                defaults:{
                    labelWidth:'35%',
                    labelAlign:'top'
                },
                items:[
                    {
                        xtype:'button',
                        itemId:'logouttn',
                        ui  : 'decline',
                        text:'退出'
                    }

                ]

            }
            /*,
            {
                xtype:'fieldset',
                defaults:{
                    labelWidth:'35%',
                    labelAlign:'top'
                },
                items:[
                    {
                        xtype:'textfield',
                        label:'我的账户'
                    },
                    {
                        xtype:'sliderfield',
                        name:'test2',
                        value:30,
                        label:'settings test2'
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
                        text:'ok',
                        itemId:'settingsok'
                    }
                ]
            }*/
        ]


    }
});