Ext.define('PatientApp.view.MainList', {
    extend: 'Ext.List',
    xtype: 'mainlist',
    alias: 'widget.doctors',
    config: {
        //title: '医生圈',
        //cls: 'x-contacts',
        cls: 'mainlist',
        variableHeights: true,

        itemId:'mainlist',
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :true,

        //indexBar:true,
        data: [
            { title: '患友圈' ,cls:"fa fa-user fa-2x fa-color-blue"},
            { title: '我的医生' ,cls:"fa fa-stethoscope fa-2x fa-color-blue"},
            { title: '社区急救' ,cls:"fa fa-ambulance fa-2x fa-color-blue"},
            { title: '关于我' ,cls:"fa fa-info-circle fa-2x fa-color-blue"}
        ],

        onItemDisclosure : {//若配置该项，list每一项的右侧都会出现一个小图标。其他功能请查看api
            handler : function(record, btn, index) {
                //alert('点击小按钮触发的事件');
                //console.log(record)
                this.select(index);
            }
        },

        /*listeners: {
            painted: function(){

                this.fireEvent('viewshow', this);
            }
        },*/

        items: [],
        itemTpl: [
            '<div class="headshot">',
            '<div></div><i class="{cls}"></i>{title}',
            '</div>'
        ].join('')
    }
});