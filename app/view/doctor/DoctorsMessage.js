Ext.define('PatientApp.view.doctor.DoctorsMessage', {
    extend: 'Ext.List',
    xtype: 'doctormessagelist',
    initialize : function() {
        var me = this;
        me.setStore(Ext.create('PatientApp.store.doctor.DoctorMessages'));
        me.callParent(arguments);
    },

    config: {
        disableSelection: true,
        title: 'Chat',
        variableHeights: true,
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :false,
        //store: Ext.create('PatientApp.store.doctor.DoctorMessages',{}),

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

        items: [
            {
                xtype: 'label',
                itemId:'applytime',
                //scrollDock: 'bottom',
                docked: 'bottom',
                hidden:true,
                right:'10%',
                style: {
                    'border-left': '1px solid red'
                },
                html: ''
            },
            {
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