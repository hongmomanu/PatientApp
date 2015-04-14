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
            searchbtn:{
                tap:'searchDoctor'

            }


        },
        refs: {
            villageview: '#villagenavigationview #villagequickdoctors',
            searchbtn: '#villagenavigationview #seequick',
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
        })
        //alert(1);
    },
    onVillageHold:function(){


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