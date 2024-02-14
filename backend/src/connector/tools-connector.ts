export const crxProductURL =
    "https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/";
export const crxAccountURL =
    "https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/";

export const hrmEmployeeURL =
    "https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/search";

export function getArrowOfEachObject(objects: Object[], func: Function) {
    objects.forEach((object: any) => func(object));
}