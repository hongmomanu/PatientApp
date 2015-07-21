/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('PatientApp.controller.SettingsOld', {
    extend: 'Ext.app.Controller',
    config: {
        views: [
            'setting.Settings',
            'setting.AliPayView',
            'setting.AddMoneyForm'
        ],
        models: [
           // 'settings.BlackList'

        ],
        stores: [
            //'settings.BlackLists'
        ],
        control: {
            settingsformview: {
                viewshow: 'viewactived'
            },
            pushsetbtn:{
                'tap':'showPushForm'
            },
            addmoneybtn:{
                'tap':'showAddMoneyForm'
            },
            logoutbtn:{
              'tap':'logoutFunc'
            },
            addmoneyconfirmbtn:{
                'tap':'showUnionpayView'
            },
            patientCodepicSmallView:{
                'tap':'showBigCode'
            },
            scanbtn:{
                'tap':'showScan'
            },
            custompushconfirmbtn:{
                'tap':'confirmPush'
            }
        },
        refs: {
            settingsformview: 'settingsform',
            pushsetbtn: 'settingsform #pushsetbtn',
            scanbtn: 'settingsform #scanbtn',
            logoutbtn: 'settingsform #logoutbtn',
            addmoneybtn: 'settingsform #addmoneybtn',
            userInfo:'settingsform #userInfo',
            moneyInfo:'settingsform #moneyInfo',
            mainview: 'main',
            addmoneyconfirmbtn: 'addmoneyform #confirmbtn',
            custompushformview: 'custompushform',
            custompushconfirmbtn: 'custompushform #confirmbtn',
            settingnavview:'main #settingnavigationview',
            patientCodepicSmallView: 'settingsform #patientCodepicSmall'
        }
    },
    showAddMoneyForm:function(btn){

        //var navView=this.getSettingnavview();

        var navView=this.getMainview().getActiveItem().down('navigationview');


        var form=Ext.widget('AddMoneyForm');
        navView.push(form);

    },
    showScan:function(btn){
        var me=this;
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                var url=result.text.split('?');
                var urlparams=Ext.urlDecode(url[1]);

                var type=urlparams.type;
                var realname=urlparams.realname;
                var userid=urlparams.userid;



                if(type=='doctor'){

                    var successFunc = function (response, action) {

                        var res=JSON.parse(response.responseText);
                        if(res.success){
                            Ext.Msg.alert('成功', '添加医生:'+realname+'成功', function(){
                                //Ext.Msg.alert('22',JSON.stringify(params));
                                var doctorCotroller=me.getApplication().getController('Doctor');
                                var mainView = doctorCotroller.getMainview();
                                mainView.setActiveItem(1);
                                doctorCotroller.initDoctorList();
                            });

                        }else{

                            Ext.Msg.alert('提示', res.message, Ext.emptyFn);

                        }
                        //view.pop();

                    };
                    var failFunc=function(response, action){
                        Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
                        //Ext.Msg.alert('test', 'test', Ext.emptyFn);
                        //view.pop();

                    }
                    var url="patient/adddoctorbyid";

                    var params={
                        patientid:Globle_Variable.user._id,
                        doctorid:userid

                    };
                    CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');



                }else{
                    Ext.Msg.alert('提示', '病人无扫码功能', Ext.emptyFn);

                }



            },
            function (error) {
                Ext.Msg.alert('失败', "Scanning failed: " + error, Ext.emptyFn);
                // alert("Scanning failed: " + error);
            }
        );

    },
    logoutFunc:function(btn){
        Ext.Msg.confirm("提示","确定退出?",function (buttonid){
            if(buttonid=='yes'){
                Globle_Variable.user=null;
                localStorage.user="";
                window.location.reload();
            }
        });
    },
    showAlipayView:function(btn){
        var me=this;
        Ext.Msg.confirm("提醒","阿里支付接口未实现,这里模拟,确定充值么?",function (buttonid){
            if(buttonid=='yes'){
                var form=btn.up('formpanel');
                var money=form.getValues().money;
                 var successFunc = function (response, action) {
                     var res=JSON.parse(response.responseText);
                     if(res.success){
                         Ext.Msg.alert('充值成功', '总金额:'+res.message, function(){
                             var navView=me.getSettingnavview();
                             navView.pop();
                             me.getMoneyInfo().setValue(res.message);
                         });

                     }else{
                         Ext.Msg.alert('充值失败', res.message, Ext.emptyFn);
                     }

                 };
                var failFunc=function(response, action){
                    Ext.Msg.alert('登录失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
                }
                var url="patient/makemoneybyuserid";
                var params=Ext.apply(form.getValues(),{userid:Globle_Variable.user._id});
                CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

            }

        })

    },

    payfinish:function(data){
        //this.overlay.hide();
        Ext.Viewport.remove(this.overlay);
        //var nav=this.getSettingnavview();
        var nav=this.getMainview().getActiveItem().down('navigationview');
        nav.pop(nav.getInnerItems().length - 1);
        var me=this;
        if(data.success){
            var money=data.amount;
            var successFunc = function (response, action) {
                var res=JSON.parse(response.responseText);
                if(res.success){
                    Ext.Msg.alert('充值成功', '总金额:'+res.message, function(){
                        //var navView=me.getSettingnavview();
                        //navView.pop();
                        me.getMoneyInfo().setValue(res.message);
                    });

                }else{
                    Ext.Msg.alert('充值失败', res.message, Ext.emptyFn);
                }

            };
            var failFunc=function(response, action){
                Ext.Msg.alert('登录失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
            }
            var url="patient/makemoneybyuserid";
            var params={userid:Globle_Variable.user._id,money:money};
            CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

        }else{
            Ext.Msg.alert('充值失败', '充值未完成', Ext.emptyFn);
        }

    },
    showUnionpayView:function(btn){

        var form=btn.up('formpanel');
        var money=form.getValues().money;
        var me=this;

       /* var navView=this.getSettingnavview();
        var view=Ext.widget('alipayView');
        view.money=money;
        navView.push(view);
        var framedom=Ext.get('payframe').dom;
        //framedom.src=Globle_Variable.serverurl+"pay/unionpay?money="+money*100;
        framedom.src="http://192.168.2.100:3002/";*/

        /*Ext.Viewport.mask({ xtype: 'loadmask',
            message: "加载数据中..." });
        setTimeout(function(){
            Ext.Viewport.unmask();
        },2000);*/

        this.overlay = Ext.Viewport.add({
            xtype: 'panel',

            // We give it a left and top property to make it floating by default
            left: 0,
            top: 0,
            padding:0,

            // Make it modal so you can click the mask to hide the overlay
            modal: true,
            hideOnMaskTap: false,

            // Make it hidden by default
            hidden: true,

            // Set the width and height of the panel
            width: '100%',
            height: '100%',
            /*masked: {
                xtype: 'loadmask',
                message: '加载数据中....'
            },*/
            // Here we specify the #id of the element we created in `index.html`
            contentEl: 'content',

            // Style the content and make it scrollable
            styleHtmlContent: true,
            scrollable: true,

            // Insert a title docked at the top with a title
            items: [
                {
                    //docked: 'top',
                    xtype: 'panel',
                    html:'<iframe id="payframe" style="height: '+(Ext.getBody().getHeight()-15)+'px;width: 100%;"  width="100%" height="100%"   src="'+Globle_Variable.serverurl+"pay/unionpay?money="+money*100+'&patientid='+Globle_Variable.user._id+'">Your device does not support iframes.</iframe>',
                    title: '银联在线支付'
                }
            ]
        });
        this.overlay.showBy(btn);

        /*setTimeout(function(){
            me.overlay.setMask(false)
        },2000);*/

        /*setTimeout(function(){
            me.overlay.setMask(false)
        },2000);*/







    },


    makePushFire:function(){
        //res.data 86400000
        var custompush=JSON.parse(localStorage.custompush);
        var sendtime=new Date(custompush.sendtime);
        var frequency=custompush.frequency;
    },


    viewactived: function (view, item) {

        this.makeUserinfo();

        //alert(111);
        /*var pic_view=this.getDoctorCodepicSmallView();
        console.log(pic_view);*/
        /*$('#doctorCodepicSmall').html('');
        $('#doctorCodepicSmall').qrcode({
            text	: "http://jetienne.com",
            width		: 64,
            height		: 64
        });*/
    },

    initSetting:function(){

        this.makecode(64,64,'patientCodepicSmall');
        this.makeUserinfo();

    },

    makeUserinfo:function(){
        var me=this;
       /* me.getUserInfo().setHtml('<div style="height: 100%;"><table  ><tr><td><a>用户名:</a></td><td><a>'+Globle_Variable.user.username+'</a></td></tr></div>'
        +'<div><tr><td><a>姓名:</a></td><td><a>'+Globle_Variable.user.realname+'</a></td></tr></table></div>');
*/
        var form=this.getSettingsformview();

        var successFunc = function (response, action) {
            var res=JSON.parse(response.responseText);
            if(res.success){
                 //me.getMoneyInfo().setHtml('<div>我的余额:'+res.money+'</div>')
                form.setValues({
                    money:res.money,
                    username:Globle_Variable.user.username,
                    realname:Globle_Variable.user.realname
                });
            }else{

            }

        };
        var failFunc=function(response, action){
            Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
        }
        var url="patient/getmoneybyid";
        var params={userid: Globle_Variable.user._id};
        CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

    },

    makecode:function(width,height,id){
        var cont=$('#'+id);
        cont.html('');
        cont.qrcode({
            text	: Globle_Variable.serverurl+'download/patient.apk?type=patient&userid='+Globle_Variable.user._id
            +'&realname='+encodeURI(Globle_Variable.user.realname),
            width		: width,
            height		: height
        });
    },

    confirmPush:function(btn){
        var navView=this.getSettingnavview();
        var form=btn.up('formpanel');

        var values=form.getValues();
        Ext.Msg.confirm("提示","确定修改?",function(btn){
            if(btn=="yes"){

                var successFunc = function (response, action) {
                    var res=JSON.parse(response.responseText);
                    if(res.success){
                        Ext.Msg.alert('成功', '设置定制成功', Ext.emptyFn);
                        navView.pop();

                    }else{
                        Ext.Msg.alert('失败', '设置定制失败', Ext.emptyFn);

                    }

                };
                var failFunc=function(response, action){
                    Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
                }
                var url="settings/savecustompush";
                var params=Ext.apply({doctorid: Globle_Variable.user._id}, values);
                CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

            }
        })
    },
    showBigCode:function(item){

        var overlay = Ext.Viewport.add({
            xtype: 'panel',

            // We give it a left and top property to make it floating by default
            left: 0,
            top: 0,

            // Make it modal so you can click the mask to hide the overlay
            modal: true,
            hideOnMaskTap: true,

            // Make it hidden by default
            hidden: true,

            // Set the width and height of the panel
            width: 280,
            height: 280,

            // Here we specify the #id of the element we created in `index.html`
            contentEl: 'content',

            // Style the content and make it scrollable
            styleHtmlContent: true,
            scrollable: true,

            // Insert a title docked at the top with a title
            items: [
                {
                    //docked: 'top',
                    xtype: 'panel',
                    html:'<div id="biggercode"></div>',
                    title: 'Overlay Title'
                }
            ]
        });
        this.makecode(220,220,"biggercode");
        overlay.showBy(item);

    }


});