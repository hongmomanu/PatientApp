Ext.define('PatientApp.view.Main', {
    extend: 'Ext.NavigationView',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Ajax',
        'Ext.Video'
    ],
    config: {


        fullscreen: true,
        centered: true,
        autoDestroy: false,
        //scrollable: 'vertical',

        scrollable:false,

        height: '100%',
        width: '100%',
        style: {
            'padding': '1px'
        },

        //title:'我的工厂',

        /*navigationBar : {

            /!*backButton: {
             iconCls: 'fa fa-arrow-circle-o-left',
             ui: 'plain'
             },*!/
            docked : 'top',
            items : [

                {
                    xtype:'mainmenu',
                    iconCls:'fa fa-cog'
                }

            ]
        },*/

        items: [


            {

                title:'医医通',

                layout : 'fit',
                xtype: 'container',
                /*listeners: {
                    painted: function(){
                        var item=this.up('navigationview');

                        item.fireEvent('viewshow', item);
                        //alert(1);
                    }
                },*/
                items: [



                    {
                        title: '首页',
                        iconCls: 'home',
                        //xtype:'navigationview',
                        styleHtmlContent: true,
                        scrollable: true,
                        padding:40,
                        style: 'background-color: #1C1F26;',
                        /*itemId: 'homepage',
                        //styleHtmlContent: true,*/
                        layout: 'vbox',


                        items: [
                            {

                                flex:1,
                                xtype:'container',

                                html:'<div style="color:white;width:100%;height:100%;text-align: center;vertical-align: middle; "><div  style="margin:0 auto;vertical-align: middle;text-align: center;" class="circletagnew">' +
                                '<img width="80px"   height="80px " src="resources/icons/user.png"></div><div style="padding-top:20px;">王小明</div></div>'

                            },
                            {

                                flex:1.2,
                                style: 'background-color: #1C1F26;',

                                xtype:'mainlist'

                            }

                        ]
                    }
                ]

            }


        ]





    }
});