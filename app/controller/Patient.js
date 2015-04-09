/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('PatientApp.controller.Patient', {
    extend: 'Ext.app.Controller',
    config: {
        views: [
            'patient.Patients'

        ],
        models: [
            'patient.Patient'

        ],
        stores: [

            'patient.Patients'

        ],
        control: {
            patientsnavview: {
                push: 'onMainPush'

            },
            patientssview: {
                itemtap: 'onPatientSelect',
                itemtaphold:'onPatientHold',
                viewshow:'listShow'
            }

        },
        refs: {
            patientssview: '#patientsnavigationview #patientlist',
            patientsnavview:'main #patientsnavigationview'
        }
    },
    addtoblacklist:function(record,actionSheet){
        var successFunc = function (response, action) {
            var res=JSON.parse(response.responseText);
            if(res.success){
                Ext.Msg.alert('成功', '添加黑名单成功', Ext.emptyFn);

            }else{
                Ext.Msg.alert('失败', '添加黑名单失败', Ext.emptyFn);
            }
            actionSheet.hide();

        };
        var failFunc=function(response, action){
            Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
            actionSheet.hide();
        }
        var url="doctor/addblacklist";
        var params={doctorid: Globle_Variable.user._id,patientid:record.get("_id")};
        CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

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
                var url="doctor/sendmyDoctorToPatient";
                var params={
                    patientid:me.selectPatient.get('_id'),
                    doctorid:record.get('_id'),
                    fromdoctorid:Globle_Variable.user._id

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
                {
                    text: '添加黑名单',
                    ui  : 'decline',
                    handler:function(){
                        me.addtoblacklist(record,actionSheet);
                    }
                },
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
    onPatientSelect: function (list, index, node, record) {
        if (!list.lastTapHold || ( new Date()-list.lastTapHold  > 1000)) {

            if (!this.messageView)this.messageView = Ext.create('DoctorApp.view.patients.PatientsMessage');
            //var messageView=Ext.create('DoctorApp.view.doctors.DoctorMessage');

            this.messageView.setTitle(record.get('realname'));
            this.messageView.data=record;
            this.messageView.mydata=Globle_Variable.user;
            this.getPatientsnavview().push(this.messageView);

        }



        // Push the show contact view into the navigation view

    },
    initPatientList:function(){

        var store=Ext.getStore('Patients');
        store.load({
            //define the parameters of the store:
            params:{
                id : Globle_Variable.user._id
            },
            scope: this,
            callback : function(records, operation, success) {

            }});

    }


});