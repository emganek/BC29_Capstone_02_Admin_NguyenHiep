function Services(){
    //Lấy cả mãng dữ liệu từ API
    this.getListPhonesAPI = function(){
        return axios({
            url: "https://62986710f2decf5bb7416a75.mockapi.io/Capstone_02",
            method: "GET"
        });
    }

    //Xóa một dữ liệu từ API
    this.deletePhoneAPI = function(id){
        return axios({
            url: `https://62986710f2decf5bb7416a75.mockapi.io/Capstone_02/${id}`,
            method: "DELETE"
        })
    }

    //Thêm cả mãng dữ liệu lên API
    this.addPhoneAPI = function(newPhone){
        return axios({
            url: `https://62986710f2decf5bb7416a75.mockapi.io/Capstone_02`,
            method: "POST",
            data: newPhone
        })
    }

    //Thêm một dữ liệu lên API
    this.editPhoneAPI = function(id, Phone){
        return axios({
            url: `https://62986710f2decf5bb7416a75.mockapi.io/Capstone_02/${id}`,
            method: "PUT",
            data: Phone
        })
    }

    //Lấy một dữ liệu từ API
    this.getPhoneAPI = function(id){
        return axios({
            url: `https://62986710f2decf5bb7416a75.mockapi.io/Capstone_02/${id}`,
            method: "GET",
        })
    }
}