Ext.define('PatientApp.store.village.VillageDoctors', {
    extend: 'Ext.data.Store',
    config: {
        model: 'PatientApp.model.village.VillageDoctor',
        autoLoad: false,
        //sorters: '_id',
        grouper: {
            groupFn: function(record) {
                return record.get('userinfo').sectionname;
            }
        },
        proxy: {
            type: 'ajax',
            url: Globle_Variable.serverurl+"patient/getquickdoctorsbyid"
        }
    }
});
