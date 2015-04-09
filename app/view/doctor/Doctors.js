Ext.define('PatientApp.view.doctor.Doctors', {
    extend: 'Ext.List',
    xtype: 'doctors',
    alias: 'widget.doctors',
    config: {
        //title: '医生圈',
        //cls: 'x-contacts',
        variableHeights: true,
        itemId:'doctorlist',
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :true,
        grouped:true,
        //indexBar:true,
        store: 'Doctors',

        listeners: {
            painted: function(){

                this.fireEvent('viewshow', this);
            }
        },

        items: [],
        itemTpl: [
            '<div class="headshot">',
            '{userinfo.sectionname} {userinfo.realname}',
            '</div>'
        ].join('')
    }
});