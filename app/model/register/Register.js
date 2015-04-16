Ext.define('PatientApp.model.register.Register', {
    extend: 'Ext.data.Model',
    requires: ['Ext.data.JsonP'],
    config: {
        fields: [

            {
                name: 'password',
                type: 'string'
            },

            {
                name: 'realname',
                type: 'string'
            },

            {
                name: 'username',
                type: 'string'
            },

            {
                name: 'passwordagain',
                type: 'string'
            }],
        validations: [{
            field: 'username',
            type: 'presence',
            message: '请输入姓名!'
        },{
            field: 'realname',
            type: 'presence',
            message: '请输入姓名!'
        },
            {
                field: 'password',
                type: 'presence',
                message: '请输入密码!'
            },{
                field: 'passwordagain',
                type: 'presence',
                message: '请输入密码!'
            }
            ]
    },
    //添加自定义验证
    validate: function (options) {
        var me = this,
            errors = me.callParent(arguments),

            password = this.get('password'),
            passwordConfirm = this.get('passwordagain');
        if (password != passwordConfirm) {
            errors.add({
                field: 'passwordagain',
                message: '两次密码输入不一致!'
            })
        }
        /*if (tService == 'O') {
            if (this.get('address') == '') {
                errors.add({
                    field: 'address',
                    message: '请输入地址!'
                })
            }
        }*/
        return errors;
    }
});