Ext.define('PatientApp.view.patient.Patients', {
    extend: 'Ext.List',
    xtype: 'patients',
    alias: 'widget.patients',
    config: {

        variableHeights: true,
        itemId:'patientlist',
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :true,
        grouped:true,
        //indexBar:true,
        store: 'Patients',

        listeners: {
            painted: function(){

                this.fireEvent('viewshow', this);
            }
        },

        items: [],
        itemTpl: [
            '<div class="headshot">',
            '{patientinfo.realname}',
            '</div>'
        ].join('')
    }
});