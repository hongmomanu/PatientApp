/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('PatientApp.controller.Village', {
    extend: 'Ext.app.Controller',
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
            sendbtn: '#villagenavigationview #sendquick',
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
    askforDoctor:function(btn){
        var list=btn.up('list');
        var store=list.getStore();
        if(store.getCount()>0){
            var doctorids=[];
            store.data.each(function(item){
               doctorids.push(item.get('_id'));
            });
            var successFunc = function (response, action) {
                var res=JSON.parse(response.responseText);
                if(res.success){
                    Ext.Msg.alert('成功', '等待医生应答', Ext.emptyFn);

                }else{
                    Ext.Msg.alert('警告', '呼叫急救医生失败', Ext.emptyFn);
                }

            };
            var failFunc=function(response, action){
                Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
            }
            var url="patient/applyforquickdoctorswhocanhelp";
            var params={doctorid: Globle_Variable.user._id};
            CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

        }else{
            Ext.Msg.alert('警告', '范围内无医生可急救', Ext.emptyFn);
        }

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