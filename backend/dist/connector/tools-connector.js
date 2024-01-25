"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArrowOfEachObject = exports.hrmEmployeeURL = exports.crxAccountURL = exports.crxProductURL = void 0;
exports.crxProductURL = "https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/";
exports.crxAccountURL = "https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/";
exports.hrmEmployeeURL = "https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/search";
function getArrowOfEachObject(objects, func) {
    objects.forEach((object) => func(object));
}
exports.getArrowOfEachObject = getArrowOfEachObject;
function nameFromObjectsFunc(object) {
    console.log(`${object.name}`);
    return object.name;
}
function getNamesOfEachObject(objects) {
    getArrowOfEachObject(objects, nameFromObjectsFunc);
}
function getNamesOfEachObject2(objects) {
    getArrowOfEachObject(objects, (object) => object.name);
}
