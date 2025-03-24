import Icon from "@ant-design/icons/lib/components/Icon";
import { toast } from "react-toastify";

export const IMG_LINK = process.env.REACT_APP_API_LINK_IMG;

// Remote accents
export const removeAccents = (str) => {
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
    ]
    for (var i = 0; i < AccentsMap.length; i++) {
        var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g")
        var char = AccentsMap[i][0]
        str = str.replace(re, char)
    }
    return str
}
export const validateMessages = {
    required: "Trường này không được để trống!",
};

export const regPhone = /^\(?\+?([0-9]{3,4})\)?[-. ]?([0-9]{2,4})[-. ]?([0-9]{3,4})$/;
export const regMail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


export const selectOptions = (array) => {
    const list = [];
    for (let item of array) {
        list.push({
            ...item,
            value: item.id,
            label: item.TEN,
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
            label: item.NAME,
        });
    }
    return list;
};
export const convertBmi = (array) => {
    const list = [];
    for (let item of array) {
        list.push({
            day: item?.NGAY,
            week: item?.TUAN,
            weigh: item?.CANNANG_2 - item?.CANNANG_1,
            weighChange: item?.CANNANG_TANG
        });
    }
    return list;
};

export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const convertMoney = (value) => {
    const result = Number(value).toLocaleString("vi", {
        style: "currency",
        currency: "VND",
    })
    return result
}

export const formatDate = {
    Type: "DD/MM/YYYY",
    Type1: "DD/MM/YYYY hh:mm",
    TypeStart: "MM/DD/YYYY 00:00:00",
    TypeEnd: "MM/DD/YYYY 23:59:59",
}

// add product to cart
export const handleAddCart = (product, listProduct, callback, value) => {

    if (value === 1 || !value) {
        const productData = { ...product, number: 1 };
        const data = listProduct?.find((item) => item?.id === productData?.id);

        if (data?.id) {
            const _listProduct = [...listProduct];
            const index = _listProduct?.findIndex((item) => item.id === data.id);
            _listProduct[index] = {
                ...data,
                number: data?.number + 1,
            };
            localStorage.setItem("cartProducts", JSON.stringify(_listProduct));
            callback(_listProduct);
            toast.success("Thêm sản phẩm thành công!");
        } else {
            localStorage.setItem(
                "cartProducts",
                JSON.stringify([...listProduct, productData])
            );
            callback([...listProduct, productData]);
            toast.success("Thêm sản phẩm thành công!");
        }
    } else if (value > 1) {
        const productData = { ...product, number: value };
        const data = listProduct?.find((item) => item?.id === productData?.id);
        if (data?.id) {
            const _listProduct = [...listProduct];
            const index = _listProduct?.findIndex((item) => item.id === data.id);
            _listProduct[index] = {
                ...data,
                number: data?.number + value,
            };
            localStorage.setItem("cartProducts", JSON.stringify(_listProduct));
            callback(_listProduct);
            toast.success("Thêm sản phẩm thành công!");
        } else {
            localStorage.setItem(
                "cartProducts",
                JSON.stringify([...listProduct, productData])
            );
            callback([...listProduct, productData]);
            toast.success("Thêm sản phẩm thành công!");
        }
    }
};


// handle increa product
export const handleIncrea = (data, listProduct, callback) => {
    const _listProduct = [...listProduct];
    const index = _listProduct?.findIndex((item) => item.id === data.id);
    _listProduct[index] = {
        ...data,
        number: data?.number + 1,
    };
    localStorage.setItem("cartProducts", JSON.stringify(_listProduct));
    callback(_listProduct);
    toast.success("Thêm sản phẩm thành công!");
};


// handle decrea product
export const handleDecrea = (data, listProduct, callback, handleDelete) => {
    const _listProduct = [...listProduct];
    const dataCheck = _listProduct?.find((item) => item.id === data?.id);
    if (dataCheck?.number === 1) {
        handleDelete(data?.id);
    } else {
        const index = _listProduct?.findIndex((item) => item.id === data.id);
        _listProduct[index] = {
            ...data,
            number: data?.number - 1,
        };
        localStorage.setItem("cartProducts", JSON.stringify(_listProduct));
        callback(_listProduct);
        toast.error("Xóa sản phẩm thành công!");
    }
};

// change page paginatiton
export const onChangePagination = (pageNumber, pagination, setPagination) => {
    if (pageNumber > pagination?.page) {
        setPagination({
            from: pagination?.sizepage * (pageNumber - 1),
            to: pagination?.sizepage * pageNumber,
            page: pageNumber,
            sizepage: pagination?.sizepage,
        });
    } else if (pageNumber === 1) {
        setPagination({
            from: 0,
            to: pagination?.sizepage,
            page: 1,
            sizepage: pagination?.sizepage,
        });
    } else {
        setPagination({
            from: (pageNumber - 1) * pagination?.sizepage,
            to: pageNumber * pagination?.sizepage,
            page: pageNumber,
            sizepage: pagination?.sizepage,
        });
    }
};


const HeartSvg = () => (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
        <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
    </svg>
);
export const HeartIcon = (props) => <Icon component={HeartSvg} {...props} />;

export const typeBMI = (bmiResult) =>{
    if(Number(bmiResult) <= 18.5){
        return 1
    }
    if(Number(bmiResult) > 18.5 && Number(bmiResult) <=25){
        return 2
    }
    if(Number(bmiResult) > 25){
        return 3
    }
}
export const compareWeight = (type, weightBef, weightAf) =>{
        let compare = weightAf - weightBef
        if(compare <=0){
            return 1
        }
        if(compare > 0 && compare <= Number(Number(weightBef) * (type === 1 ? 0.25 : type === 3 ? 0.15 : 0))){
            return 2
        }
        if(compare > Number(Number(weightBef) * (type === 1 ? 0.25 : type === 3 ? 0.15 : 0))){
            return 3
        }
}

export const showThu = (thu) =>{
    switch(thu) {
        case 1:
          return "Thứ 2"
          break;
        case 2:
            return "Thứ 3"
          break;
        case 3:
            return "Thứ 4"
          break;
        case 4:
            return "Thứ 5"
          break;
        case 5:
            return "Thứ 6"
          break;
        case 6:
            return "Thứ 7"
          break;
        case 7:
            return "Chủ nhật "
          break;
        default:
          // code block
      }
}
export function getDataUri(url, cb)
{
       var image = new Image();
       image.setAttribute('crossOrigin', 'anonymous'); //getting images from external domain

       image.onload = function () {
           var canvas = document.createElement('canvas');
           canvas.width = this.naturalWidth;
           canvas.height = this.naturalHeight; 

           //next three lines for white background in case png has a transparent background
           var ctx = canvas.getContext('2d');
           ctx.fillStyle = '#fff';  /// set white fill style
           ctx.fillRect(0, 0, canvas.width, canvas.height);

           canvas.getContext('2d').drawImage(this, 0, 0);

           cb(canvas.toDataURL('image/png'));
       };

       image.src = url;
  }