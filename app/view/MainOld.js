Ext.define('PatientApp.view.MainOld',





    {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [

            {
                title: '患友圈',
                iconCls: 'users',

                //styleHtmlContent: true,
                scrollable: false,
                layout: 'fit',
                items: [

                    {
                        xtype: 'navigationview',
                        autoDestroy: false,
                        //fullscreen: true,
                        itemId: 'patientsnavigationview',
                        //inside this first item we are going to add a button
                        items: [
                            {
                                xtype: 'patients',
                                title: '患友圈'
                            }
                        ]


                    }

                ]
            },
            {
                title: '我的医生',
                iconCls: 'doctors',

                styleHtmlContent: true,
                scrollable: false,
                layout: 'fit',
                items: [

                    {
                        xtype: 'navigationview',
                        autoDestroy: false,

                        //fullscreen: true,
                        itemId: 'doctorsnavigationview',
                        //inside this first item we are going to add a button
                        items: [
                            {
                                xtype: 'doctors',
                                title: '我的医生'
                            }
                        ]


                    }

                ]
            },
            {
                title: '社区急救',
                iconCls: 'quick',
                styleHtmlContent: true,
                scrollable: false,
                layout: 'fit',
                items: [

                    {
                        xtype: 'navigationview',
                        autoDestroy: false,

                        //fullscreen: true,
                        itemId: 'villagenavigationview',
                        //inside this first item we are going to add a button
                        items: [
                            {
                                xtype: 'village',
                                title: '社区急救'
                            }
                        ]


                    }

                ]
            },
            {
                title: '我的设定',
                iconCls: 'action',
                //styleHtmlContent: true,
                scrollable: false,
                layout: 'fit',
                items: [

                    {
                        xtype: 'navigationview',
                        autoDestroy: false,

                        //fullscreen: true,
                        itemId: 'settingnavigationview',
                        //inside this first item we are going to add a button
                        items: [
                            {
                                xtype: 'settingsform',
                                title: '我的设定'
                            }
                        ]


                    }

                ]
            }
        ]
    }
}


);
