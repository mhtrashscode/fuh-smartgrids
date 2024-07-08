import BaseController from "./BaseController";

/**
 * @namespace de.fernunihagen.smartgrids.socopt.controller
 */
export default class App extends BaseController {
	public onInit(): void {
		// apply content density mode to root view
		this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
	}
}
