sap.ui.define(["./BaseController","sap/m/MessageBox","sap/ui/model/json/JSONModel","de/fernunihagen/smartgrids/socopt/lib/Service"],function(e,t,n,o){"use strict";return e.extend("de.fernunihagen.smartgrids.socopt.controller.Main",{onInit:function(){const e=new n({entities:[],solarInfo:undefined,recordings:[],newRecording:{entityId:undefined,name:undefined,begin:undefined,end:undefined,intervalLength:5},recListMode:"None"});const t=this.getView();t.setModel(e,"viewData");this.loadSolarInfo();this.loadEntities();this.loadRecordings();this.getRouter().attachRoutePatternMatched(this.navRouteMatched,this)},navRouteMatched:function(e){const t=this.getView();const n=t.byId("icontabbar");const o=e.getParameters().name;switch(o){case"default":case"recordings":n.setSelectedKey("recordings");console.log(`showing recordings`);break;case"solarInfo":n.setSelectedKey("solarInfo");console.log(`showing solar information`);break}},loadEntities:async function(){const e=await o.getEntities();const t=this.getModel("viewData");t.setProperty("/entities",e)},loadRecordings:async function(){const e=await o.getRecordings();const t=this.getModel("viewData");t.setProperty("/recordings",e)},deleteRecording:async function(e){try{await o.deleteRecording(e);this.loadRecordings()}catch(e){t.error(e.message)}},loadSolarInfo:async function(){const e=await o.getSolarInfo();const t=this.getModel("viewData");t.setProperty("/solarInfo",e)},recordingPress:function(e){this.navTo("recording",{id:e})},addRecordingPress:async function(){if(!this.dialog){const e=this.getView();const t=await this.loadFragment({name:"de.fernunihagen.smartgrids.socopt.fragments.RecordingDialog"});e.addDependent(t);this.dialog=t}this.dialog.open()},saveRecordingPress:async function(){const e=this.getModel("viewData");const n=e.getProperty("/newRecording");console.log(n);try{await o.postRecording(n);this.loadRecordings();this.dialog.close()}catch(e){t.error(e.message)}},cancelRecordingPress:function(){this.dialog.close()},toggleRecordingDelete:function(){const e=this.getModel("viewData");let t=e.getProperty("/recListMode");if(t==="None")t="Delete";else t="None";e.setProperty("/recListMode",t)},recDeletePress:function(e){const t=e.getParameter("listItem");const n=t.getBindingContext("viewData");const o=n.getModel().getProperty(n.getPath());this.deleteRecording(o.id)}})});
//# sourceMappingURL=Main.controller.js.map