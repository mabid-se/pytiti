import dayjs from "./dayjs";

export default {
  methods: {
    formatDateMDYYYY(dateString) {
      const date = dayjs(dateString);
      return date.format("M/D/YYYY");
    },
    formatDateDMYYYYHHmm(dateString) {
      const date = dayjs.tz(dateString);
      return date.format("D/M/YYYY HH:mm");
    },
    formatDatetimedddDMMMHHmm(dateTimeString) {
      const date = dayjs.tz(dateTimeString);
      return date.format("ddd D MMM - HH:mm");
    },
    formatDatetimeDMMMYYYYHHmm(dateTimeString) {
      const date = dayjs.tz(dateTimeString);
      return date.format("D MMM YYYY - HH:mm");
    },
    formatDatetimezToDate(dateTimeString) {
      return dateTimeString ? dateTimeString.substring(0, 10) : "";
    },
    calculateExpirationDate(dateTimeString, years = 0) {
      if (!dateTimeString) return "";
      const [year, month, d] = dateTimeString.substring(0, 10).split("-");
      const day = `${parseInt(year) + years}-${month}-${d} 00:00:00Z`;
      const date = dayjs.tz(day).subtract(1, "day");

      return date.format("D/M/YYYY");
    },

    olderThanNow(dateString) {
      if (!dateString) return "";
      const day2 = dayjs();
      return day2.diff(dayjs(dateString, "D/M/YYYY"), "day") > 0;
    },
  },
};
