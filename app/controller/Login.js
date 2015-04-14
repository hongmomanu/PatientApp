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
            },
            loginformview:{
                initialize:'initFunc'

            }

        },
        refs: {

            patientloginbtn: 'loginform #patientlogin',
            newpatientbtn: 'loginform #newpatient',
            loginformcontent:'loginform #loginformcontent',
            loginformview: 'loginform'
        }
    },
    // app init func

    initFunc:function (){
        this.autoLogin();
        this.makeLocationListener();

    },
    autoLogin:function(){

        var userinfo=JSON.parse(localStorage.user);

        if(userinfo){
            var formpanel=this.getLoginformcontent();
            formpanel.setValues(userinfo);
            this.doPatientLogin();

        }

    },
    makeLocationListener:function(){

        function onSuccess(position) {
            /*var element = document.getElementById('geolocation');
             element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
             'Longitude: ' + position.coords.longitude     + '<br />' +
             '<hr />'      + element.innerHTML;*/

            localStorage.lat=position.coords.latitude;
            localStorage.lon=position.coords.longitude;

        }
        // onError Callback receives a PositionError object
        //
        function onError(error) {

            Ext.Msg.alert('警告', error.message, Ext.emptyFn);
            localStorage.lat=30.0;
            localStorage.lon=120.0;
        }
        // Options: throw an error if no update is received every 30 seconds.
        //
        var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 3000 });

    },
    doPatientLogin:function(btn){

        var formpanel=this.getLoginformcontent();
        CommonUtil.addMessage();
        var me=this;
        var valid = CommonUtil.valid('PatientApp.model.login.Login', formpanel);
        if(valid){
            var successFunc = function (response, action) {
                var res=JSON.parse(response.responseText);
                if(res.success){

                    Ext.Viewport.removeAt(0);
                    Ext.Viewport.add(Ext.create('PatientApp.view.Main'));
                    localStorage.user=JSON.stringify(res.user);
                    Globle_Variable.user=res.user;
                    var patientCotroller=me.getApplication().getController('Patient');
                    var doctorCotroller=me.getApplication().getController('Doctor');
                    patientCotroller.initPatientList();
                    doctorCotroller.initDoctorList();
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