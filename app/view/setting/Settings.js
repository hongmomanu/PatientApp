Ext.define('PatientApp.view.setting.Settings', {

    extend: 'Ext.Container',
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
                title: 'About You',
                defaults:{
                    labelWidth:'35%',
                    labelAlign:'top'
                },
                listeners: {
                    tap: function(){
                        alert('hey!');
                        //var main = this.up('main');
                        //testobj=this;
                        //this.fireEvent('viewshow', this);
                    }
                },
                layout: 'hbox',
                items:[
                    {
                        html:'<div>hello jack</div>',
                        itemId:'doctorInfo',
                        flex:5
                    },
                    {
                        flex:1,
                        xtype:'image',
                        itemId:'doctorCodepicSmall',
                        id:'doctorCodepicSmall',
                        height: 64,
                        width : 64
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
                        itemId:'blacklistbtn',
                        //label:'我的账户'
                        text:'我的黑名单'
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
                        label:'我的定制',
                        itemId:'pushsetbtn',
                        text:'定制推送'
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
            }
        ]


    }
});