/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('PatientApp.controller.Doctor', {
    extend: 'Ext.app.Controller',
    config: {
        views: [
            'village.Village'

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
            doctorssview: {
                itemtap: 'onDoctorSelect',
                itemtaphold:'onDoctorHold',
                viewshow:'listShow'
            }

        },
        refs: {
            doctorssview: '#doctorsnavigationview #doctorlist',
            doctorsnavview:'main #doctorsnavigationview'
        }
    }



});