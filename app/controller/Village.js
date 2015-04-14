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
            villageview: {
                itemtap: 'onVillageSelect',
                itemtaphold:'onVillageHold',
                viewshow:'listShow'
            },
            searchbtn:{
                tap:'searchDoctor'

            }


        },
        refs: {
            villageview: '#villagenavigationview #villagequickdoctors',
            searchbtn: '#villagenavigationview #seequick',
            villagenavview:'main #villagenavigationview'
        }
    },

    onVillageSelect: function(list){
         //

    },
    searchDoctor:function(btn){
        alert(1);
    },
    onVillageHold:function(){


    },
    onMainPush:function(view, item){


    }


});