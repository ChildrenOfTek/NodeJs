// productsController.js
var productDAO= require('../models/productsDAO');
var ProductDTO= require('../models/productsDTO');

function ProductsController() {}

ProductsController.prototype.fetchAllAction=function (req,res) {

    function select(err,productsDTO) {
        //console.log(productsDTO);
        res.render('productsView', {title: 'Fetch All',prods: productsDTO});
    }

    productDAO.fetchAll(select);

};
ProductsController.prototype.getOneAction=function (req,res) {


    function select(err,productDTO) {
        if(req.url.substr(3)=='update')
        {
            res.render('addView', {title: 'Update',produit: productDTO});

        }else{

            res.render('productView', {title: 'Fetch One',produit: productDTO});

        }
        //console.log(productDTO);

    }

    productDAO.getOne(req.params,select);

};
ProductsController.prototype.addAction=function (req,res) {
    res.render('addView', {title: 'Add product'});
};
ProductsController.prototype.deleteAction=function (req,res) {
    productDAO.delete(req.params);
    res.redirect('/products');
};
ProductsController.prototype.insertAction=function (req,res) {
    productDTO=new ProductDTO();
    var post=req.body;
    productDTO.setName(post.name);
    productDTO.setPrice(post.price);
    productDTO.setDesc(post.desc);
    productDTO.setImage(post.image);
    productDAO.insert(productDTO);
    res.redirect('/products');
};
ProductsController.prototype.updateAction=function (req,res) {
    productDTO=new ProductDTO();
    var post=req.body;
    productDTO.setId(req.params.id);
    productDTO.setName(post.name);
    productDTO.setPrice(post.price);
    productDTO.setDesc(post.desc);
    productDTO.setImage(post.image);
    productDAO.update(productDTO);
    res.redirect('/products');
};

module.exports= new ProductsController();

