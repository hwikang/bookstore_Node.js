
//products를 파일로저장

const fs = require('fs');
const path = require('path')
//p는 product.json
const p = path.join(path.dirname(process.mainModule.filename),'data','products.json')
const Cart = require('./cart')
//helper function
//데이터를 가져오고 가져온 데이터를 매개변수로 callback 실행
const getProductsFromFile = callback =>{            
     fs.readFile(p,(err,data)=>{
        if(err){
           callback([]);
        }else{
           callback(JSON.parse(data)) ; //콜백실행
        }
    });
}

module.exports = class Product{
    constructor(id,title,imageUrl,description,price){
        this.id = id; 
        this.title = title;
        this.imageUrl =imageUrl;
        this.description = description;
        this.price = price;
    }
    //method
    //save 전에 아이디 추가
    save(){ //새등록 , 수정모두 사용하려함

        getProductsFromFile(products => {
            if(this.id){ // 수정의 경우 id가존재함
                const existingProductindex = products.findIndex(prod =>prod.id===this.id)
                const updatedProducts = [...products];
                //수정하려는 제품
                updatedProducts[existingProductindex] = this;
                fs.writeFile(p,JSON.stringify(updatedProducts), err=>{  //stringfy = json 으로바꿈
                    console.log(err);
                });
            }else{ //새로 생성의경우
                this.id = Math.random().toString();
                products.push(this) //this = product instance
                //arrow 의 this는 상위 this = class
                //save 하기전 title을 지정해줬음
                fs.writeFile(p,JSON.stringify(products), err=>{  //stringfy = json 으로바꿈
                    console.log(err);
                })
            }
        });
       
            
    }
    //static 은 클래스의 특성?
    static fetchAll(callback){  //product 를 콘트롤러에 줘야함
        //데이터가지고 callback 실행
        getProductsFromFile(callback)
        
    } 
    //해당 프로덕트 가져와서 콜백실행
    static findById(id,cb){
        //모든 프로덕트가져와서
        getProductsFromFile(products =>{
            //id 맞는거 가져오기
            //find 메소드                각각의 id가져와서 맞는거찾으면 리턴
            const product = products.find(p => p.id===id)
            cb(product);
        });
    }     
    static delete(id){
        getProductsFromFile(products=>{
            const product = products.find(prod=>prod.id===id)
            const deleteProductIndex = products.findIndex(p=>p.id===id);
            products.splice(deleteProductIndex,1)  //상품파일에서 뺴고
            fs.writeFile(p,JSON.stringify(products), err=>{ 
                console.log(err);
                if(!err) {
                    //카트에서도 뺴버림
                    Cart.deleteProduct(id,product.price)
                }
            });
        });
    }  
}