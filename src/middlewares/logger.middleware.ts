import log4js from "log4js";

log4js.configure("./config/log4js.json")

export const logger = log4js.getLogger();
export const httpLogger = log4js.getLogger("http")