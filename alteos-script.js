let utils = {};
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
// return;
window.addEventListener("load", function () {
    if (!!params.category) {
        // return;
        const policyDetails = {
            "isProcessing": false,
            "formValues": {
                "objects_0__values_itemType": params.category,
                "objects_0__values_itemCategory": params.subcategory,
                "objects_0__values_itemValue": params.priceRange,
                "values_duration": "24",
                "objects_0__values_brand": "",
                "objects_0__values_ean": "",
                "objects_0__values_purchasedAt": "",
                "customer_values_salutation": "",
                "customer_firstName": "",
                "customer_lastName": "",
                "customer_values_dateOfBirth": "",
                "helpers_address": "",
                "helpers_googleAddress": "",
                "helpers_googleHouseNumber": "",
                "helpers_invalidAddressAlert": "",
                "helpers_manualAddressOn": false,
                "customer_values_addressPlz": "",
                "customer_values_addressCity": "",
                "customer_values_addressStreet": "",
                "customer_values_addressHouseNumber": "",
                "customer_values_addressCo": "",
                "customer_phone": "",
                "customer_email": "",
                "helpers_emailConfirmation": "",
                "helpers_isEmployee": false,
                "values_employeeId": "",
                "category": params.category,
                "priceRange": params.priceRange,
                "subcategory": params.subcategory,
                "helpers_isValid-quote": false
            },
            "policyId": null,
            "productKey": "garantie",
            "uniqueFieldError": null,
            "googleAddress": null,
            "googleAddressLoading": false,
            "googleAddressError": false,
            "isPolicyLoading": false,
            "errorMessage": null,
            "quote": {
                "gross": 129.95,
                "premium": 25.17,
                "taxes": 4.78,
                "premiumExclDiscounts": 25.17,
                "taxesExclDiscounts": 4.78,
                "grossExclDiscounts": 29.95,
                "metadata": {},
                "requestData": {
                    "productName": "garantie",
                    "values": {
                        "duration": "24"
                    },
                    "objects": [
                        {
                            "name": "whiteAppliances",
                            "values": {
                                "itemValue": params.priceRange,
                                "itemCategory": params.subcategory,
                                "itemType": params.category
                            },
                            "risks": [
                                {
                                    "name": "deviceBreakdown",
                                    "values": {}
                                }
                            ]
                        }
                    ]
                }
            }
        }
        localStorage.setItem('expiresAt', Date.now() + (1000 * 60 * 10))
        localStorage.setItem('persist:root', JSON.stringify({
            "policyDetails2": JSON.stringify(policyDetails),
            "policyDetails": JSON.stringify(policyDetails), "contactPopup": "{\"popupOpen\":false}",
            "_persist": "{\"version\":-1,\"rehydrated\":true}"
        }));
        window.location.replace("https://shop.alteos.com/garantie/quote");
    }

})
