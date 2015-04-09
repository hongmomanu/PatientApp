/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('PatientApp.controller.Login', {
    extend: 'Ext.app.Controller',


    config: {

        views: [


        'login.Login'



        ],
        models: [


            'login.Login'


        ],
        stores: [

            //'patients.Patients',

            //'Contacts'
        ],
        control: {

            patientloginbtn:{

                tap:'doPatientLogin'
            },
            newpatientbtn:{

                tap:'doNewPatient'
            }

        },
        refs: {

            patientloginbtn: 'loginform #patientlogin',
            newpatientbtn: 'loginform #newpatient',
            loginformcontent:'loginform #loginformcontent',
            loginformview: 'loginform'
        }
    },
    //doctor app init
    doPatientLogin:function(btn){

        var formpanel=this.getLoginformcontent();
        CommonUtil.addMessage();
        var me=this;
        var valid = CommonUtil.valid('PatientApp.model.login.Login', formpanel);
        if(valid){
            var successFunc = function (response, action) {
                var res=JSON.parse(response.responseText);
                if(res.success){
                    console.log(res);
                    Ext.Viewport.removeAt(0);
                    Ext.Viewport.add(Ext.create('PatientApp.view.Main'));
                    localStorage.user=JSON.stringify(res.user);
                    Globle_Variable.user=res.user;
                   /* Ext.Viewport.removeAt(0);
                    Ext.Viewport.add(Ext.create('DoctorApp.view.Main'));
                    localStorage.user=JSON.stringify(res.user);
                    Globle_Variable.user=res.user;

                    var doctorCotroller=me.getApplication().getController('Doctors');
                    var patientCotroller=me.getApplication().getController('Patients');
                    //var settingCotroller=me.getApplication().getController('Settings');
                    doctorCotroller.initDoctorList();
                    patientCotroller.initPatientList();
                    //settingCotroller.initBlackList();*/

                }else{
                    Ext.Msg.alert('登录失败', '用户名密码错误', Ext.emptyFn);
                }

            };
            var failFunc=function(response, action){
                Ext.Msg.alert('登录失败', '服务器连接异常，请稍后再试', Ext.emptyFn);

            }
            var url="user/patientlogin";
            var params=formpanel.getValues();
            CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

        }

    },
    doNewPatient:function(btn){
        var view=this.getLoginformview();
        var registerView=Ext.create('PatientApp.view.register.Register');

        view.push(registerView);
    }
});