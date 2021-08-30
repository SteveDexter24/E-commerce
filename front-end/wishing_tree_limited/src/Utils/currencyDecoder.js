// Paypal currency decoder
export const currencyDecoder = (currency) => {
    switch (currency) {
        case "hkd":
            return "HKD";
        case "jpn":
            return "JPY";
        default:
            return "HKD";
    }
};
