import moment from "moment";

export const DATE_FORMAT = "MMMM Do YYYY";

export function timestampToDate(timestamp) {
    return moment(timestamp * 1000).format(DATE_FORMAT);
}