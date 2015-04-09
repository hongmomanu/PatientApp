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
        // console.log(document.getElementById('map'));
        //alert(1);
        //this.makeLonlat();
        //this.websocketInit();
        //testobj = this;
    },

    websocketInit:function(){
        var url=Globle_Variable.serverurl;
        //url=url?"ws://"+url.split("://")[1].split(":")[0]+":3001/":"ws://localhost:3001/";
        url=url.replace(/(:\d+)/g,":3001");
        url=url.replace("http","ws");
        this.socket = new WebSocket(url);
        var me=this;

        this.socket.onmessage = function(event) {
            //alert(1111);
            var data=JSON.parse(event.data);
            var doctorController=me.getApplication().getController('Doctors');
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
                type:"doctorconnect",
                content: Globle_Variable.user._id
            }));
        };

    }
});