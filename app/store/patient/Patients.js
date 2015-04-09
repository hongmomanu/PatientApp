Ext.define('PatientApp.store.patient.Patients', {
    extend: 'Ext.data.Store',

    config: {
        model: 'PatientApp.model.patient.Patient',
        autoLoad: false,
        sorters: 'name',
        grouper: {
            groupFn: function(record) {
                return record.get('section');
            }
        },
        proxy: {
            type: 'ajax',
            //url: 'resources/data/patients.json'
            url: Globle_Variable.serverurl+"patient/getmypatientsbyid"
        }
    }
});
