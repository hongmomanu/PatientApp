Ext.define('PatientApp.view.patient.Patients', {
    extend: 'Ext.List',
    xtype: 'patients',
    alias: 'widget.patients',
    config: {

        variableHeights: true,
        itemId:'patientlist',
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :true,
        grouped:true,
        //indexBar:true,
        store: 'Patients',

        listeners: {
            painted: function(){

                this.fireEvent('viewshow', this);
            }
        },

        items: [],
        itemTpl: new Ext.XTemplate(
            [
                '<div class="headshot">',
                '{[this.shortername(values)]}',
                '</div>'
            ].join('')

            ,
            {
                shortername: function(values) {
                    var relations=values.relations;
                    for(var i=0;i<relations.length;i++){
                        if(relations[i].frompatientid==Globle_Variable.user._id||relations[i].topatientid==Globle_Variable.user._id){
                            return values.patientinfo.realname;
                            break;
                        }
                    }

                    return values.patientinfo.realname.slice(0,1)+"**";
                }
            }
        )

    }
});