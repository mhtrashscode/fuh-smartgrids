import dayjs from "dayjs";
import { round } from 'mathjs';

/**
 * Searches for time frames with best possible energy coverage for the given consumption recording 
 * within the given solar forecast.
 * @param {Object} recording 
 * @param {Object} forecast 
 * @param {Number} span Time span between coverage inspections.
 * @param {Number} upto Maximum number of time frame recommendations to be returned.
 * @returns An array of energy coverage objects.
 */
export function findBestCoverage(recording, forecast, span = 15, upto = 3) {
    // Determine time boundaries
    const earliestStart = dayjs(forecast.info.begin).minute(0).second(0).add(1, 'hour');
    const recordingLength = recording.intervals.length * recording.intervalLength;
    const latestStart = dayjs(forecast.info.end).subtract(recordingLength, 'minute');
    // Execute inspections and calculate energy coverages
    const inspections = [];
    let inspectionBegin = earliestStart;
    while (inspectionBegin.isBefore(latestStart)) {
        const inspection = calculateCoverage(inspectionBegin, recording, forecast);
        if (inspection.energyCovered > 0) {
            inspections.push(inspection);
        }
        inspectionBegin = inspectionBegin.add(span, 'minute');
    }
    // Sort inspections by energy coverage and return those with highest coverage
    inspections.sort((a, b) => {
        return a.energyCovered > b.energyCovered ? -1 : 1;
    });
    return inspections.slice(0, upto);
}

/**
 * Determines the expected solar energy coverage in case the given consumption recording would be
 * repeated at the time specified in parameter 'begin'.
 * @param {Date} begin 
 * @param {Object} recording 
 * @param {Object} forecast 
Example Result
{
    begin: "2024-06-20 10:00:00",
    recordingId: "ABC123",
    energyConsumption: 6900 // watt hours
    energyCovered: 2500, // watt hours
    coverage: 0.24, // 24%
    intervals: [
        {
            begin: "2024-06-20 10:00:00",
            powerRequired: 400,
            powerAvailable: 380,
            coverage: 0.90
        }
        ...
    ]
}
*/
export function calculateCoverage(begin, recording, forecast) {
    const intervals = [];
    let intervalBegin = dayjs(begin);
    let totalDeficitWattMinutes = 0.0;
    /*
        Calculate power coverage for each recording interval.
        ri = recording interval
    */
    for (const ri of recording.intervals) {
        const solarPower = getSolarPower(intervalBegin, forecast);
        const deficit = (ri.average_power - solarPower) < 0 ? 0 : (ri.average_power - solarPower);
        intervals.push({
            begin: intervalBegin.format(),
            powerRequired: ri.average_power,
            powerAvailable: solarPower,
            powerDeficit: deficit,
            coverage: round(solarPower / ri.average_power, 2) // may exceed 100%
        });
        intervalBegin = intervalBegin.add(recording.intervalLength, 'minute');
        totalDeficitWattMinutes += deficit * recording.intervalLength;
    }
    // Aggregate coverage data
    const totalDeficitWattHours = round(totalDeficitWattMinutes / 60, 0);
    const energyCovered = recording.totalConsumption - totalDeficitWattHours;
    return {
        begin: dayjs(begin).format(),
        recordingId: recording.id,
        energyConsumption: recording.totalConsumption,
        energyCovered: energyCovered,
        coverage: round(energyCovered / recording.totalConsumption, 2), // 0% - 100%
        intervals: intervals
    };
}

/**
 * Searches the solar forecast object for the expected power output on the given date and time.
 * @param {Date} timestamp 
 * @param {Object} forecast 
 * @returns Expected solar power output
 */
function getSolarPower(timestamp, forecast) {
    for (const i of forecast.intervals) {
        if (dayjs(timestamp).isBefore(i.timestamp)) {
            return i.power;
        }
    }
    return 0;
}