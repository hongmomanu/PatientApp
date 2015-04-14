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
    },
    websocketInit:function(){
        var url=Globle_Variable.serverurl;
        url=url.replace(/(:\d+)/g,":3001");
        url=url.replace("http","ws");
        this.socket = new WebSocket(url);
        var me=this;

        this.socket.onmessage = function(event) {
            console.log("websocket message");
            var data=JSON.parse(event.data);
            var doctorController=me.getApplication().getController('Doctor');
            if(data.type=='doctorchat'){

                doctorController.receiveMessageProcess(data.data,event);
            }
            else if(data.type=='recommend'){
                console.log('recommend');
                console.log(data.data);
                doctorController.receiveRecommendProcess(data.data,event);

            }else if(data.type=='recommendconfirm'){

                console.log('recommendconfirm');
                console.log(data.data);
            }else if(data.type=='chatsuc'){
                console.log('recommendconfirm');

                me.hideloadingimg(data.data)

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