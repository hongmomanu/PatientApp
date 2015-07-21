Ext.define('PatientApp.model.patient.Patient', {
    extend: 'Ext.data.Model',
    config: {
        fields: [

            'patientinfo',
            '_id',
            'relations',
            'doctorinfo'
        ]
    }
});
