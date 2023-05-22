export function currencyVN(value) {
    return value.toLocaleString('vi', {
        style: 'currency',
        currency: 'VND',
    });
}

export function priceSaleVN(priceCurrent, sale) {
    const thousand = 1000;
    if (sale) {
        return (
            priceCurrent -
            Math.round((priceCurrent * sale) / thousand) * thousand
        );
    } else return priceCurrent;
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

export function formatDate(date) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('-');
}

export function getArray(array, code, name) {
    const resutl = array.filter((item) => item.id === code)[0];

    return resutl ? resutl[name] : [];
}

export function createObjectList() {
    return {
        isLoading: false,
        items: [],
        totalPage: 0,
        message: '',
    };
}
