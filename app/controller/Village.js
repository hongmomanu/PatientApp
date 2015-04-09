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
            }

        },
        refs: {
            villageview: '#villagenavigationview #villagelist',
            villagenavview:'main #villagenavigationview'
        }
    },

    onVillageSelect: function(list){
         //

    },
    onVillageHold:function(){


    },
    onMainPush:function(view, item){


    }


});