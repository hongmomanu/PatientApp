Ext.define('PatientApp.view.patient.PatientsMessage', {
    extend: 'Ext.List',
    xtype: 'patientmessagelist',

    initialize : function() {
        var me = this;
        me.setStore(Ext.create('PatientApp.store.patient.PatientMessages'));
        me.callParent(arguments);
    },

    config: {
        disableSelection: true,
        title: 'Chat',
        variableHeights: true,
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :false,
        //store: Ext.create('PatientApp.store.patient.PatientMessages'),

        itemTpl : new Ext.XTemplate(
            '<tpl if="local">',
            '	<div class="nick local">{realname}</div>',
            '	<div class="x-button x-button-confirm local"">',
            //'		 <canvas class="" width="50" height="50"></canvas>',
                    '<img id={imgid} style="display: {issend}" src="resources/icons/loading.gif" width="30" height="30">',
            '       <p class="x-button-label message">{message}</p>',
            '	</div>',
            '<tpl else>',
            '	<div class="nick remote">{userinfo.realname}</div>',
            '	<div class="x-button remote"">',
            '		<p class="x-button-label message">{message}</p>',
            '	</div>',
            '</tpl>'
        ),

        items: [{
            xtype: 'toolbar',
            docked: 'bottom',
            items: [

                {
                    xtype:'button',
                    iconCls:'voice',
                    hidden:false,
                    listeners: {
                        element: 'element',
                        touchstart : function() {


                            var list=this.up('list');
                            list.fireEvent('touchstart', list);

                        },
                        touchend : function() {

                            var list=this.up('list');
                            list.fireEvent('touchend', list);

                        }

                    }
                },
                {
                    xtype:'button',
                    iconCls:'picture',
                    hidden:false,
                    itemId:'choosepic'
                },

                        {
                            xtype: 'textfield',
                            itemId:'messagecontent',
                            //maxRows: 2,
                            height: 60,
                            flex: 5,
                            name: 'message'
                        }, {
                            xtype: 'button',
                            itemId: 'sendmessage',
                            ui: 'action',
                            flex: 1,
                            text: '发送'
                        }


            ]
        }]
    }
});