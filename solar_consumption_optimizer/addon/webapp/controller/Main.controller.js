sap.ui.define([
	"./BaseController",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel",
	"de/fernunihagen/smartgrids/socopt/lib/Service"
], function (BaseController, MessageBox, JSONModel, Service) {
	"use strict";

	return BaseController.extend("de.fernunihagen.smartgrids.socopt.controller.Main", {

		onInit: function () {
			// setup local model and initiate data load
			const model = new JSONModel({
				recordings: []
			});
			const view = this.getView();
			view.setModel(model, "viewData");
			this.loadRecordings();
			// handle routing
			this.getRouter().attachRoutePatternMatched(this.navRouteMatched, this);
		},

		navRouteMatched: function (event) {
			const view = this.getView();
			const tabBar = view.byId("icontabbar");
			const routeName = event.getParameters().name;
			switch (routeName) {
				case 'default':
				case 'recordings':
					tabBar.setSelectedKey("recordings");
					console.log(`showing recordings`);
					break;
				case 'solarInfo':
					tabBar.setSelectedKey("solarInfo");
					console.log(`showing solar information`);
					break;
			}
		},

		loadRecordings: async function () {
			const recs = await Service.getRecordings();
			const model = this.getModel("viewData");
			model.setProperty("/recordings", recs);
		},

		recordingPress: function (id) {
			this.navTo("recording", {
				id: id
			});
		}
	});
});
