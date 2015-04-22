/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('PatientApp.controller.Village', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.field.Number'
    ],
    config: {
        views: [
            'village.Village'

        ],
        models: [
            'village.VillageDoctor'

        ],
        stores: [

            'village.VillageDoctors'

        ],
        control: {
            villagenavview: {
                push: 'onMainPush'
            },
            distanceBox:{
                change:'distanceSelected'

            },
            villageview: {
                itemtap: 'onVillageSelect',
                itemtaphold:'onVillageHold',
                viewshow:'searchDoctor'
            },
            sendbtn:{
                tap:'askforDoctor'

            }


        },
        refs: {
            villageview: '#villagenavigationview #villagequickdoctors',
            mainview: 'main',
            sendbtn: '#villagenavigationview #sendquick',
            applytimeinfo: '#villagenavigationview #applytimeinfo',
            distanceBox: '#villagenavigationview #distance',
            villagenavview:'main #villagenavigationview'
        }
    },

    onVillageSelect: function(list){
         //

    },

    distanceSelected:function(box, newValue, oldValue ){
        this.searchDoctor();
    },
    searchDoctor:function(btn){

        var view=this.getVillageview();
        var store=view.getStore();
        var distance=this.getDistanceBox().getValue();
        store.load({
            params : { lon : localStorage.lon,lat:localStorage.lat,
                patientid:Globle_Variable.user._id,distance:distance}
        });
        //alert(1);
    },
    onVillageHold:function(){


    },
    applywaitinginfo:function(time){
        var applytimelabel=this.getApplytimeinfo();
        var timecallback=function(t,asktimeinterval){
            if(t<=0){
                clearInterval(asktimeinterval);
                Ext.Msg.alert('提示', '无医生应答', Ext.emptyFn);
            }else{
                var m=Math.floor(t/1000/60%60);
                var s=Math.floor(t/1000%60);
                applytimelabel.setHtml('<div style="color:lightblue">急救应答时间剩余:'+m + "分 "+s + "秒"+'</div>');
                applytimelabel.show();
            }

        };
        CommonUtil.lefttime(timecallback,time,Globle_Variable.user._id);

    },

    applywaitinginfoShow:function(message){

        var mainView=this.getMainview();
        mainView.setActiveItem(2);
        this.applywaitinginfo(message.applytime);
    },



    receiveQuickApplyingProcess:function(recommend,e){
        var me=this;
        try {

            //Ext.Msg.alert('test', cordova.plugins.notification.local.schedule , Ext.emptyFn);
            cordova.plugins.notification.local.schedule({
                id: recommend._id ,
                title: "急救申请消息",
                text: "时间:"+recommend.applytime,
                //firstAt: monday_9_am,
                //every: "week",
                //sound: "file://sounds/reminder.mp3",
                //icon: "http://icons.com/?cal_id=1",
                data: { meetingId:recommend._id }
            });

            cordova.plugins.notification.local.on("click", function (notification) {

                me.applywaitinginfoShow(recommend,e);

            });

        }catch (err){

            me.applywaitinginfoShow(recommend,e);

        } finally{


        }


    },
    enoughMoney:function(){


    },

    askforDoctor:function(btn){
        var list=btn.up('list');
        var store=list.getStore();
        var me =this;


        var overlay = Ext.Viewport.add({
            xtype: 'formpanel',
            // We give it a left and top property to make it floating by default
            centered:true,

            // Make it modal so you can click the mask to hide the overlay
            modal: true,
            hideOnMaskTap: false,

            // Make it hidden by default
            hidden: true,

            // Set the width and height of the panel
            width: 240,
            height: 140,

            // Here we specify the #id of the element we created in `index.html`
            contentEl: 'content',

            // Style the content and make it scrollable
            styleHtmlContent: true,
            scrollable: true,

            // Insert a title docked at the top with a title
            items: [
                {
                    xtype: 'numberfield',
                    label: '加急金额',
                    labelWidth:'40%',
                    minValue: 0,
                    value:0,
                    maxValue: 30,
                    name: 'addmoney'
                },
                {
                    xtype   : 'toolbar',
                    docked  : 'bottom',
                    layout  : {
                        pack  : 'center'
                    },
                    items:[
                        {
                            xtype:'button',
                            ui:'confirm',
                            handler:function(btn){
                                overlay.hide();
                                var form=btn.up('formpanel');
                                //testobj=form;
                                var money=form.getValues().addmoney;
                                if(money!=null){
                                    if(store.getCount()>0){
                                        var doctorids=[];
                                        store.data.each(function(item){
                                            doctorids.push(item.get('_id'));
                                        });
                                        var successFunc = function (response, action) {
                                            var res=JSON.parse(response.responseText);
                                            if(res.success){
                                                Ext.Msg.alert('成功', '等待医生应答', function(){
                                                    me.applywaitinginfo(new Date());
                                                });
                                            }else{
                                                Ext.Msg.alert('警告', '呼叫急救医生失败'+res.message, Ext.emptyFn);
                                            }

                                        };
                                        var failFunc=function(response, action){
                                            Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
                                        }
                                        var url="patient/applyforquickdoctorswhocanhelp";
                                        var params={
                                            patientid: Globle_Variable.user._id,
                                            doctorids:JSON.stringify(doctorids),
                                            addmoney:money
                                        };
                                        CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

                                    }else{
                                        Ext.Msg.alert('警告', '范围内无医生可急救', Ext.emptyFn);
                                    }

                                }
                                //form.getValues();
                            },
                            text:'确定'
                        }
                    ]
                }
            ]
        });
        overlay.show();


        /**/

    },
    initVillageList:function(){
        /*var view=this.getVillageview();
        var store=view.getStore();
        var distance=this.getDistanceBox().getValue();
        store.load({
            params : { lon : localStorage.lon,lat:localStorage.lat,
                patientid:Globle_Variable.user._id,distance:distance}
        })*/
    },
    onMainPush:function(view, item){


    }


});