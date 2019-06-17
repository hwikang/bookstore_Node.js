
const Product = require('../models/product');

exports.getAddProduct = (req,res,next)=>{
    res.render("admin/edit-product",{
        pageTitle:'Add Product',
        path:'/admin/add-product',
        editing: false
    });
}
    
exports.getEditProduct= (req,res,next)=>{
    //controller에서 edit쿼리 확인, 이건무조건 스트링들ㅇ옴
    const editMode =req.query.edit;
    console.log(editMode)
    if(!editMode) return res.redirect('/');
    const prodId = req.params.productId;
    Product.findById(prodId,product=>{
        if(!product) return res.redirect('/');
        res.render("admin/edit-product",{
            pageTitle:'Add Product',
            path:'/admin/edit-product',
            editing :editMode,
            product :product
        });
    })
    
}
exports.postEditProduct= (req,res,next) =>{
    //input값으로 받은것 ->body
    const prodId = req.body.productId
    const updatedTitle= req.body.title;
    const updatedPrice= req.body.price;
    const updatedImageUrl= req.body.imageUrl;
    const updatedDesc= req.body.description;
    const updatedProduct = new Product(prodId,updatedTitle,updatedImageUrl,updatedDesc,updatedPrice)
    updatedProduct.save();
    res.redirect('/');
}
exports.adminProduct = (req,res,next)=>{
    Product.fetchAll((products)=>{
        //fatchAll 의 콜백함수 (products에는 json 파일의 데이터가 들어감)) , fatchAll 끝나고 실행
        //fetchAll 한후 products 를 가지고 render 를 함
        //callback(JSON.parse(data))
        res.render('admin/products',{
            prods:products,
            pageTitle:'Admin products',
            path:'/admin/products'

        }); 
    });
}
exports.postAddProduct = (req,res,next)=>{
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;    
    const price = req.body.price;
    
    const products = new Product(null,title,imageUrl,description,price);  //title가지고 객체생성
    products.save();  //객체 저장 ->model 의 배열에 저장
    res.redirect('/');
}
exports.postDeleteProduct = (req,res,next) =>{
    const prodId = req.params.productId;
    Product.delete(prodId);
    res.redirect('/');
}