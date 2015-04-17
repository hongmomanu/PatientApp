/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('PatientApp.controller.Register', {
    extend: 'Ext.app.Controller',
    config: {
        views: [


            'register.Register'


        ],
        models: [
            'register.Register'

        ],
        stores: [

            //'patients.Patients',

            //'Contacts'
        ],
        control: {

            patientregisterbtn:{

                tap:'doPatientRegister'
            }

        },
        refs: {

            patientregisterbtn: 'registerform #patientregister'
        }
    },

    doPatientRegister:function(btn){
        /*testobj=btn;
        var me = btn.up('panel');
        var formObj = me;
        var formData = formObj.getValues();
        console.log(formData);*/
        //alert(111);
        formpanel=btn.up('panel');
        CommonUtil.addMessage();
        var valid = CommonUtil.valid('PatientApp.model.register.Register', formpanel);
        var me =this;
        if(valid){


            var successFunc = function (response, action) {
                var res=JSON.parse(response.responseText);
                if(res.success){

                    Ext.Viewport.removeAt(0);
                    Ext.Viewport.add(Ext.create('PatientApp.view.Main'));

                    localStorage.user=JSON.stringify(res.message);
                    Globle_Variable.user=res.message;
                    var patientCotroller=me.getApplication().getController('Patient');
                    var doctorCotroller=me.getApplication().getController('Doctor');
                    var settingCotroller=me.getApplication().getController('Settings');
                    patientCotroller.initPatientList();
                    doctorCotroller.initDoctorList();
                    settingCotroller.initSetting();


                }else{
                    Ext.Msg.alert('注册失败',res.message, Ext.emptyFn);
                }

            };
            var failFunc=function(response, action){
                Ext.Msg.alert('登录失败', '服务器连接异常，请稍后再试', Ext.emptyFn);

            };

            var url="patient/newpatient";

            var params=formpanel.getValues();

            CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');



        }

    }
});