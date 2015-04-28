Ext.define('PatientApp.model.doctor.DoctorMessage', {
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
            'msgtime',
            'message',
            'messagetype'
        ]
    }
});
