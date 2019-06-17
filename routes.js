const fs = require('fs');
const requestHandler = (req,res) =>{
    const url = req.url;
    const method = req.method;
    //data
    if(url ==='/'){
        res.write("<html>");
        res.write("<head><title>first page</title></head>");
        res.write("<body><form method='POST' action='/message'><input type='text' name='message'><button type='submit'>send</button></form></body>");
        
        res.write("</html>"); 
        return res.end(); //아래꺼를(write)) 실행시키지 않기 위해 return 함


    }
   

    if(url ==='/message' && method ==='POST'){
        const body =[]; //const지만 push 는됨
        //event 를 받기위해 on 사용
        req.on('data',(chunk)=>{
            console.log(chunk)
            body.push(chunk);
        });
        //return 함으로써 밑에꺼 실행안되게해야함
        return req.on('end',()=>{
            //buffer
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[0];
            //writeFileSync는 동기적으로 실행되므로 밑에로안내려감(blocking)
            fs.writeFile('message.txt',message , (err) =>{
                //file작업이 끝나고 응답 하게 하기 위해 콜백에 넣어줌 
                res.statusCode =302;
                res.setHeader("Location" , '/'); // / 로 다시 보냄
                return res.end();
                //fs 는 worker pool 에게 주고 workpool 작업끝나면
                //event loop 다시부름
            });
        });
    }
    

    // //응답할거의 타입
    // res.setHeader("Content-Type",'text/html');
    // res.write("<html>");
    // res.write("<head><title>first page</title></head>");
    // res.write("<body><h1>first page</h1></body>");

    // res.write("</html>"); 
    // res.end(); //끝났다. 더이상 쓸수없음.
}
module.exports = {
    handler : requestHandler,
    someText :"hi"
}

//module.exports.handler = requestHandler;
//module.exports.someText = "hi";