Ext.define('PatientApp.view.village.Village', {

    extend: 'Ext.List',
    xtype: 'village',
    alias: 'widget.village',
    config: {
        //title: '医生圈',
        //cls: 'x-contacts',
        variableHeights: true,
        itemId:'villagequickdoctors',
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :true,
        grouped:false,
        //indexBar:true,
        store: 'VillageDoctors',

        listeners: {
            painted: function(){

                this.fireEvent('viewshow', this);
            }
        },

        items: [{
            xtype: 'toolbar',
            docked: 'bottom',
            items: [


                {
                    xtype: 'selectfield',
                    label: '范围',
                    width:150,
                    itemId:'distance',
                    options: [
                        {text: '500米',  value: 500},
                        {text: '1000米', value: 1000},
                        {text: '1500米',  value: 1500}
                    ]
                }
                ,
                /*{
                    xtype: 'button',
                    itemId: 'seequick',
                    ui: 'search',
                    hidden:true,
                    flex: 1,
                    text: '查看'
                },*/
                {
                    xtype: 'button',
                    itemId: 'sendquick',
                    ui: 'decline',
                    iconCls:'action',

                    //flex: 1,
                    text: '求救'
                },{
                    xtype:'label',
                    itemId:'applytimeinfo'
                }


            ]
        }],
        itemTpl: [
            '<div class="headshot">',
            '{userinfo.sectionname} {userinfo.realname}',
            '</div>'
        ].join('')
    }
});

