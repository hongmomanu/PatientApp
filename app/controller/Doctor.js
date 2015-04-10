/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('PatientApp.controller.Doctor', {
    extend: 'Ext.app.Controller',
    config: {
        views: [
            'doctor.Doctors'

        ],
        models: [
            'doctor.Doctor'

        ],
        stores: [

            'doctor.Doctors'

        ],
        control: {
            doctorsnavview: {
                push: 'onMainPush'

            },
            doctorsview: {
                itemtap: 'onDoctorSelect',
                itemtaphold:'onDoctorHold',
                viewshow:'listShow'
            }

        },
        refs: {
            doctorsview: '#doctorsnavigationview #doctorlist',
            mainview: 'main',
            patientsview: '#patientsnavigationview #patientlist',
            doctorsnavview:'main #doctorsnavigationview'
        }
    },

    receiveRecommendProcess:function(data,e){
        //console.log(data);
        //alert("1");
        for(var i=0;i<data.length;i++){
            //alert(i);
            var recommend=data[i];
            //message.message=message.content;
            this.receiveRecommendNotification(recommend,e);
        }
        //listView.select(1);
    },

    receiveRecommendNotification:function(recommend,e){
        var me=this;
        try {

            //Ext.Msg.alert('test', cordova.plugins.notification.local.schedule , Ext.emptyFn);
            cordova.plugins.notification.local.schedule({
                id: recommend._id ,
                title: recommend.rectype==1?"医生:"+recommend.frominfo.userinfo.realname+"推荐的":
                "患者:"+recommend.frominfo.realname+"推荐的",
                text: "新医生:"+recommend.doctorinfo.userinfo.realname,
                //firstAt: monday_9_am,
                //every: "week",
                //sound: "file://sounds/reminder.mp3",
                //icon: "http://icons.com/?cal_id=1",
                data: { meetingId:recommend._id }
            });

            cordova.plugins.notification.local.on("click", function (notification) {

                me.receiveRecommendShow(recommend,e);

            });

        }catch (err){

            me.receiveRecommendShow(recommend,e);

        } finally{


        }


    },
    receiveRecommendShow:function(recommend,e){
        //alert(1);
        //console.log(recommend);
        Ext.Msg.confirm('消息','是否添加'+ (recommend.rectype==1?"医生:"+recommend.frominfo.userinfo.realname+"推荐":
        "患者:"+recommend.frominfo.realname+"推荐")+"的医生:"+recommend.doctorinfo.userinfo.realname,function(buttonId){

            if(buttonId=='yes'){

                var successFunc = function (response, action) {

                    var res=JSON.parse(response.responseText);

                    if(res.success){

                        Ext.Msg.show({
                            title:'成功',
                            message: (recommend.isdoctoraccepted||recommend.ispatientaccepted)?'已成功添加医生':
                                '已接受推荐，等待对方同意',
                            buttons: Ext.MessageBox.OK,
                            fn:Ext.emptyFn
                        });
                        //Ext.Msg.alert('成功', '已接受推荐，等待对方同意', Ext.emptyFn);

                    }else{
                        Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
                    }

                };
                var failFunc=function(response, action){
                    Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
                    //Ext.Msg.alert('test', 'test', Ext.emptyFn);
                }
                var url="patient/acceptrecommend";
                var params={
                    rid:recommend._id
                };
                CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');
            }else{
                var view=me.getDoctorsnavview();
                view.pop();
            }


        });



    },
    addtoblacklist:function(record,actionSheet){
        var successFunc = function (response, action) {
            var res=JSON.parse(response.responseText);
            if(res.success){
                Ext.Msg.alert('成功', '添加黑名单成功', Ext.emptyFn);

            }else{
                Ext.Msg.alert('失败', '添加黑名单失败', Ext.emptyFn);
            }
            actionSheet.hide();

        };
        var failFunc=function(response, action){
            Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
            actionSheet.hide();
        }
        var url="doctor/addblacklist";
        var params={doctorid: Globle_Variable.user._id,patientid:record.get("_id")};
        CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

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
                var url="doctor/sendmyDoctorToPatient";
                var params={
                    patientid:me.selectPatient.get('_id'),
                    doctorid:record.get('_id'),
                    fromdoctorid:Globle_Variable.user._id

                };
                CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');
            }else{

                view.pop();
            }


        })

    },
    onDoctorHold:function(list,index, target, record, e) {
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
                {
                    text: '添加黑名单',
                    ui  : 'decline',
                    handler:function(){
                        me.addtoblacklist(record,actionSheet);
                    }
                },
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
    onDoctorSelect: function (list, index, node, record) {
        if (!list.lastTapHold || ( new Date()-list.lastTapHold  > 1000)) {

            if (!this.messageView)this.messageView = Ext.create('DoctorApp.view.patients.PatientsMessage');
            //var messageView=Ext.create('DoctorApp.view.doctors.DoctorMessage');

            this.messageView.setTitle(record.get('realname'));
            this.messageView.data=record;
            this.messageView.mydata=Globle_Variable.user;
            this.getPatientsnavview().push(this.messageView);

        }



        // Push the show contact view into the navigation view

    },
    receiveMessageProcess:function(data,e){
        for(var i=0;i<data.length;i++){
            var message=data[i];
            message.message=message.content;
            this.receiveMessageNotification(message,e);
        }
        //listView.select(1);
    },
    receiveMessageNotification:function(message,e){

        var me=this;
        try {

            cordova.plugins.notification.local.schedule({
                id: message._id,
                title: (message.fromtype==0?'病友 ':'医生 ')+
                message.userinfo.realname+' 来消息啦!' ,
                text: message.message,
                //firstAt: monday_9_am,
                //every: "week",
                //sound: "file://sounds/reminder.mp3",
                //icon: "http://icons.com/?cal_id=1",
                data: message
            });

            cordova.plugins.notification.local.on("click", function (notification) {
                //joinMeeting(notification.data.meetingId);
                //Ext.Msg.alert('Title', notification.data.meetingId, Ext.emptyFn);
                me.receiveMessageShow(notification.data.message,e);

            });

        }catch (err){
            console.log(message) ;
           me.receiveMessageShow(message,e);

        } finally{


        }


    },
    receiveMessageShow:function(message,e){
        try{
            var mainView=this.getMainview();
            var listView=null;
            var messagestore=null;
            console.log("message heheehe");
            console.log(message)

            if(message.fromtype==0){

                mainView.setActiveItem(0);
                listView=this.getPatientsview();


            }else{
                var doctorController=this.getApplication().getController('Doctor');
                mainView.setActiveItem(1);
                listView=this.getDoctorsview();
            }
            var store=listView.getStore();
            var index =this.filterReceiveIndex(message,store);
            listView.select(index);
            listView.fireEvent('itemtap',listView,index,listView.getActiveItem(),store.getAt(index),e);



        }catch(err) {

        }finally{
            var doctorController=this.getApplication().getController('Doctor');
            var patientController=this.getApplication().getController('Patient');
            if(message.fromtype==0){
                messagestore=patientController.messageView[message.fromid].getStore()
            }else{
                messagestore=doctorController.messageView[message.fromid].getStore();
            }

            console.log(messagestore);
            messagestore.add(Ext.apply({local: false}, message));
        }
    },
    filterReceiveIndex:function(data,store){
        var listdata=store.data.items;
        var index=0;
        for(var i=0;i<listdata.length;i++){
            if(listdata[i].get("_id")==data.fromid){
                index=i;
                break;
            }
        }
        return index;
    },
    initDoctorList:function(){

        var store=Ext.getStore('Doctors');
        store.load({
            //define the parameters of the store:
            params:{
                patientid : Globle_Variable.user._id
            },
            scope: this,
            callback : function(records, operation, success) {

            }});

    }


});