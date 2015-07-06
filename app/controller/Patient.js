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
                /*initialize: function (list) {
                    var me = this,
                        scroller = list.getScrollable().getScroller();

                    scroller.on('maxpositionchange', function (scroller, maxPos, opts) {
                        me.setMaxPosition(maxPos.y);
                    });
                    //console.log(scroller);
                    //testobj=list;
                    me.setScroller(scroller);

                    //me.getMessage().setValue(Ext.create('Chat.ux.LoremIpsum').getSentence());
                },*/

                touchend:'voicetouchend',
                touchstart:'voicetouchbegin'

            },
            patientssview: {
                itemtap: 'onPatientSelect',
                itemtaphold:'onPatientHold',
                viewshow:'listShow'
            },
            choosepicbtn:{
                tap:'doImgCLick'
            },
            makevideobtn:{
                tap:'makevideobtn'
            }

        },
        refs: {
            patientssview: '#patientsnavigationview #patientlist',
            patientmessagelistview:'patientmessagelist',
            doctorsview: '#doctorsnavigationview #doctorlist',

            choosepicbtn: '#patientsnavigationview #choosepic',
            makevideobtn: '#patientsnavigationview #makevideo',

            mainview:'main',
            sendmessagebtn: '#patientsnavigationview #sendmessage',
            messagecontent: '#patientsnavigationview #messagecontent',
            patientsnavview:'main #patientsnavigationview'
        }
    },
    makevideobtn:function(item){

        var listview=item.up('list');
        var myinfo= listview.mydata;

        var toinfo=listview.data;

        //console.log(myinfo);

        var videorurl=Globle_Variable.serverurl.replace(/(:\d+)/g,":4450");

        var mainController=this.getApplication().getController('Main');

        var socket=mainController.socket;


        var me=this;
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
                    html:'<iframe name="chatframe" id="chatframe" style="height: '
                    +(Ext.getBody().getHeight()-15)+'px;width: 100%;"  width="100%" height="100%"  src="'
                    +videorurl+'?handle='+myinfo._id+'&touser='+toinfo.get("patientinfo")._id+'">Your device does not support iframes.</iframe>',
                    title: '聊天'
                },
                {
                    docked: 'bottom',
                    itemId:'closechatwin',
                    xtype: 'button',
                    handler:function(){
                        //me.overlay.hide();

                        Ext.Viewport.remove(me.overlay);
                        Ext.Viewport.remove(mainController.overlay);

                        socket.send(JSON.stringify({
                            type:"videochatend",
                            /*from:from,
                             fromuser:fromuser,
                             touser:touser,*/
                            userid :toinfo.get("patientinfo")._id
                        }));


                    },
                    text:'关闭'
                }
            ]
        });
        this.overlay.showBy(item);




        socket.send(JSON.stringify({
            type:"videochat",
            from:myinfo._id,
            fromuser:myinfo._id,
            touser:toinfo.get("patientinfo")._id,
            to :toinfo.get("patientinfo")._id
        }));

        //alert(1);

    },
    doImgCLick:function(item){

        var list=item.up('list');
        var btn=list.down('#sendmessage');
        //testobj=btn;
        var me = this;
        var actionSheet = Ext.create('Ext.ActionSheet', {
            items: [
                {
                    text: '相机拍照',
                    handler: function () {
                        //alert(1);

                        imagfunc('camera');
                    }
                    //ui  : 'decline'
                },
                {
                    text: '图片库',
                    handler: function () {
                        //alert(2);
                        imagfunc('library');
                    }
                },
                {
                    text: '取消',
                    handler: function () {

                        actionSheet.hide();
                    },
                    ui: 'decline'
                }
            ]
        });

        Ext.Viewport.add(actionSheet);
        actionSheet.show();

        var imagfunc = function (type) {
            actionSheet.hide();
            //var imgpanel = me.getImgpanel();
            //alert(1);
            Ext.device.Camera.capture({
                source: type,
                destination: 'file',
                success: function (imgdata) {

                    //var srcdata="data:image/png;base64,"+imgdata;
                    //me.getMessagecontent().setValue('<img height="200" width="200" src="'+imgdata+'">')  ;
                    btn.isfile=true;
                    btn.filetype='image';
                    btn.fileurl=imgdata;

                    me.sendMessage(btn);

                }
            });
        };
    },
    voicetouchbegin:function(item){
        if(!this.voiceoverlay){
            this.voiceoverlay = Ext.Viewport.add({
                xtype: 'panel',

                // We give it a left and top property to make it floating by default
                /*left: 0,
                 top: 0,*/
                centered:true,

                // Make it modal so you can click the mask to hide the overlay
                modal: true,
                hideOnMaskTap: true,

                // Make it hidden by default
                hidden: true,

                // Set the width and height of the panel
                width: 200,
                height: 140,

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
                        html:'<div id="voicerecordtopatient">正在录音,松开发送...</div>',
                        title: 'Overlay Title'
                    }
                ]
            });

        }

        this.voiceoverlay.show();
        this.makerecording();



    },
    voicetouchend:function(item){
        var me=this;
        this.voiceoverlay.hide();

        //Ext.Msg.alert('end', me.voicerecordsrc, Ext.emptyFn);
        this.mediaRec.stopRecord();
        me.mediaRec.release();

        //me.getMessagecontent().setValue('<audio  src="'+me.voicerecordsrc+'" controls>')  ;

        var btn=item.down('#sendmessage');

        btn.isfile=true;
        btn.filetype='voice';
        btn.fileurl=me.voicerecordsrc;

        me.sendMessage(btn);





    },



    makerecording:function(){
        var me=this;
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,gotFS , function(){});
        function gotFS(fileSystem) {

            fileSystem.root.getFile("blank.mp3", {create: true, exclusive: false}, gotFileEntry,  function(){

            });

            function gotFileEntry(fileEntry) {

                me.voicefileentry=fileEntry;
                me.voicerecordsrc=fileEntry.toInternalURL();
                //Ext.Msg.alert("filepath",src);

                me.mediaRec = new Media(me.voicerecordsrc,
                    // success callback
                    function() {
                        //Ext.Msg.alert("success","recordAudio():Audio Success");
                    },

                    // error callback
                    function(err) {
                        //console.log("recordAudio():Audio Error: "+ err.code);
                        Ext.Msg.alert("success","recordAudio():Audio Success"+ err.code);
                    });

                // Record audio
                me.mediaRec.startRecord();

                setTimeout(function() {


                }, 3000);



            }
        }



    },



    sendMessage:function(btn){


        var me=this;
        var message=btn.up('list').down('#messagecontent');
        var content = Ext.String.trim(message.getValue());
        //var content=Ext.String.trim(this.getMessagecontent().getValue());

        if((content&&content!='')||btn.isfile){
            var listview=btn.up('list');
            var myinfo= listview.mydata;

            var toinfo=listview.data;
            var imgid='chatstatusimg'+(new Date()).getTime();
            var message=Ext.apply({message:content}, myinfo);
            //console.log(imgid);
            if(!btn.isfile)listview.getStore().add(Ext.apply({local: true,imgid:imgid}, message));
            //listview.getStore().add(Ext.apply({local: true,imgid:imgid}, message));

            var doctorController=this.getApplication().getController('Doctor');
            //(Ext.bind(doctorController.scrollMsgList, this) ());


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

            if(btn.isfile){

                var win = function (r) {
                    //Ext.Msg.alert('seccess',r.response);
                    var res=JSON.parse(r.response);
                    var messagestr="";
                    if(btn.filetype=='image'){
                        messagestr='<img height="200" width="200" src="'+Globle_Variable.serverurl+'files/'+res.filename+'">';
                    }else if(btn.filetype=='voice'){
                        messagestr='<audio  src="'+Globle_Variable.serverurl+'files/'+res.filename+'" controls>';
                    }
                    message.message=messagestr;
                    listview.getStore().add(Ext.apply({local: true,imgid:imgid}, message));

                    //(Ext.bind(doctorController.scrollMsgList, me) ());

                    socket.send(JSON.stringify({
                        type:"doctorchat",
                        from:myinfo._id,
                        fromtype:0,
                        imgid:imgid,
                        ctype:btn.filetype,
                        to :toinfo.get("patientinfo")._id,
                        content: res.filename
                    }));

                    me.voicefileentry.remove(function(){},function(){});

                }

                var fail = function (error) {
                    me.voicefileentry.remove(function(){},function(){});
                    //Ext.Msg.alert('error',"An error has occurred: Code = " + error.code);

                }

                var options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = btn.fileurl.substr(btn.fileurl.lastIndexOf('/') + 1);

                var ft = new FileTransfer();
                //Ext.Msg.alert('seccess',Globle_Variable.serverurl+'common/uploadfile');
                ft.upload(btn.fileurl, encodeURI(Globle_Variable.serverurl+'common/uploadfile'), win, fail, options);

                btn.isfile=false;


            }else{
                socket.send(JSON.stringify({
                    type:"doctorchat",
                    from:myinfo._id,
                    fromtype:0,
                    imgid:imgid,
                    to :toinfo.get("patientinfo")._id,
                    content: content
                }));

            }



            /*socket.send(JSON.stringify({
                type:"doctorchat",
                from:myinfo._id,
                fromtype:0,
                imgid:imgid,
                to :toinfo.get("patientinfo")._id,
                content: content
            }));*/



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
            var view=doctorController.messageView[recommend._id];
            var btn=view.down('#sendmessage');

            //doctorController.sendMessageControler(doctorController.getSendmessagebtn());
            doctorController.sendMessageControler(btn);
        }

    }



});