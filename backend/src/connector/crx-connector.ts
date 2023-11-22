import axios from "axios";

async function asyncCall() {
    const baseUrl = 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX';
    const credentials = { username: 'guest', password: 'guest', };
    const config = { headers: { 'Accept': 'application/json' }, auth: credentials, };
    const product = "/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/";
    const account = "/org.opencrx.kernel.product1/provider/CRX/segment/Standard/account/";
    // const productUrl = `${baseUrl}/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/`;
    const productUrl = `${baseUrl}${product}`;
    const accountUrl = `${baseUrl}${account}`;

    const someProducts = await axios.get(productUrl, config);
    const someAccounts = await axios.get(productUrl, config);

    console.log(someProducts);
    const objects = someProducts.data.objects;
    console.log(objects);
    const objectsAccount = someAccounts.data.objects;
    console.log(objectsAccount);

    for (var i = 0; i < objects.length; i++) {
        console.log(objects[i].name);
    }


}
asyncCall();
