Ext.define('PatientApp.model.login.Login', {
    extend: 'Ext.data.Model',
    requires: ['Ext.data.JsonP'],
    config: {
        fields: [
            {
                name: 'username',
                type: 'string'
            },


            {
                name: 'password',
                type: 'string'
            }

           ],
        validations: [
            {
                field: 'username',
                type: 'presence',
                message: '请输入姓名!'
            },
            {
                field: 'password',
                type: 'presence',
                message: '请输入密码!'
            }]
    },
    //添加自定义验证
    validate: function (options) {
        var me = this;
        var errors = me.callParent(arguments);

        return errors;
    }
});