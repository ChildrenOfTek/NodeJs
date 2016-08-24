// productsDTO.js
function ProductsDTO() {}
/******************* Getters and Setters **********************/

ProductsDTO.prototype.getId = function () {
    return this.id;
};
ProductsDTO.prototype.setId = function (id) {
    this.id = id;
    return this;
};
ProductsDTO.prototype.getName = function () {
    return this.name;
};
ProductsDTO.prototype.setName = function (name) {
    this.name = name;
    return this;
};
ProductsDTO.prototype.getPrice = function () {
    return this.price;
};
ProductsDTO.prototype.setPrice= function (price) {
    this.price = price;
    return this;
};
ProductsDTO.prototype.getDesc = function () {
    return this.desc;
};
ProductsDTO.prototype.setDesc = function (desc) {
    this.desc= desc;
    return this;
};
ProductsDTO.prototype.getImage = function () {
    return this.image;
};
ProductsDTO.prototype.setImage = function (image) {
    this.image = image;
    return this;
};

module.exports = ProductsDTO;