Ext.define('PatientApp.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: '患友圈',
                iconCls: 'action',

                styleHtmlContent: true,
                scrollable: true,
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
                title: 'Get Started',
                iconCls: 'action',

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Getting Started'
                    },
                    {
                        xtype: 'video',
                        url: 'http://av.vimeo.com/64284/137/87347327.mp4?token=1330978144_f9b698fea38cd408d52a2393240c896c',
                        posterUrl: 'http://b.vimeocdn.com/ts/261/062/261062119_640.jpg'
                    }
                ]
            }
        ]
    }
});
