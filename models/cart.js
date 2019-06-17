const fs =require('fs');
const path =require('path');
const p =path.join(path.dirname(process.mainModule.filename),'data','cart.json');
module.exports= class Cart{
    static addProduct(id,productPrice){
        //fetch 기존 카트 from file
        fs.readFile(p,(err,data)=>{
            let cart ={products:[],totalPrice:0}
            if(!err){
                //있다
                cart = JSON.parse(data);
            }
            //추가하려는 제품과 같은게있나
            //analyze cart , find existing product
                                    //카트의 프로덕트배열의 하나하나씩 id검사
            const existingProductIndex = cart.products.findIndex(prod=>prod.id ===id);
            //존재하는 같은 제품의 인덱스를 받아옴 
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct;
            if(existingProduct){
                //추가하려는 제품과 같은게있으면 갯수만추가
                updatedProduct = {...existingProduct};  //복사된 새객체
                updatedProduct.qty = updatedProduct.qty+1;  //개수만늘림
                cart.products = [...cart.products];  //기존꺼 가져와서
                cart.products[existingProductIndex] = updatedProduct; //갯수만늘린 같은 제품
            }else{
                //새 제품이면 걍 객체 만들어서 추가
                updatedProduct = { id:id , qty:1};                
                cart.products = [...cart.products,updatedProduct]
            }
            cart.totalPrice += +productPrice;
            fs.writeFile(p,JSON.stringify(cart) ,err=>{
                console.log(err)
            })
        })
        
        //add new product increase quantity

    }
    static deleteProduct(id,productPrice){
        //total 가격 도 줄여야하니까
        fs.readFile(p,(err,data)=>{

            if(err) return ;
            //카트 구조 {products : [{id:1,qty:1}] , totalprice:0}
            const updateCart = {...JSON.parse(data)}; //기존카트
            //카트에서 뺴려는거
            const product = updateCart.products.find(prod =>prod.id===id);
            console.log("cart product=" ,product)
            if(!product){
                return;
            }
            
            //갯수
            const productQty = product.qty;

            console.log(updateCart.products.filter(prod=>prod.id !==id))
            updateCart.products = updateCart.products.filter(prod=>prod.id!==id);

            updateCart.totalPrice = updateCart.totalPrice - productPrice*productQty;
            fs.writeFile(p,JSON.stringify(updateCart) ,err=>{
                console.log(err)
            })
        })

    }

    static getProduct(cb){
        fs.readFile(p,(err,data)=>{ 
            const cart =JSON.parse(data);
            if(err) return cb(null);
            cb(cart)
        })
    }

}