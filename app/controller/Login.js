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

    initFunc:function (item,e){
        this.autoLogin();
        this.makeLocationListener();
        this.makeBackGroundListener();
        this.pauseListener();
        this.resumeListener();
        this.backbuttonListener();
        this.initNotificationClick(e);

    },

    makeBackGroundListener:function(){
        document.addEventListener('deviceready', function () {
            // cordova.plugins.backgroundMode is now available

            cordova.plugins.backgroundMode.setDefaults({
                text:'e医通',
                ticker:'e医通患者端正在后台运行',
                title:'e医通患者端'
            });

            // Enable background mode
            cordova.plugins.backgroundMode.enable();




        }, false);

    },
    initNotificationClick:function(e){




            ///Ext.Msg.alert('clicked event0', 'is clicked');

            var doctorController=this.getApplication().getController('Doctor');
            var villageController=this.getApplication().getController('Village');
            var patientController=this.getApplication().getController('Patient');
            cordova.plugins.notification.local.on("click", function (notification) {

                var data=JSON.parse(notification.data);
                var message=data.data;
                var type=data.type;
                if(type=='recommend'){
                    doctorController.receiveRecommendShow(message,e);
                }else if(type=='quickapplying'){
                    villageController.applywaitinginfoShow(message,e)
                }else if(type=='quickaccept'){
                    patientController.receiveQuickAcceptShow(message,e)
                }
                else if(type=='recommendconfirm'){

                    doctorController.receiverecommendConfirmShow(message, e);
                }
                else{
                    doctorController.receiveMessageShow(message,e);
                }


                //(Ext.bind(doctorController.receiveMessageShow, doctorController) (notification.data,e)) ;

            });

           /* cordova.plugins.notification.local.on('trigger', function (notification) {

                //Ext.Msg.alert('clicked event', '22222');
                //Ext.Msg.alert('clicked event', JSON.stringify(notification.data));
                var data=JSON.parse(notification.data);
                var message=data.data;
                var type=data.type;
                if(type=='recommend'){
                    doctorController.receiveRecommendShow(message,e);
                }else if(type=='quickapplying'){


                }else{
                    doctorController.receiveMessageShow(message,e);
                }
                //doctorController.receiveMessageShow, doctorController) (notification.data,e))
                //Ext.Msg.alert('clicked eventrr', 'is clicked');
            });*/

            //Ext.Msg.alert('clicked event1', 'is clicked');





    },
    autoLogin:function(){

        var userinfo=JSON.parse(localStorage.user);

        if(userinfo){
            var formpanel=this.getLoginformcontent();
            formpanel.setValues(userinfo);
            this.doPatientLogin();

        }

    },
    pauseListener:function(){
        document.addEventListener("pause", onPause, false);

        function onPause() {
            // Handle the pause event
            //Ext.Msg.alert('停止测试', '停止测试', Ext.emptyFn);
            Globle_Variable.isactived=false;
        }

    },

    resumeListener:function(){
        document.addEventListener("resume", onResume, false);

        function onResume() {
            // Handle the resume event
            //Ext.Msg.alert('恢复测试', Globle_Variable.isactived+'121', Ext.emptyFn);
            Globle_Variable.isactived=true;
        }

    },
    backbuttonListener:function(){
        document.addEventListener("backbutton", onBackKeyDown, false);
        function onBackKeyDown() {
            navigator.Backbutton.goHome(function() {
                //console.log('success')
            }, function() {
                //console.log('fail')
            });
        }

    },


    makeLocationListener:function(){

        function onSuccess(position) {
            /*var element = document.getElementById('geolocation');
             element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
             'Longitude: ' + position.coords.longitude     + '<br />' +
             '<hr />'      + element.innerHTML;*/
            //Ext.Msg.alert('location suc',position.coords.latitude);

            localStorage.lat=position.coords.latitude;
            localStorage.lon=position.coords.longitude;

        }
        // onError Callback receives a PositionError object
        //
        function onError(error) {

            if(!localStorage.lat)localStorage.lat=30.0111;
            if(!localStorage.lon)localStorage.lon=120.0111;
        }
        // Options: throw an error if no update is received every 5 seconds.
        //
        var watchID = navigator.geolocation.watchPosition(onSuccess, onError, {maximumAge: 30000, timeout: 5000, enableHighAccuracy: true});

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
                    var settingCotroller=me.getApplication().getController('Settings');
                    patientCotroller.initPatientList();
                    doctorCotroller.initDoctorList();
                    settingCotroller.initSetting();


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