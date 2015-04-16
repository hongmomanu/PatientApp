/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('PatientApp.controller.Settings', {
    extend: 'Ext.app.Controller',
    config: {
        views: [
            'setting.Settings',
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
            addmoneyconfirmbtn:{
                'tap':'showAlipayView'
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
            userInfo:'settingsform #userInfo',
            moneyInfo:'settingsform #moneyInfo',
            addmoneyconfirmbtn: 'addmoneyform #confirmbtn',
            custompushformview: 'custompushform',
            custompushconfirmbtn: 'custompushform #confirmbtn',
            settingnavview:'main #settingnavigationview',
            doctorCodepicSmallView: 'settingsform #doctorCodepicSmall'
        }
    },
    showAddMoneyForm:function(btn){

        var navView=this.getSettingnavview();
        var form=Ext.widget('AddMoneyForm');
        navView.push(form);


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
                             me.getMoneyInfo().setHtml('<div>我的余额:'+res.message+'</div>');
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
        /*$('#doctorCodepicSmall').html('');
        $('#doctorCodepicSmall').qrcode({
            text	: "http://jetienne.com",
            width		: 64,
            height		: 64
        });*/
    },

    initSetting:function(){

        this.makecode(64,64,'doctorCodepicSmall');
        this.makeUserinfo()

    },

    makeUserinfo:function(){
        var me=this;
        me.getUserInfo().setHtml('<div style="height: 100%;"><table  ><tr><td><a>用户名:</a></td><td><a>'+Globle_Variable.user.username+'</a></td></tr></div>'
        +'<div><tr><td><a>姓名:</a></td><td><a>'+Globle_Variable.user.realname+'</a></td></tr></table></div>');

        var successFunc = function (response, action) {
            var res=JSON.parse(response.responseText);
            if(res.success){
                 me.getMoneyInfo().setHtml('<div>我的余额:'+res.money+'</div>')
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
            text	: Globle_Variable.user.username,
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