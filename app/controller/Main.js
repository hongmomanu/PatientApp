/**
 * Created by jack on 14-11-18.
 * main Controller used by Terminal app
 */
Ext.define('PatientApp.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        views: [
            'Main'




        ],
        models: [
        ],
        stores: [

        ],
        control: {
            nav: {
                initialize: 'initRender',
                mapinit: 'initMap'
            },
            navigationview: {
                push: 'onMainPush'
            }

        },
        refs: {
            nav: 'main',
            navigationview: 'main #navigationview'
        }
    },

    onMainPush: function (view, item) {
        //this.getContacts().deselectAll();
        /*var editButton = this.getEditButton();

         if (item.xtype == "contact-show") {
         this.getContacts().deselectAll();

         this.showEditButton();
         } else {
         this.hideEditButton();
         }*/
    },

    initRender: function () {

        //this.initLocation();
        // console.log(document.getElementById('map'));
        //alert(1);
        //this.makeLonlat();
        this.websocketInit();
        //testobj = this;
    },

    initLocation:function(){



    },
    showvideosuc:function(data){

        var fromuser=data.fromuser;
        var touser=data.touser;

        var videourl=Globle_Variable.serverurl.replace(/(:\d+)/g,":4450");


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
                    +videourl+'?handle='+touser+'&from='+fromuser+'">Your device does not support iframes.</iframe>',
                    title: '聊天'
                },
                {
                    docked: 'bottom',
                    xtype: 'button',
                    handler:function(){
                        Ext.Viewport.remove(me.overlay);
                        //me.overlay.hide();
                    },
                    text:'关闭'
                }
            ]
        });
        this.overlay.show();





    },
    hideloadingimg:function(data){
        //console.log(imgid);
        var doctorController=this.getApplication().getController('Doctor');
        var patientController=this.getApplication().getController('Patient');
        var store=doctorController.messageView[data["toid"]]?doctorController.messageView[data["toid"]].getStore():
            patientController.messageView[data["toid"]].getStore();
        //var store=Ext.getStore('PatientMessages');
        store.data.each(function(a){
            if(a.get('imgid')==data["imgid"]){
                a.set('issend','none');
            }
        });
        doctorController.getMessagecontent().setValue('');
    },
    websocketInit:function(){
        var url=Globle_Variable.serverurl;
        url=url.replace(/(:\d+)/g,":3001");
        url=url.replace("http","ws");
        this.socket = new WebSocket(url);
        var me=this;

        this.socket.onmessage = function(event) {
            var data=JSON.parse(event.data);
            var doctorController=me.getApplication().getController('Doctor');
            var villageController=me.getApplication().getController('Village');
            var patientController=me.getApplication().getController('Patient');
            var settingsController=me.getApplication().getController('Settings');
            if(data.type=='doctorchat'){
                //聊天咨询
                console.log("doctorchat");
                console.log(data.data);
                doctorController.receiveMessageProcess(data.data,event);
            }
            else if(data.type=='recommend'){
                //推荐
                console.log('recommend');
                console.log(data.data);
                doctorController.receiveRecommendProcess(data.data,event);

            }else if(data.type=='recommendconfirm'){

                console.log('recommendconfirm')
                doctorController.recommendConfirmProcess(data.data,event);
            }
            else if(data.type=='quickapplying'){
                //医生问诊急救开始应答
                console.log('quickapplying');
                console.log(data.data);
                villageController.receiveQuickApplyingProcess(data.data,event)


            }else if(data.type=='quickaccept'){
                //门诊应答
                console.log('quickaccept');

                console.log(data.data);

                patientController.receiveQuickAcceptProcess(data.data,event);


            }
            else if(data.type=='videosuc'){
                console.log('videosuc');
                me.showvideosuc(data.data)

            }else if(data.type=='chatsuc'){
                console.log('recommendconfirm');
                me.hideloadingimg(data.data)

            }else if(data.type=='payfinish'){
                console.log('payfinish');
                settingsController.payfinish(data.data);
            }


        };

        this.socket.onclose = function(event) {

            var d = new Ext.util.DelayedTask(function(){
                me.websocketInit();
            });
            d.delay(5000);
        };
        this.socket.onopen = function() {
            me.socket.send(JSON.stringify({
                type:"patientconnect",
                content: Globle_Variable.user._id
            }));
        };

    }
});