const envSpecificSettings = require(`./settings.${process.env.NODE_ENV}.json`);
const defaults = require("./settings.default.json");

export default Object.assign({}, defaults, envSpecificSettings);
