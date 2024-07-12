sap.ui.define([
    "sap/base/Log"
], function (Log) {
    "use strict";

    return {
        getEntities: async function () {
            const response = await fetch("api/entities", {
                method: "GET"
            });
            if (!response.ok) {
                throw new Error(response.message);
            }
            return await response.json();
        },

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

        postRecording: async function (recording) {
            const payload = JSON.stringify({
                name: recording.name,
                entityId: recording.entityId,
                begin: recording.begin,
                end: recording.end,
                intervalLength: recording.intervalLength
            });
            const response = await fetch(`api/recordings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: payload
            });
            if (!response.ok) {
                throw new Error(response.message);
            }
        },

        getPredictions: async function (recordingId, span = 120, upto = 10) {
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
