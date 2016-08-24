// productsDAO.js
var sqlite = require('sqlite3').verbose();
const fs = require('fs');
var ProductDTO=require('./ProductsDTO');

var fileDB = 'content/myBase.db';
var db = new sqlite.Database(fileDB);
var exists = fs.existsSync(fileDB);

function ProductsDAO() {
    db.serialize(function () {
        if(!exists)
        {
            db.run("CREATE TABLE products (" +
                "product_id INTEGER PRIMARY KEY AUTOINCREMENT," +
                "product_name TEXT," +
                "product_price INTEGER," +
                "product_desc TEXT," +
                "product_image TEXT);",function (err) {
                if(err){
                    console.log('CREATE db error: '+err);
                }else{
                    console.log('SQL Table products initialized');
                }
                }
            );
        }else{
            console.log('SQL Table products already exists')
        }
    });
}
ProductsDAO.prototype.insert = function (productDTO) {
    var sqlRequest = "INSERT INTO products (product_name,product_price," +
        "product_desc,product_image) VALUES (?,?,?,?);";
    var stmt = db.prepare(sqlRequest,function (err) {
        if(err){
            console.log('INSERT db error: '+err);
        }else{
            console.log('Product insertion successful');
        }
    });

    stmt.run(productDTO.getName(),
        productDTO.getPrice(),
        productDTO.getDesc(),
        productDTO.getImage());
    stmt.finalize();
    //TODO a tester
    // db.close();
};
ProductsDAO.prototype.update = function (productDTO) {
console.log(productDTO);
    var sqlResquest = "UPDATE 'products' SET product_name = ?,product_price = ?,product_desc = ?,product_image = ? WHERE product_id = ?";
    var stmt = db.prepare(sqlResquest, function (err) {
        if (err !== null) {
            console.log('error on Update : ' + err);
        }
        else {
            console.log('Update Valid');
        }
    });
    stmt.run(
        productDTO.getName(),
        productDTO.getDesc(),
        productDTO.getPrice(),
        productDTO.getImage(),
        productDTO.getId()
    );
    stmt.finalize();
};
ProductsDAO.prototype.getOne = function (param,callback) {
    //console.log('param '+param.id);
    var sqlRequest = "SELECT * FROM products WHERE product_id = " + param.id;
    db.all(sqlRequest, function (err, rows) {
        //console.log(rows);
        if (err) {
            console.log('SELECT ONE db error: ' + err);
        } else {
            var productDTO = new ProductDTO();
            productDTO.setId(rows[0].product_id);
            productDTO.setName(rows[0].product_name);
            productDTO.setPrice(rows[0].product_price);
            productDTO.setDesc(rows[0].product_desc);
            productDTO.setImage(rows[0].product_image);

        }
        callback(err, productDTO);

    });
};
ProductsDAO.prototype.delete = function (param){

    var sqlRequest = "DELETE FROM products WHERE product_id = ?";
    var stmt = db.prepare(sqlRequest,function (err) {
        if(err){
            console.log('DELETE db error: '+err);
            console.log(stmt);
        }else{
            console.log('Product deletion successful');
        }
    });
    stmt.run(param.id,function(err){console.log(err)});
    stmt.finalize();
};
ProductsDAO.prototype.fetchAll= function(callback) {
    var results=[];
    var sqlRequest = "SELECT * FROM products;";
    db.all(sqlRequest,function (err,rows) {
        if(err){
            console.log('SELECT db error: '+err);
        }else{
            console.log('Product selection successful');
            rows.forEach(function(row){
                var productDTO= new ProductDTO();
                productDTO.setId(row.product_id);
                productDTO.setName(row.product_name);
                productDTO.setPrice(row.product_price);
                productDTO.setDesc(row.product_desc);
                productDTO.setImage(row.product_image);
                results.push(productDTO);

            });
            callback(err,results) ;
        }
    });
};

module.exports= new ProductsDAO();