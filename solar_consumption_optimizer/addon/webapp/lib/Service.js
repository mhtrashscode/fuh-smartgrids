sap.ui.define([
    "sap/base/Log"
], function (Log) {
    "use strict";

    return {
        getRecordings: async function () {
            const response = await fetch("api/recordings", {
                method: "GET"
            });
            if (!response.ok) {
                throw new Error(response.message);
            }
            return await response.json();
        },

        getRecording: async function (id) {
            const response = await fetch(`api/recordings?id=${id}`, {
                method: "GET"
            });
            if (!response.ok) {
                throw new Error(response.message);
            }
            return await response.json();
        },

        getPredictions: async function (recordingId, span=120, upto=10) {
            const p = { span: span, upto: upto };
            if (!p.span) delete p.span;
            if (!p.upto) delete p.upto;
            const up = new URLSearchParams(p);
            let url = `api/predictions/${recordingId}`;
            if (up.size > 0) url = `${url}?${up.toString()}`;
            const response = await fetch(url, {
                method: "GET"
            });
            if (!response.ok) {
                throw new Error(response.message);
            }
            return await response.json();
        }
    }
});
