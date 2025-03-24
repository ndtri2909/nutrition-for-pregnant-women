// 
export function removeAccents(str) {
    var AccentsMap = [
        "aàảãáạăằẳẵắặâầẩẫấậ",
        "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
        "dđ",
        "DĐ",
        "eèẻẽéẹêềểễếệ",
        "EÈẺẼÉẸÊỀỂỄẾỆ",
        "iìỉĩíị",
        "IÌỈĨÍỊ",
        "oòỏõóọôồổỗốộơờởỡớợ",
        "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
        "uùủũúụưừửữứự",
        "UÙỦŨÚỤƯỪỬỮỨỰ",
        "yỳỷỹýỵ",
        "YỲỶỸÝỴ",
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
        var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
        var char = AccentsMap[i][0];
        str = str?.replace(re, char);
    }
    return str;
}

// conver money vnd
export const convertMoney = (value) => {
    // const result = Number(value).toLocaleString("vi", {
    //     style: "currency",
    //     currency: "VND",
    // })
    const result = new Intl.NumberFormat({
        style: "currency",
        currency: "VND",
    }).format(value)
    return result
}

// MASSAGE VALIDATE EMPTY
export const validateMessages = {
    required: "Trường này không được để trống!",
};

export const regPhone = /^\(?\+?([0-9]{3,4})\)?[-. ]?([0-9]{2,4})[-. ]?([0-9]{3,4})$/;
export const regMail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
// /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export const checkFilterList = (a, b) => (a ? a : b);

// Convert data from api to Antd select options.
export const selectOptions = (array) => {
    const list = [];
    for (let item of array) {
        list.push({
            ...item,
            value: item.id,
            label: item.TEN
        });
    }
    return list;
};
export const selectOptionsCity = (array) => {
    const list = [];
    for (let item of array) {
        list.push({
            ...item,
            value: item.id,
            label: item.NAME
        });
    }
    return list;
};

// 
export const selectOptionFullName = (array) => {
    const list = [];
    for (let item of array) {
        list.push({
            ...item,
            value: item.User?.FIRST_NAME + " " + item.User?.LAST_NAME,
            label: item.User?.FIRST_NAME + " " + item.User?.LAST_NAME,
        });
    }
    return list;
};

//  // FUNCTION ROMOVE THE SAME ITEMS with NAME
export function uniqueName(arr) {
    var newArr = [];
    for (var i = 0; i < arr?.length; i++) {
        const isBoolean = newArr?.some((item) => {
            const key = removeAccents(item?.NAME)?.toLowerCase()?.trim();
            const match = removeAccents(arr[i]?.NAME)?.toLowerCase()?.trim();
            return match?.includes(key);
        });
        if (!isBoolean) {
            newArr.push({ ...arr[i] });
        }
    }
    return newArr;
}

// pagination
export const TblPagination = {
    defaultPageSize: 100,
    defaultCurrent: 1,
    showSizeChanger: true,
    pageSizeOptions: [50, 100, 200, 250],
};

// Date format
export const formatDate = {
    Type: "DD/MM/YYYY",
    TypeMonth: "MM/YYYY",
    TypeStart: "MM/DD/YYYY 00:00:00",
    TypeEnd: "MM/DD/YYYY 23:59:59",
    TypeStartDate: "YYYY-MM-DDT00:00:00.000",
    TypeEndDate: "YYYY-MM-DDT23:59:59.999",
};

export const handleBlockEnter = (e) => {
    e.key === "Enter" && e.preventDefault();
};

// take the last 3 years
export function listNumber(value) {
    const listYear = [];
    for (let i = 1; i <= value; i++) {
        listYear.push({ value: i, label: i });
    }
    return listYear;
}

// take the last 3 years
export function listNumberItem(value) {
    const listYear = [];
    for (let i = 1; i <= value; i++) {
        listYear.push(i);
    }
    return listYear;
}

// take the last 4 years
export function listYears(value) {
    const dateNow = new Date().getFullYear();
    const listYear = [];
    for (let i = 0; i <= value; i++) {
        listYear.push({ label: dateNow - i, value: dateNow - i });
    }
    return listYear;
}

// check status asset
export function checkStatus(value) {
    if (value?.toLowerCase()?.includes("new")) {
        return "#00ffff";
    }
    if (value?.toLowerCase()?.includes("good")) {
        return "#00ff00";
    }
    if (value?.toLowerCase()?.includes("dam")) {
        return "#ff0000";
    }
    if (value?.toLowerCase()?.includes("pre")) {
        return "#ffff00";
    }
    if (value?.toLowerCase()?.includes("lost")) {
        return "#666666";
    }
    if (value?.toLowerCase()?.includes("rel")) {
        return "#cccccc";
    }
}

