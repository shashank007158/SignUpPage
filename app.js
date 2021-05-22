//jshint esversion:6
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res)
{
  res.sendFile(__dirname +"/home.html");
});
app.post("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.post("/signup",function(req,res)
{
  const f_name=req.body.firstname;
  const l_name=req.body.lastname;
  const email=req.body.email;
  const data={
    members:[{
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:f_name,
        LNAME:l_name
      }
    }]
  };

  const url="https://us6.api.mailchimp.com/3.0/lists/65fda254c0";
  const options={
    method:"POST",
    auth:"shashank1:694e85d5aee8ff00775e50993b0cf1fe-us6"
  };
  const jsonData=JSON.stringify(data);

const request=  https.request(url,options,function(response)
{
  response.on("data",function(data)
{
  console.log(JSON.parse(data));
  if(response.statusCode===200)
  {
    res.sendFile(__dirname+"/success.html");
  }
  else{
    res.sendFile(__dirname+"/failure.html");

  }
});
});
request.write(jsonData);
request.end();
});
app.post("/failure",function(req,res)
{
  res.redirect("/");
});
app.listen(process.env.PORT || 3000,function()
{
  console.log("Server is started on port 3000");
});
//

//
