import dayjs from "dayjs";
import config from "./config.js";
import { nanoid } from 'nanoid';
import { mean, std, round } from 'mathjs';

/**
 * Requests the entity states / sensor readings via the home assistant API for the given period.
 * @param {String} entityId 
 * @param {Date} begin 
 * @param {Date} end 
 * @returns {Object}
 * Example Result
 {
    entityId: 'sensor.randometer',
    firstReadingAt: '2024-07-08T08:43:44+02:00',
    lastReadingAt: '2024-07-08T10:43:34+02:00',
    unitOfMeasurement: 'W',
    readings: [
        { state: '3410', timestamp: '2024-07-08T08:43:44+02:00' },
        { state: '3124', timestamp: '2024-07-08T08:57:33+02:00' },
        ...
    }
 */
export async function getSensorReadings(entityId, begin, end) {
    // request home assistant readings
    const p = new URLSearchParams({
        end_time: dayjs(end).format(),
        filter_entity_id: entityId
    });
    const url = `${config.haURL}/history/period/${dayjs(begin).format()}?${p.toString()}`;
    //const reqURL = `${config.haURL}/history/period/${dayjs(begin).format()}?end_time=${dayjs(end).format()}?filter_entity_id=${entityId}`;
    const response = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${config.haToken}`,
            "Content-Type": "application/json"
        }
    });
    console.log(url, response.status);
    if (response.status >= 300) {
        throw { message: "cannot read sensor readings from home assistant API" };
    }
    const data = (await response.json())[0];
    // construct reading result
    let result = {
        entityId: entityId,
        firstReadingAt: undefined,
        lastReadingAt: undefined,
        unitOfMeasurement: undefined,
        readings: []
    };
    if (!data || data.length === 0) {
        return result;
    }
    result.firstReadingAt = dayjs(data[0].last_changed).format();
    result.unitOfMeasurement = data[0].attributes.unit_of_measurement;
    result.lastReadingAt = dayjs(data[data.length - 1].last_changed).format();
    for (const r of data) {
        result.readings.push({
            state: r.state,
            timestamp: dayjs(r.last_changed).format()
        });
    }
    return result;
}
/**
 * Creates a power consumption recording based on sensor readings. Sensor readings are grouped into intervals
 * of a given length. Average (mean) power consumtion as well as the consumption standard deviation are
 * calculated per interval.
 * @param {Object} sensorReadings 
 * @param {int} intervalLength in Minutes
 * @returns {Object}
 * Example Recording
 {
    id: 'BVGvK7UC5WuLrOAZukxhn',
    entityId: 'sensor.randometer',
    recordedAt: '2024-07-10T09:59:07+02:00',
    intervals: [
        { average_power: 1499, std_deviation: 1134 },
        { average_power: 1605, std_deviation: 1027 },
        ...
    ]
}
 */
export async function createConsumptionRecording(sensorReadings, intervalLength = 5) {
    const recording = {
        id: nanoid(),
        entityId: sensorReadings.entityId,
        recordedAt: dayjs().format(),
        intervals: []
    };
    const readingIntervals = [];
    // create groups of sensor readings according to the interval length
    let intervalCounter = -1;
    let nextIntervalBegin = sensorReadings.firstReadingAt;
    for (const r of sensorReadings.readings) {
        if (dayjs(r.timestamp).isBefore(nextIntervalBegin)) {
            // add to current interval
            readingIntervals[intervalCounter].push(r);
        } else {
            // create new interval
            readingIntervals.push([r]);
            intervalCounter += 1;
            nextIntervalBegin = dayjs(nextIntervalBegin).add(intervalLength, 'minute');
        }
    }
    // calculate average power consumption per interval based on sensor reading intervals
    for (const readingInterval of readingIntervals) {
        const states = readingInterval.map(r => {
            return r.state;
        });
        recording.intervals.push({
            average_power: round(mean(states), 0),
            std_deviation: round(std(states), 0)
        });
    }
    return recording;
}