import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";

/**
 * @namespace de.fernunihagen.smartgrids.socopt.controller
 */
export default class Main extends BaseController {
	public sayHello(): void {
		MessageBox.show("Hello World!");
	}
	public doStuff(): void {
		console.log("doStuff Pressed");
		this.getEntities();
	}

	private async getEntities() {
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
}
