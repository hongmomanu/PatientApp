Ext.define('PatientApp.store.doctor.Doctors', {
    extend: 'Ext.data.Store',
    config: {
        model: 'PatientApp.model.doctor.Doctor',
        autoLoad: false,
        //sorters: '_id',
        grouper: {
            groupFn: function(record) {
                return record.get('userinfo').sectionname;
            }
        },
        proxy: {
            type: 'ajax',
            url: Globle_Variable.serverurl+"patient/getmydoctorsbyid"
        }
    }
});
