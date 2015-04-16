/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('PatientApp.controller.Register', {
    extend: 'Ext.app.Controller',
    config: {
        views: [


            'register.Register'


        ],
        models: [
            'register.Register'

        ],
        stores: [

            //'patients.Patients',

            //'Contacts'
        ],
        control: {

            patientregisterbtn:{

                tap:'doPatientRegister'
            }

        },
        refs: {

            patientregisterbtn: 'registerform #patientregister'
        }
    },

    doPatientRegister:function(btn){
        /*testobj=btn;
        var me = btn.up('panel');
        var formObj = me;
        var formData = formObj.getValues();
        console.log(formData);*/
        //alert(111);
        formpanel=btn.up('panel');
        CommonUtil.addMessage();
        var valid = CommonUtil.valid('PatientApp.model.register.Register', formpanel);

        if(valid){
            Ext.Viewport.removeAt(0);
            Ext.Viewport.add(Ext.create('PatientApp.view.Main'));
        }

    }
});