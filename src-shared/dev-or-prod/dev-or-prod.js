"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevOrProd = void 0;
const logger_1 = require("../log/logger");
function determineDevOrProd() {
    // process.env.npm_package_config_devOrProd is set from "devOrProd" in "config" in package.json
    // when npm script defined in package.json is used.
    // This means the followings:
    //  - If npm script (e.g. "npm start", "npm run test:all") is used, devOrProdInPackageJson is set to the value of "devOrProd" in package.json
    //  - If packaged application is directly launched (i.e. publicly released application), devOrProdInPackageJson is not set (undefined).
    const devOrProdInPackageJson = process.env.npm_package_config_devOrProd;
    logger_1.Logger.info(`"devOrProd" in "config" in package.json: ${devOrProdInPackageJson}`);
    const isDevOrProdSpecifiedInPackageJson = devOrProdInPackageJson === 'Dev' || devOrProdInPackageJson === 'Prod';
    if (isDevOrProdSpecifiedInPackageJson) {
        return devOrProdInPackageJson;
    }
    else if (!devOrProdInPackageJson) {
        return 'Prod';
    }
    else {
        throw new Error(`Either "Dev" or "Prod" needs to be specified for "devOrProd" in "config" in package.json, but the specified value is "${devOrProdInPackageJson}".`);
    }
}
const devOrProd = determineDevOrProd();
logger_1.Logger.info(`Determined DevOrProd: ${devOrProd}`);
class DevOrProd {
    static toString() {
        return devOrProd;
    }
    static get isDev() {
        return devOrProd === 'Dev';
    }
    static get isProd() {
        return devOrProd === 'Prod';
    }
}
exports.DevOrProd = DevOrProd;
//# sourceMappingURL=dev-or-prod.js.map