/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('PatientApp.controller.Settings', {
    extend: 'Ext.app.Controller',
    config: {
        views: [
            'setting.Settings'
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
            doctorCodepicSmallView:{
                'tap':'showBigCode'
            },
            custompushconfirmbtn:{
                'tap':'confirmPush'
            }
        },
        refs: {
            settingsformview: 'settingsform',
            pushsetbtn: 'settingsform #pushsetbtn',
            addmoneybtn: 'settingsform #addmoneybtn',
            custompushformview: 'custompushform',
            custompushconfirmbtn: 'custompushform #confirmbtn',
            settingnavview:'main #settingnavigationview',
            doctorCodepicSmallView: 'settingsform #doctorCodepicSmall'
        }
    },
    showAddMoneyForm:function(btn){
        alert(1);
    },
    showPushForm:function(btn){
         var navView=this.getSettingnavview();
         var form=Ext.widget('CustomPushForm');
         navView.push(form);
        var successFunc = function (response, action) {
            var res=JSON.parse(response.responseText);
            if(res.success){
                localStorage.custompush=JSON.stringify(res.data);
                res.data.sendtime=new Date(res.data.sendtime);

                form.setValues(res.data);

            }else{
                Ext.Msg.alert('失败', '获取设置定制失败', Ext.emptyFn);
            }

        };
        var failFunc=function(response, action){
            Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
        }
        var url="settings/getcustompush";
        var params={doctorid: Globle_Variable.user._id};
        CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');
    },

    makePushFire:function(){
        //res.data 86400000
        var custompush=JSON.parse(localStorage.custompush);
        var sendtime=new Date(custompush.sendtime);
        var frequency=custompush.frequency;
    },


    viewactived: function (view, item) {

        //alert(111);
        /*var pic_view=this.getDoctorCodepicSmallView();
        console.log(pic_view);*/
        $('#doctorCodepicSmall').html('');
        $('#doctorCodepicSmall').qrcode({
            text	: "http://jetienne.com",
            width		: 64,
            height		: 64
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
    showBigCode:function(){
        alert(111);

    }


});