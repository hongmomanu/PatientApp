Ext.define('PatientApp.view.doctor.DoctorsMessage', {
    extend: 'Ext.List',
    xtype: 'patientmessagelist',

    config: {
        disableSelection: true,
        title: 'Chat',
        store: Ext.create('PatientApp.store.doctor.DoctorMessages'),

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
                            iconCls:'action',
                            listeners: {
                                element: 'element',
                                taphold : function() {
                                    Ext.Msg.alert('test', '', Ext.emptyFn);
                                }
                            }
                        },
                        {
                            xtype:'button',
                            iconCls:'time',
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