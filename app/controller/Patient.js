/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('PatientApp.controller.Patient', {
    extend: 'Ext.app.Controller',
    config: {
        views: [
            'patient.Patients',
            'patient.PatientsMessage'

        ],
        models: [
            'patient.Patient',
            'patient.PatientMessage'

        ],
        stores: [

            'patient.Patients',
            'patient.PatientMessages'

        ],
        maxPosition: 0,
        scroller: null,
        control: {
            patientsnavview: {
                push: 'onMainPush'

            },
            sendmessagebtn:{
                tap:'sendMessage'
            },
            'patientmessagelistview': {
                initialize: function (list) {
                    var me = this,
                        scroller = list.getScrollable().getScroller();

                    scroller.on('maxpositionchange', function (scroller, maxPos, opts) {
                        me.setMaxPosition(maxPos.y);
                    });
                    //console.log(scroller);
                    //testobj=list;
                    me.setScroller(scroller);

                    //me.getMessage().setValue(Ext.create('Chat.ux.LoremIpsum').getSentence());
                }
            },
            patientssview: {
                itemtap: 'onPatientSelect',
                itemtaphold:'onPatientHold',
                viewshow:'listShow'
            }

        },
        refs: {
            patientssview: '#patientsnavigationview #patientlist',
            patientmessagelistview:'patientmessagelist',
            doctorsview: '#doctorsnavigationview #doctorlist',
            mainview:'main',
            sendmessagebtn: '#patientsnavigationview #sendmessage',
            messagecontent: '#patientsnavigationview #messagecontent',
            patientsnavview:'main #patientsnavigationview'
        }
    },


    sendMessage:function(btn){



        var content=Ext.String.trim(this.getMessagecontent().getValue());

        if(content&&content!=''){
            var listview=btn.up('list');
            var myinfo= listview.mydata;

            var toinfo=listview.data;
            var imgid='chatstatusimg'+(new Date()).getTime();
            var message=Ext.apply({message:content}, myinfo);
            //console.log(imgid);
            listview.getStore().add(Ext.apply({local: true,imgid:imgid}, message));

            var doctorController=this.getApplication().getController('Doctor');
            (Ext.bind(doctorController.scrollMsgList, this) ());


            /*var d = new Ext.util.DelayedTask(function(){
                //me.websocketInit();
                var img=Ext.get(imgid);
                if(img.getStyleValue('display')!=='none'){
                    img.dom.setAttribute('src','111');
                }
            });
            d.delay(10000);

            console.log(imgid);*/

            var mainController=this.getApplication().getController('Main');

            var socket=mainController.socket;
            socket.send(JSON.stringify({
                type:"doctorchat",
                from:myinfo._id,
                fromtype:0,
                imgid:imgid,
                to :toinfo.get("patientinfo")._id,
                content: content
            }));



        }else{
            CommonUtil.showMessage("no content",true);
        }


    },


    showDoctorList:function(record){
        this.selectPatient=record;

        //Ext.Msg.alert('test', 'test', Ext.emptyFn);

        var view=this.getPatientsnavview();
        var doctorsList=Ext.widget('doctors',{title:'选择医生'});
        doctorsList.on({
            itemtap  : { fn: this.onDoctorSelect, scope: this, single: true }
        });

        view.push(doctorsList);
    },
    onDoctorSelect:function(list, index, node, record){
        var me=this;
        //Ext.Msg.alert('2323', '2323', Ext.emptyFn);
        var view=me.getPatientsnavview();
        Ext.Msg.confirm('消息','确定推荐医生',function(buttonId){

            if(buttonId=='yes'){


                var successFunc = function (response, action) {

                    var res=JSON.parse(response.responseText);
                     if(res.success){
                         Ext.Msg.alert('成功', '推荐医生成功', Ext.emptyFn);

                     }else{
                         Ext.Msg.alert('提示', res.message, Ext.emptyFn);
                     }
                    view.pop();

                };
                var failFunc=function(response, action){
                    Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
                    //Ext.Msg.alert('test', 'test', Ext.emptyFn);
                    view.pop();

                }
                var url="patient/sendmyDoctorToPatient";

                var params={
                    patientid:me.selectPatient.get('patientinfo')._id,
                    doctorid:record.get('_id'),
                    frompatientid:Globle_Variable.user._id

                };
                CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');
            }else{

                view.pop();
            }


        })

    },
    onPatientHold:function(list,index, target, record, e) {
        //long patient hold
        var me=this;
        list.lastTapHold = new Date();

        var actionSheet = Ext.create('Ext.ActionSheet', {
            items: [
                {
                    text: '推荐医生',
                    handler:function(){
                        me.showDoctorList(record);
                        actionSheet.hide();
                    }
                },
                /*{
                    text: '添加黑名单',
                    ui  : 'decline',
                    handler:function(){
                        me.addtoblacklist(record,actionSheet);
                    }
                },*/
                {
                    text: '取消',
                    handler : function() {
                        actionSheet.hide();
                    },
                    ui  : 'confirm'
                }
            ]
        });

        Ext.Viewport.add(actionSheet);
        actionSheet.show();

    },
    onMainPush: function (view, item) {
        this.getPatientssview().deselectAll();
    },
    listShow:function(){
        //this.initPatientList();
    },
    messageView:{},
    onPatientSelect: function (list, index, node, record) {
        if (!list.lastTapHold || ( new Date()-list.lastTapHold  > 1000)) {

            if (!this.messageView[record.get('patientinfo')._id]){
                this.messageView[record.get('patientinfo')._id] =Ext.create('PatientApp.view.patient.PatientsMessage');

            }
            var selectview=this.messageView[record.get('patientinfo')._id];
            //var messageView=Ext.create('DoctorApp.view.doctors.DoctorMessage');
            selectview.setTitle(record.get('patientinfo').realname);
            selectview.data=record;
            selectview.mydata=Globle_Variable.user;
            this.getPatientsnavview().push(selectview);

        }
        // Push the show contact view into the navigation view
    },



    initPatientList:function(){

        var store=Ext.getStore('Patients');
        store.load({
            //define the parameters of the store:
            params:{
                patientid : Globle_Variable.user._id
            },
            scope: this,
            callback : function(records, operation, success) {

            }});

    },
    receiveQuickAcceptProcess:function(recommend,e){

        var me=this;

        try {

            //Ext.Msg.alert('test', cordova.plugins.notification.local.schedule , Ext.emptyFn);
            cordova.plugins.notification.local.schedule({
                id: recommend._id ,
                title: "正在进行的问诊..",
                text: recommend.userinfo.sectionname+"医生:"+recommend.userinfo.realname,
                //firstAt: monday_9_am,
                //every: "week",
                //sound: "file://sounds/reminder.mp3",
                //icon: "http://icons.com/?cal_id=1",
                data: { data:recommend,type:'quickaccept'}
            });

            /*cordova.plugins.notification.local.on("click", function (notification) {

                me.receiveQuickAcceptShow(recommend,e);

            });*/

        }catch (err){

            me.receiveQuickAcceptShow(recommend,e);

        } finally{


        }



    },

    receiveQuickAcceptShow:function(recommend,e){
       //Ext.Msg.alert("sss","sss");
        var mainView=this.getMainview();
        mainView.setActiveItem(1);
        var list=this.getDoctorsview();
        var store=list.getStore();
        var flag=true;
        //console.log(store.data);
        for(var i=0;i<store.data.items.length;i++){

            if(recommend._id==store.data.items[i].get("_id")){
                flag=false;
                break;
            }
        }
        if(flag){
            recommend.userinfo.sectionname="临时急救---"+recommend.userinfo.sectionname;
            store.add(recommend);
        }
        var doctorController=this.getApplication().getController('Doctor');
        try{

            doctorController.showDoctosView({fromid:recommend._id});
        }catch (err){


        }finally{
            doctorController.sendMessageControler(doctorController.getSendmessagebtn());
        }

    }



});