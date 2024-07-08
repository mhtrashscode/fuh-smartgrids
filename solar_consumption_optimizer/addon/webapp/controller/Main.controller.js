sap.ui.define(["./BaseController", "sap/m/MessageBox"], function (BaseController, MessageBox) {
	"use strict";

	return BaseController.extend("de.fernunihagen.smartgrids.socopt.controller.Main", {
		sayHello: function () {
			MessageBox.show("Hello World!");
		},

		doStuff: function () {
			//this.getEntities();
			this.navTo("addRecording");
		},

		getEntities: async function () {
			try {
				const response = await fetch("api/entities", {
					method: "GET"
				});
				if (!response.ok) {
					throw new Error(`Response status: ${response.status}`);
				}
				const json = await response.json();
				console.log(json);
			} catch (error) {
				console.error(error);
			}
		}
	});
});
