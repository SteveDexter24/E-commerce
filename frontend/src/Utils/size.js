export const sizeTypeToInfo = (sizeType) => {
    switch (sizeType) {
        case "XS":
            return "Extra Small";
        case "S":
            return "Small";
        case "M":
            return "Medium";
        case "L":
            return "Large";
        case "XL":
            return "Extra Large";
        default:
            return sizeType;
    }
};
