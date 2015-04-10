Ext.define('PatientApp.model.patient.PatientMessage', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {
                name:'local',
                type: 'boolean'
            },
            'userinfo',
            'username',
            'realname',
            'content',
            'imgid',
            'issend',
            'message',
            'messagetype'
        ]
    }
});
