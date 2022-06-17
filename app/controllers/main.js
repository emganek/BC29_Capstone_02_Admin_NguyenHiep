var tBody = document.querySelector("#tblproductList");
var services = new Services();

// INIT-------------------------------------------------------------------
function getMyEle(id) {
    return document.getElementById(id);
}

window.onscroll = function () {
    if (window.scrollY >= 2) {
        document.getElementById("header").style.backgroundColor = "white";
        document.getElementById("header").style.boxShadow = "0 0 10px 0 rgba(204 204 204 / 50%)"
    }
    else {
        document.getElementById("header").style.backgroundColor = "transparent";
        document.getElementById("header").style.boxShadow = "none"
    }
}

//Tìm kiếm một phần tử trong mảng bằng tên
function findInArrById(id, arrObject) {
    let result = -1;
    arrObject.forEach(function (item, index) {
        if (id == item.product.id) {
            result = index;
        }
    })
    return result;
}
//-------------------------------------------------------------------------

//Render list Phone
function renderList(arr) {
    var content = "";
    arr.forEach(function (item, index) {
        content += `  
            <tr>
                <td style="text-align:center">${index + 1}</td>
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td>${item.screen}</td>
                <td>${item.backCamera}</td>
                <td>${item.backCamera}</td>
                <td style="text-align:center"><img src="${item.img}" alt="Card image"></td>
                <td>${item.desc}</td>
                <td>${item.type}</td>
                <td style="text-align:center">
                    <button class="btn btn-primary" onclick="editHandler(${item.id})"  data-toggle="modal" data-target="#myModal">Edit</button>
                    <button class="btn btn-danger mt-2" onclick="deleteHandler(${item.id})">Delete</button>
                </td>
            </tr>     
`
    });
    tBody.innerHTML = content;
}

//Lấy data của Phones từ server và render ra màng hình
function getListPhones() {
    services.getListPhonesAPI()
        .then(function (result) {
            renderList(result.data);
        })

        .catch(function (error) {
            console.log(error);
        })
}

getListPhones();

// Process thêm edit-----------------------
//Function khi click vào nút Edit
function editHandler(id) {
    document.querySelector(".modal-footer").innerHTML = `<button class="btn btn-warning" onclick = "updateHandler(${id})">Update</button>`
    console.log("heelo" + id)
    services.getPhoneAPI(id)
        .then(function (result) {
            document.querySelector("#name").value = result.data.name;
            document.querySelector("#price").value = result.data.price;
            document.querySelector("#screen").value = result.data.screen;
            document.querySelector("#img").value = result.data.img;
            document.querySelector("#backCamera").value = result.data.backCamera;
            document.querySelector("#type").value = result.data.type;
            document.querySelector("#frontCamera").value = result.data.frontCamera;
            document.querySelector("#desc").value = result.data.desc;
        })

        .catch(function (error) {
            console.log(error)
        })
}
//Function khi click vào nút Update
function updateHandler(id) {
    validateInput(false, updateAction, id);
}
//Fuction hành động update
function updateAction(id, data) {
    services.editPhoneAPI(id, data)
        .then(function () {
            getListPhones();
            document.querySelector(".close").click();
        })

        .catch(function (error) {
            console.log(error);
        })

}
// --------------------------------------------------

//Function khi click vào nút Delete
function deleteHandler(id) {
    services.deletePhoneAPI(id)
        .then(function () {
            getListPhones();
        })

        .catch(function (error) {
            console.log(error);
        })

}

// Process thêm nhân viên mới-----------------------
//Khi nhấn vào nút Thêm mới
document.querySelector("#btnThemSanPham").onclick = function () {
    document.querySelector(".modal-title").innerHTML = "Add new product";
    document.querySelector(".modal-footer").innerHTML = `<button class="btn btn-success" onclick = "addHandler()">Add</button>`;
    clearInput();
}
//Khi nhấn vào nút Add
function addHandler() {
    validateInput(true, addAction, "");
}
//Hành động Add mới
function addAction(data) {
    services.addPhoneAPI(data)
        .then(function () {
            getListPhones();
            document.querySelector(".close").click();
        })

        .catch(function (error) {
            console.log(error);
        })
}
// --------------------------------------------------

//Validate thông tin của input
function validateInput(isAdding, callBackFunction, id) {
    var name = document.querySelector("#name").value;
    var price = document.querySelector("#price").value;
    var screen = document.querySelector("#screen").value;
    var img = document.querySelector("#img").value;
    var backCamera = document.querySelector("#backCamera").value;
    var type = document.querySelector("#type").value;
    var frontCamera = document.querySelector("#frontCamera").value;
    var desc = document.querySelector("#desc").value;
    var validation = new Validation();
    var isValid = true;

    services.getListPhonesAPI()
        .then(function (result) {
            var phoneList = result.data;
            //Validation tên sản phẩm
            isValid &= validation.empty(name, document.querySelector(".nameMess"));
            if (isAdding) {
                isValid &= validation.present(name, phoneList, document.querySelector(".nameMess"));
            }
            //Validation price
            isValid &= validation.empty(price, document.querySelector(".priceMess")) && validation.isOnlyNumber(price, document.querySelector(".priceMess"));
            //Validation screen
            isValid &= validation.empty(screen, document.querySelector(".screenMess"));
            //Validation img
            isValid &= validation.empty(img, document.querySelector(".imgMess"));
            //Validation Back Camera
            isValid &= validation.empty(backCamera, document.querySelector(".backCameraMess"));
            //Validation Front Camera
            isValid &= validation.empty(frontCamera, document.querySelector(".frontCameraMess"));
            //Validation Type
            isValid &= validation.isOptionValid(document.querySelector("#type").selectedIndex, document.querySelector(".typeMess",), 0);
            //Validation mô tả
            isValid &= validation.empty(desc, document.querySelector(".descMess")) && validation.lengthLitmit(desc, document.querySelector(".descMess"), 10, 60);
            if (isValid) {
                var phone = new Phone("", name, price, screen, backCamera, frontCamera, img, desc, type);
                if (isAdding) {
                    callBackFunction(phone);
                }
                else {
                    callBackFunction(id, phone);
                }
            };
        })

        .catch(function (error) {
            console.log(error);
        })

}

//Xóa thông tin input
function clearInput() {
    document.querySelector("#name").value = "";
    document.querySelector("#price").value = "";
    document.querySelector("#screen").value = ""
    document.querySelector("#backCamera").value = "";
    document.querySelector("#frontCamera").value = "";
    document.querySelector("#img").value = "";
    document.querySelector("#desc").value = "";
    document.querySelector("#type").selectedIndex = 0;
    hideErrorMess();
}

//Ẩn thông báo lỗi
function hideErrorMess() {
    document.querySelector(".nameMess").style.display = "none"
    document.querySelector(".priceMess").style.display = "none"
    document.querySelector(".screenMess").style.display = "none"
    document.querySelector(".backCameraMess").style.display = "none"
    document.querySelector(".frontCameraMess").style.display = "none"
    document.querySelector(".imgMess").style.display = "none"
    document.querySelector(".descMess").style.display = "none"
    document.querySelector(".typeMess").style.display = "none"

}
