//router에있는함수들을 다가져옴

const Product = require('../models/product');
const Cart = require('../models/cart')

exports.getProducts = (req,res,next)=>{
    Product.fetchAll((products)=>{
        //fatchAll 의 콜백함수 (products에는 json 파일의 데이터가 들어감)) , fatchAll 끝나고 실행
        //fetchAll 한후 products 를 가지고 render 를 함
        //callback(JSON.parse(data))
        res.render('shop/product-list',{
            prods:products,
            pageTitle:'All products',
            path:'/products',
            asProducts:products.length>0,
            activeShop:true,
            activeAddShop:false,
            formsCSS:false,
            productCSS:true            
        }) 
    }); //모든것 가져옴
};
//productdetail
exports.getProduct = (req,res,next) =>{
    //route에서 /이후값을 params통해 가져옴
    const prodId = req.params.productId;
    //프로덕트 가져오기
    Product.findById(prodId,product=>{
        res.render('shop/product-detail',{
            product:product,
            pageTitle:"Product Detail",
            path:"/product"
        })
    });
}

exports.getIndex = (req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render('shop/index',{
            prods:products,
            pageTitle:'Index',
            path:'/',
          
        }) 
    }); //모든것 가져옴
}
exports.getCart = (req,res,next)=>{
    Cart.getProduct(cart=>{  //cart 가져와서
        Product.fetchAll(products=>{ //product도 가져와서 
            const cartProducts =[]; 
            
            for(product of products){  //프로덕트정보중 카트에있는거만 뽑아냄
                
                const cartProductData = cart.products.find(prod=>prod.id===product.id)
                if(cartProductData){ //쿼리 조인문처럼 프로덕트,카트정보뽑음
                    //cartProductData는 카트정보임
                    cartProducts.push({productData:product , qty:cartProductData.qty});
                    //console.log(cartProducts)
                }
            }
            res.render('shop/cart',{
                pageTitle:'Your cart',
                path:'/cart',
                products:cartProducts       
            });
        })
        
    })

}

exports.postCart =(req,res,next)=>{
    const prodId = req.body.productId
    Product.findById(prodId,(product)=>{
        Cart.addProduct(prodId,product.price);
    })
    res.redirect('/cart')
}
exports.postCartDeleteProduct = (req,res,next) =>{
    const prodId = req.body.productId;

    Product.findById(prodId , product=>{
        console.log(prodId,product.price)
        Cart.deleteProduct(prodId , product.price);
        res.redirect('/');
    });

};
exports.getOrders = (req,res,next)=>{
    res.render('shop/orders',{
        pageTitle:'Your Orders',
        path:'/orders'        
    });
}

exports.getCheckout = (req,res,next)=>{
     res.render('shop/checkout',{
         path:'/checkout',
         pageTitle:'Checkout'
     })
}
