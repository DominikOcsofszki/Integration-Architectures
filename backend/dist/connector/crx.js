"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
function asyncCall() {
    return __awaiter(this, void 0, void 0, function* () {
        const baseUrl = 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX';
        const credentials = { username: 'guest', password: 'guest', };
        const config = { headers: { 'Accept': 'application/json' }, auth: credentials, };
        const product = "/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/";
        const account = "/org.opencrx.kernel.product1/provider/CRX/segment/Standard/account/";
        // const productUrl = `${baseUrl}/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/`;
        const productUrl = `${baseUrl}${product}`;
        const accountUrl = `${baseUrl}${account}`;
        const someProducts = yield axios_1.default.get(productUrl, config);
        const someAccounts = yield axios_1.default.get(productUrl, config);
        console.log(someProducts);
        const objects = someProducts.data.objects;
        console.log(objects);
        const objectsAccount = someAccounts.data.objects;
        console.log(objectsAccount);
        for (var i = 0; i < objects.length; i++) {
            console.log(objects[i].name);
        }
    });
}
asyncCall();
