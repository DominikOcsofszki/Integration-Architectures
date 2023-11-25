

export const crxProductURL = "/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/";
export const crxAccountURL = "/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/";

export const hrmEmployeeURL = "https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/search";


export function getArrowOfEachObject(objects: Object[], func: Function) {
    objects.forEach((object: any) => func(object));
}

function nameFromObjectsFunc(object: any) {
    console.log(`${object.name}`);
    return object.name;
}
function getNamesOfEachObject(objects: Object[]) {
    getArrowOfEachObject(objects, nameFromObjectsFunc);
}
function getNamesOfEachObject2(objects: Object[]) {
    getArrowOfEachObject(objects, (object: any) => object.name);
}
