let utils = {};
let currencies = [];
(async () => {
    currencies = await $.getJSON(await chrome.runtime.getURL("currencies.json"));
    const cart = getCart();
    console.log("Insurnia loaded.")
    if (cart.length > 0) {

        let response = await $.ajax({
            type: "GET",
            url: "https://insurnia-server.projects.itsmrtech.com/packages",
            data: {
                cartItems: cart
            }
        })
        const loading = document.querySelectorAll('.insurnia-loading');

        loading.forEach(elem => {
            elem.remove();
        });
        addInsuranceSuggestions(response.packages)
    }
})();

const getCart = () => {
    const cart = Array.from(
        document.querySelectorAll("#sc-active-cart .sc-list-item-content") || []
    );

    if (!cart.length) return null;

    const removeDots = (str) => {
        if (str.match(/\./g).length > 1) return removeDots(str.replace(".", ""))
        return str;
    }
    const cartData = cart.map((cartItem) => {
        const qty = String(cartItem.querySelector("select[name=quantity]")?.value).trim();
        const url = String(cartItem.querySelector(".sc-product-link").href)?.trim();
        const price = String(cartItem.querySelector(".sc-product-price")?.innerText).trim();
        const image = String(cartItem.querySelector(".sc-product-image")?.src).trim();
        const title = String(cartItem.querySelector(
            ".sc-product-title .a-truncate-full"
        )?.innerText).trim();
        const selected = cartItem.querySelector(
            ".sc-list-item-checkbox input[type=checkbox]"
        )?.checked;

        let priceAmount = price.replace(/(^\D+)|(\D+$)/g, '')
        let priceCurrencySymbol = price.replace(String(priceAmount), '').trim();
        priceAmount = priceAmount.replace(",", ".")
        priceAmount = removeDots(priceAmount)
        let currencyKey = Object.keys(currencies).find(c => currencies[c].symbol === priceCurrencySymbol)
        if (!currencyKey) return false;
        let currencyObj = currencies[currencyKey]

        const rightCol = cartItem.querySelector(".sc-item-right-col")
        $(rightCol).append(genInsuranceButton({ status: "loading" }));


        return {
            qty,
            price: {
                amount: Number(priceAmount),
                currency: String(currencyObj.code).toLowerCase(),
            },
            image,
            url,
            title,
            selected,
            asin: url.slice(
                url.indexOf("/product/") + 9,
                url.lastIndexOf("/")
            )

        };
    }).filter(c => c !== false);


    return cartData;
};

const genInsuranceButton = (props) => {
    if (props.status === "loading")
        return `
    <div class="insurnia-button insurnia-loading">
        <img src="${chrome.runtime.getURL("images/loading.png")}" /> 
        <div class="insurnia-button-details">
            <span class="insurnia-button-title">Finding</span>
            <span class="insurnia-button-subtitle">Best guarantee</span>
        </div>
    </div>
`
    else if (props.status === 'unavailable')
        return `
        <div class="insurnia-button insurnia-disabled">
            <img src="${chrome.runtime.getURL("images/logo-128.png")}" /> 
            <div class="insurnia-button-details">
                <span class="insurnia-button-title">Not Available</span>
                <span class="insurnia-button-subtitle">No guarantee found</span>
            </div>
        </div>
    `
    return `
    <a href="${props.url}" target="_blank">
        <div class="insurnia-button">
            <img src="${chrome.runtime.getURL("images/alteos.png")}" /> 
            <div class="insurnia-button-details">
                <span class="insurnia-button-title">${currencies[String(props.cost.currency).toUpperCase()].symbol}${props.cost.amount}</span>
                <span class="insurnia-button-subtitle">${props.months} months guarantee</span>
            </div>
        </div>
    </a>
    `
}
const addInsuranceSuggestions = (packages) => {
    const items = $("#sc-active-cart .sc-list-item-content")
    const cart = Array.from(
        document.querySelectorAll("#sc-active-cart .sc-list-item-content") || []
    );
    cart.map(item => {
        const url = item.querySelector(".sc-product-link").href;
        const asin = url.slice(
            url.indexOf("/product/") + 9,
            url.lastIndexOf("/")
        );
        const package = packages.find(package => package.asin === asin)
        const rightCol = item.querySelector(".sc-item-right-col")
        if (!package) return $(rightCol).append(genInsuranceButton({ status: "unavailable" }));;
        $(rightCol).append(genInsuranceButton(package));



    })
}


