/*公共类*/

Ext.define('CommonUtil', {
    statics: {
        /*为Ext.Viewport添加一个消息提示组件*/
        loadmask:null,
        addMessage: function () {
            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                cls: 'message',
                transparent: true,
                indicator: false
            });
            this.hideMessage();
        },
        /*显示一个消息提示*/
        showMessage: function (mes, autoHide) {
            var me = this, message = this.getMessage();
            message.setMessage(mes);
            message.show();
            //是否自动关闭提示
            if (autoHide) {
                setTimeout(function () {
                    message.hide();
                },
                500);
            }
        },

        /*隐藏消息提示*/
        hideMessage: function () {
            this.getMessage().hide();
        },
        //消息组件
        getMessage: function () {
            return Ext.Viewport.getMasked();
        },
        //验证模型
        valid: function (model, from) {
            var tmpModel = Ext.create(model),
            me = this,
            errors, valid;
            from.updateRecord(tmpModel);
            errors = tmpModel.validate();
            valid = errors.isValid();
            if (!valid) {
                errors.each(function (err) {
                    me.showMessage(err.getMessage(), true);
                    return;
                });
            }
            return valid;
        },
        ajaxSend: function (params, url, sucFun, failFunc, method) {
            var me = this;
            Ext.Ajax.request({
                url: Globle_Variable.serverurl + url,
                method: method,
                timeout: 5000,//default 5000 milliseconds
                params: params,
                success: sucFun,
                failure: failFunc/*,
                callback:function(){
                    //Ext.Msg.alert('1');
                    //me.loadmask.hide();
                    //Ext.Msg.alert('hide');
                }*/
            });

        },
        getovertime:function(begintime){
            var EndTime= Ext.Date.add(new Date(begintime),Ext.Date.MINUTE,Globle_Variable.askmin);
            var NowTime = new Date();
            var t =EndTime.getTime() - NowTime.getTime();
            return t;
        },
        intervalids:{},
        lefttime:function (timecallback,begintime,intervalid){
            var me =this;
            var askbegintime=begintime;
            var asktimeinterval=null;
            if(me.intervalids[intervalid]){
                clearInterval(me.intervalids[intervalid]);
                me.intervalids[intervalid]=null;
            }
            (function(asktimeinterval,askbegintime,intervalid){
                asktimeinterval = setInterval(function(){

                    var t=me.getovertime(askbegintime);
                    timecallback(t,asktimeinterval);
                    /*if(t<=0){
                        clearInterval(asktimeinterval);
                        timecallback(t,true);

                    }else{

                        timecallback(t,false);


                    }*/


                }, 1000);
                me.intervalids[intervalid]=asktimeinterval;

            })(asktimeinterval,askbegintime,intervalid);


        }

    }
});