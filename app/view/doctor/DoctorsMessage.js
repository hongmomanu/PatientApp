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
                            iconCls:'voice',
                            listeners: {
                                element: 'element',
                                touchstart : function() {


                                    var list=this.up('list');
                                    list.fireEvent('touchstart', list);


                                    /*window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,gotFS , function(){

                                    });
                                    function gotFS(fileSystem) {
                                        fileSystem.root.getFile("blank.wav", {create: true, exclusive: false}, gotFileEntry,  function(){

                                        });

                                        function gotFileEntry(fileEntry) {

                                            var src=fileEntry.toInternalURL();
                                            //Ext.Msg.alert("filepath",src);

                                            var mediaRec = new Media(src,
                                                // success callback
                                                function() {

                                                    //Ext.Msg.alert("success","recordAudio():Audio Success");





                                                },

                                                // error callback
                                                function(err) {
                                                    //console.log("recordAudio():Audio Error: "+ err.code);
                                                    Ext.Msg.alert("success","recordAudio():Audio Success"+ err.code);
                                                });

                                            // Record audio
                                            mediaRec.startRecord();

                                            setTimeout(function() {
                                                Ext.Msg.alert('end', src, Ext.emptyFn);
                                                mediaRec.stopRecord();


                                                var win = function (r) {
                                                    Ext.Msg.alert('seccess',r.response);
                                                }

                                                var fail = function (error) {
                                                    Ext.Msg.alert('error',"An error has occurred: Code = " + error.code);

                                                }

                                                var options = new FileUploadOptions();
                                                options.fileKey = "file";
                                                options.fileName = src.substr(src.lastIndexOf('/') + 1);
                                                options.mimeType = "audio/wav";


                                                var ft = new FileTransfer();
                                                //Ext.Msg.alert('seccess',Globle_Variable.serverurl+'common/uploadfile');
                                                ft.upload(src, encodeURI(Globle_Variable.serverurl+'common/uploadfile'), win, fail, options);




                                            }, 3000);



                                        }
                                    }*/

                                    /*window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {
                                        //Ext.Msg.alert("got the file", dir)
                                        dir.getFile("myrecording.wav", {create:true}, function(file) {

                                            var src=file.toInternalURL();
                                            //var src=file.toURL();
                                            me.mediaRec = new Media(src,
                                                // success callback
                                                function() {

                                                    //Ext.Msg.alert("success","recordAudio():Audio Success");





                                                },

                                                // error callback
                                                function(err) {
                                                    //console.log("recordAudio():Audio Error: "+ err.code);
                                                    Ext.Msg.alert("success","recordAudio():Audio Success"+ err.code);
                                                });

                                            // Record audio
                                            me.mediaRec.startRecord();

                                            setTimeout(function() {
                                                Ext.Msg.alert('end', src, Ext.emptyFn);
                                                me.mediaRec.stopRecord();


                                                var win = function (r) {
                                                    Ext.Msg.alert('seccess',r.response);
                                                }

                                                var fail = function (error) {
                                                    Ext.Msg.alert('error',"An error has occurred: Code = " + error.code);

                                                }

                                                var options = new FileUploadOptions();
                                                options.fileKey = "file";
                                                options.fileName = src.substr(src.lastIndexOf('/') + 1);
                                                options.mimeType = "audio/wav";


                                                var ft = new FileTransfer();
                                                //Ext.Msg.alert('seccess',Globle_Variable.serverurl+'common/uploadfile');
                                                ft.upload(src, encodeURI(Globle_Variable.serverurl+'common/uploadfile'), win, fail, options);




                                            }, 10000);



                                            //Ext.Msg.alert("got the file", file.toURL())
                                            //console.log("got the file", file);




                                        });
                                    });*/




                                },
                                touchend : function() {

                                    var list=this.up('list');
                                    list.fireEvent('touchend', list);
                                    //this.mediaRec.stopRecord();
                                    //Ext.Msg.alert('end', 'finished', Ext.emptyFn);
                                }

                            }
                        },
                        {
                            xtype:'button',
                            iconCls:'picture',
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