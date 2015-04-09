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
        grouped:true,
        //indexBar:true,
        store: 'VillageDoctors',

        listeners: {
            painted: function(){

                this.fireEvent('viewshow', this);
            }
        },

        items: [{
            xtype: 'toolbar',
            docked: 'top',
            items: [

                {
                    xtype: 'button',
                    itemId: 'sendquick',
                    ui: 'action',
                    flex: 1,
                    text: '求救'
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

