var express = require("express");
var fileuploader = require("express-fileupload");
var cloudinary = require("cloudinary").v2
var mysql2 = require("mysql2");

var app = express();
//   AI started
 const { GoogleGenerativeAI } = require("@google/generative-ai");

 const genAI = new GoogleGenerativeAI("AIzaSyDPW4st1KjvwRCwMYS9LUf0f5Jzx7iYYmo");
 const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


app.use(fileuploader());
// ai started connection


app.use(express.static("public"))
app.listen(2007, function () {
    console.log("Server Started at 2007 ")
})
app.use(express.urlencoded({extended:true}));
app.get("/ashima", function (req, resp) {
    resp.contentType("text/html");
    resp.write("<i>hleooooo</i>");
    resp.write("<b>Ashima</b>");
    resp.end();
})
app.use(express.static("public"));

app.get("/hlo", function (req, resp) {
    resp.contentType("text/html");
    resp.write("<i>signup here</i>");
    resp.write("<h2>Welcome Again</h2>");
    resp.end();
})

app.get("/", function (req, resp) {
    console.log(__dirname);
    console.log(__filename);
    let path = __dirname + "/public/index.html";
    resp.sendFile(path);

})

app.get("/org", function (req, resp) {
    console.log(__dirname);
    // console.log(__filename);
    let path = __dirname + "/public/org-details.html";
    resp.sendFile(path);
});
app.get("/events", function (req, resp) {
    console.log(__dirname);
    // console.log(__filename);
    let path = __dirname + "/public/post-tournaments.html";
    resp.sendFile(path);
});

app.get("/manage", function (req, resp) {
    console.log(__dirname);
    // console.log(__filename);
    let path = __dirname + "/public/tournaments manager.html";
    resp.sendFile(path);
});
app.get("/profile", function (req, resp) {
    console.log(__dirname);
    // console.log(__filename);
    let path = __dirname + "/public/Profile Player.html";
    resp.sendFile(path);
});
app.get("/admin", function (req, resp) {
    console.log(__dirname);
    // console.log(__filename);
    let path = __dirname + "/public/admin-users-console.html";
    resp.sendFile(path);
});
app.get("/players", function (req, resp) {
    console.log(__dirname);
    // console.log(__filename);
    let path = __dirname + "/public/tournamentFinder.html";
    resp.sendFile(path);
});
app.get("/organizers", function (req, resp) {
    console.log(__dirname);
    // console.log(__filename);
    let path = __dirname + "/public/admin-organizers-console.html";
    resp.sendFile(path);
});
app.get("/playersdata", function (req, resp) {
    console.log(__dirname);
    // console.log(__filename);
    let path = __dirname + "/public/playeradmin.html";
    resp.sendFile(path);
});



// app.get("/org-dash",function(req,resp)
// {
//     console.log(__dirname);
//     console.log(__filename);jRIYCYar_DVzvIKCKq8mdvcKar0
//     resp.sendFile(path);

// })
// -----------------------------------------------------------------------------------------------------------


cloudinary.config({
    cloud_name: 'dmrvmcaz9',
    api_key: '727978713994531',
    api_secret: 'jRIYCYar_DVzvIKCKq8mdvcKar0'

});
// -------------------------------------------------------------------
// Aiven Part

let dbConfig = "mysql://avnadmin:AVNS_m0QbLHTrz02ixrUP0u5@mysql-3b2f2840-aroraashima313-9055.c.aivencloud.com:20803/project";
let mySqlVen = mysql2.createConnection(dbConfig);
mySqlVen.connect(function (errKuch) {
    if (errKuch == null)
        console.log("Aiven Connected Successfully!!!");
    else
        console.log(errKuch.message)
})
// -------------------------------------------------------------------------------------------------------
app.get("/server-signup-safe", function (req, res) 
{
    let emailid = req.query.txtEmail;
    let password = req.query.txtPwd;
    let usertype = req.query.comboUser;
    mySqlVen.query("insert into users values(?,?,?,current_date(),1)", [emailid, password, usertype], function (errKuch,result) {
        if (errKuch == null) {
            res.send("Badhaii ho record saved successfully...");
        }

        else
            res.send(errKuch.message);
   
    });
});




// app.post("/server-signup-post", async function (req, resp) {
//    {
//      let picurl="";

//     if(req.files==null)
//     {
//         picurl="no-pic";
//     }

//     else
//     {
//         let fName = req.files.pic.name;
//         let fullPath = __dirname +"/public/uploads/"+fName;
//         req.files.pic.mv(fullPath);

//         await cloudinary.uploader.upload(fullPath).then(function (picUrlResult) {
//             picurl = picUrlResult.url;
//             console.log(picurl);
//         })
//     }

//     // req.body.kuchBhiName=fileName;

//     // resp.send(req.body);
//     // -----------------------------------------------------------------------------------------------


//     let emailid = req.body.txtEmail3;
//     //  console.log(emailid);
//     let orgname = req.body.txtOrg;
//     let regnumber = req.body.txtReg;
//     let address = req.body.txtAdd;
//     let city = req.body.txtCity;
//     let sports = req.body.txtDeal;
//     let website = req.body.txtWeb;
//     let insta = req.body.txtInsta;
//     let head = req.body.txtOrgH;
//     let contact = req.body.txtCon;
//     let otherinfo = req.body.txtOther;



//     mySqlVen.query("insert into organizers values(?,?,?,?,?,?,?,?,?,?,?,?)", [emailid, orgname, regnumber, address, city, sports, website, insta, head, contact, picurl, otherinfo], function (errKuch) {
//         if (errKuch == null)
//             resp.send("Record saved successfully...Badhaai");
//         else
//             resp.send(errKuch.message);
//     })
// }
// })
// --------------------------------------------------------------------------------------------------------------
app.get("/do-login", function (req, resp) {
    let emailid = req.query.txtEmail2;
    let password = req.query.txtPwd2;
    let query = "select * from users where emailid = ? AND password= ?";
    mySqlVen.query(query, [emailid, password], function (err, allRecords) {
        if (allRecords.length == 1) {
            let status = allRecords[0].status;

            if (status == 0)
                resp.send("Blocked");
            else if (status == 1)
                resp.send(allRecords[0].usertype);

        }
        else {
            resp.send("Invalid");
        }
    });
});
// =============================================================================================================
app.post("/update-user", async function(req,resp){
    let picurl="";
    if(req.files==null)
    {
        picurl=req.body.pichide;
        console.log(picurl);
    }

    else
    {
        let fName = req.files.pic.name;
        let fullPath = __dirname +"/public/uploads/"+fName;
         req.files.pic.mv(fullPath);

        await cloudinary.uploader.upload(fullPath).then(function (picUrlResult) {
            picurl = picUrlResult.url;
          //  console.log(picurl);
        })
    }

    let emailid = req.body.txtEmail3;
    //  console.log(emailid);
    let orgname = req.body.txtOrg;
    let regnumber = req.body.txtreg;
    let address = req.body.txtAdd;
    let city = req.body.txtCity;
    let sports = req.body.txtDeal;
    let website = req.body.txtWeb;
    let insta = req.body.txtInsta;
    let head = req.body.txtOrgH;
    let contact = req.body.txtCon;
    let otherinfo = req.body.txtOther;



    mySqlVen.query(" update organizers set orgname=?,regnumber=?,address=?,city=?,sports=?,website=?,insta=?,head=?,contact=?,picurl=?,otherinfo=? where emailid=?", [ orgname, regnumber, address, city, sports, website, insta, head, contact, picurl, otherinfo,emailid], function (errKuch,result) {
        if (errKuch == null)
        {
            if(result.affectedRows==1)
                        resp.send("Record  Update Saved Successfulllyyy....Badhai");
                    else
                        resp.send("Inavlid email Id hai can't be updated");
        }
        else
            resp.send(errKuch.message);
    })
})




//=========================================================================================================================


app.post("/org-details", async function(req,resp){
    let picurl="";
    if(req.files==null)
    {
        picurl="no-pic.jpg";
        console.log(picurl);
    }

    else
    {
        let fName = req.files.pic.name;
        let fullPath = __dirname +"/public/uploads/"+fName;
        req.files.pic.mv(fullPath);

        await cloudinary.uploader.upload(fullPath).then(function (picUrlResult) {
            picurl = picUrlResult.url;
            console.log(picurl);
        })
    }

    let emailid = req.body.txtEmail3;
    //  console.log(emailid);
    let orgname = req.body.txtOrg;
    let regnumber = req.body.txtreg;
    // console.log(regnumber);
    let address = req.body.txtAdd;
    let city = req.body.txtCity;
    let sports = req.body.txtDeal;
    let website = req.body.txtWeb;
    let insta = req.body.txtInsta;
    let head = req.body.txtOrgH;
    let contact = req.body.txtCon;
    let otherinfo = req.body.txtOther;



    mySqlVen.query("insert into organizers values(?,?,?,?,?,?,?,?,?,?,?,?)", [emailid, orgname, regnumber, address, city, sports, website, insta, head, contact, picurl, otherinfo], function (errKuch) {
        if (errKuch == null)
            resp.send("Record saved successfully...Badhaai");
        else
            resp.send(errKuch.message);
    })
})
// ------------------------------Search---------------------------------------------------------------------
app.get("/get-one",function(req,resp)
{
    console.log(req.query.txtEmail);
        mySqlVen.query("select * from organizers where emailid=?",[req.query.txtEmail3],function(err,allRecords)
        {
            if(allRecords.length==0)
                resp.send("No Record Found");
            else
                resp.json(allRecords);
        })
})
// -------For Post Tournaments.html----------------------------------------------------------
app.get("/server-tournaments", function (req, res) {
    let emailid = req.query.txtEmail4;
      let event = req.query.txtEvent;
    let doe = req.query.txtDate;
    let toe = req.query.txtTime;
    let address = req.query.txtLoc;
    let city = req.query.txtCity2;
    let sports = req.query.comboCategory;
    let minage = req.query.txtMin;
    let maxage = req.query.txtMax;
    let lastdate = req.query.txtDate2;
    let fee = req.query.txtFee;
    let prize = req.query.txtPrize;
    let contact = req.query.txtCon2
    mySqlVen.query("insert into tournaments values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [null,emailid,event,doe,toe,address,city,sports,minage,maxage,lastdate,fee,prize,contact], function (errKuch, result) {
        if (errKuch == null) {
            res.send("Badhaii ho record saved successfully...");
        }

        else
            res.send(errKuch.message);
    }
    );
})
// -------------------------------------Manage Your Events---------------------------------------------
 app.get("/do-fetch-all-users",function(req,resp)
{
        let emailid = req.query.emailid;
        console.log(emailid);
        mySqlVen.query("select * from tournaments where  emailid = ?",[emailid],function(err,allRecords)
        {
           if(err==null)
                resp.send(allRecords);
            else
                resp.send(err.message);
        })
        // -----------------------------------------------------------------------------------------------------
})


app.get("/delete-one",function(req,resp)
{
    console.log(req.query)
    
    let rid=req.query.rid;

    mySqlVen.query("delete from tournaments where rid=?",[rid],function(errKuch,result)
    {
        if(errKuch==null)
                {
                    if(result.affectedRows==1)
                        resp.send(rid+" Deleted Successfulllyyyy...");
                    else
                        resp.send("Invalid Email id");
                }
                else
                resp.send(errKuch);

    })
})
// -------Profile Players Search------------------------------------------------------------------------------------- 
app.get("/search-one",function(req,resp)
{
    console.log(req.query.txtEmail5);
        mySqlVen.query("select * from players where emailid=?",[req.query.txtEmail5],function(err,allRecords)
        {
            if(allRecords.length==0)
                resp.send("No Record Found");
            else
                resp.send(allRecords);
        })
    })
// ------------------------------Insert--------------------------------------------------------
// to run gemini

 async function RajeshBansalKaChirag(imgurl)
 {
 const myprompt = "Read the text on picture and tell all the information in adhaar card and give output STRICTLY in JSON format {adhaar_number:'', name:'', gender:'', dob: ''}. Dont give output as string."   
     const imageResp = await fetch(imgurl)
        .then((response) => response.arrayBuffer());
    const result = await model.generateContent([
        {
             inlineData: {
                 data: Buffer.from(imageResp).toString("base64"),
                mimeType: "image/jpeg",
            },
         },
         myprompt,
     ]);
    console.log(result.response.text())
            
             const cleaned = result.response.text().replace(/```json|```/g, '').trim();
             const jsonData = JSON.parse(cleaned);
             console.log(jsonData);

     return jsonData

 }
 function convertToMySQLDate(dateStr) {
    if (!dateStr) return null;

    // Replace / with - to normalize
    dateStr = dateStr.replace(/\//g, "-");

    const parts = dateStr.split("-");
    if (parts.length !== 3) return null;

    const [dd, mm, yyyy] = parts;

    // Basic sanity check
    if (yyyy.length !== 4) return null;

    return `${yyyy}-${mm}-${dd}`;
}

app.post("/profile-player", async function(req, resp) {
    let picA = "no-pic.jpg";
    let profile = "no-pic.jpg";
    let jsonData = null; // declare here so it's accessible

    try {
        // Aadhaar Image Upload
        if (req.files && req.files.picA) {
            let fName = req.files.picA.name;
            let fullPath = __dirname + "/public/uploads/" + fName;
            await req.files.picA.mv(fullPath);
            const picUrlResult = await cloudinary.uploader.upload(fullPath);
            picA = picUrlResult.url;
            console.log("picA uploaded:", picA);
            jsonData = await RajeshBansalKaChirag(picA);
            console.log("Extracted JSON:", jsonData);
        }

        // Profile Image Upload
        if (req.files && req.files.profile) {
            let fName = req.files.profile.name;
            let fullPath = __dirname + "/public/uploads/" + fName;
            await req.files.profile.mv(fullPath);
            const profileResult = await cloudinary.uploader.upload(fullPath);
            profile = profileResult.url;
            console.log("profile uploaded:", profile);
        }

        // Now insert into DB
        let emailid = req.body.txtEmail5;
        let name = jsonData?.name || null;
        let formateddob = convertToMySQLDate(jsonData?.dob);
        let gender = jsonData?.gender || null;
        let address = req.body.txtAdd2;
        let contact = req.body.txtContact;
        let game = req.body.txtGame;
        let otherinfo = req.body.txtInfo;

        mySqlVen.query(
            "insert into players values(?,?,?,?,?,?,?,?,?,?)",
            [emailid, picA, profile, name, formateddob, gender, address, contact, game, otherinfo],
            function (errKuch) {
                if (errKuch == null) {
                    resp.send("Record saved successfully...Badhaai");
                } else {
                    resp.send(errKuch.message);
                }
            }
        );
    } catch (err) {
        console.error("Error in /profile-player:", err);
        resp.status(500).send("Something went wrong: " + err.message);
    }
});

// ---------------------------------Update users data--------------------------------------------------
app.post("/update-users-data", async function(req,resp){
    let picA="";
    try{

    
    if(req.files==null)
    {
         picA=req.body.hide;
        console.log(picA);
    }

    else
    {
        let fName = req.files.picA.name;
        let fullPath = __dirname +"/public/uploads/"+fName;
         req.files.picA.mv(fullPath);

        await cloudinary.uploader.upload(fullPath).then( async function (picUrlResult) {
            picA = picUrlResult.url;
          //  console.log(picA);
          jsonData=await RajeshBansalKaChirag(picA);
        })
    }
}
catch
{
    console.log("cloudinary crash");
}


 let profile="";
    if(req.files==null)
    {
        profile=req.body.hidden;
        console.log(profile);
    }

    else
    {
        let fName = req.files.profile.name;
        let fullPath = __dirname +"/public/uploads/"+fName;
         req.files.profile.mv(fullPath);

        await cloudinary.uploader.upload(fullPath).then(function (picUrlResult) {
            profile= picUrlResult.url;
          //  console.log(profile);
        })
    }
        let emailid = req.body.txtEmail5;
    //  console.log(emailid);
    let personname = jsonData.name;
    let dob = jsonData.dob;
    // console.log(regnumber);
    let gender = jsonData.gender;
    let address = req.body.txtAdd2;
    let contact = req.body.txtContact;
    let game = req.body.txtGame;
    let otherinfo = req.body.txtInfo;

//     

    mySqlVen.query(" update players set acardpicurl=?,profilepicurl=?, personname=?,dob=?,gender=?,address=?,contact=?,game=?,otherinfo=? where emailid=?", [picA,profile, personname, dob, gender, address, contact, game,  otherinfo,emailid], function (errKuch,result) {
        if (errKuch == null)
        {
            if(result.affectedRows==1)
                        resp.send("Record  Update Saved Successfulllyyy....Badhai");
                    else
                        resp.send("Inavlid email Id hai can't be updated");
        }
        else
            resp.send(errKuch.message);
    })
})
// ----------------------------------User Admin Console-----------------------------------------------------

 app.get("/do-fetch",function(req,resp)
{
       
        mySqlVen.query("select * from users",function(err,allRecords)
        {
          
                resp.send(allRecords);
           
        })
       
})
// -------------------------------------------------------Admin Console--------------------------------------------------------
app.get("/do-block", function (req, resp) {
    
    let query = "update users set status=0 where emailid=?";
    let emailid=req.query.emailid;
    mySqlVen.query(query, [emailid], function (err, result) {
        if (err==null) 
            {
                    if(result.affectedRows==1)
                        resp.send("Blocked..");
                    else
                        resp.send("Invalid Email id");
                }
                else
                resp.send(err.message);
    });
});
app.get("/do-unblock", function (req, resp) {
    
    let query = "update users set status=1 where emailid=?";
    let emailid=req.query.emailid;
    mySqlVen.query(query, [emailid], function (err, result) {
        if (err==null) 
            {
                    if(result.affectedRows==1)
                        resp.send("unBlocked..");
                    else
                        resp.send("Invalid Email id");
                }
                else
                resp.send(err.message);
    });
});
// ------------------------------Player's Console-------------------------------------------------------------------
//
app.get("/do-get-data",function(req,resp)
{
       
        mySqlVen.query("select * from organizers",function(err,allRecords)
        {
          
                resp.send(allRecords);
           
        })
       
})
app.get("/delete-your-data",function(req,resp)
{
    console.log(req.query)
    
    let emailid=req.query.emailid;

    mySqlVen.query("delete from organizers where emailid=?",[emailid],function(errKuch,result)
    {
        if(errKuch==null)
                {
                    if(result.affectedRows==1)
                        resp.send(emailid+" Deleted Successfulllyyyy...");
                    else
                        resp.send("Invalid Email id");
                }
                else
                resp.send(errKuch);

    })
})
//-----------------------------------Show Records in Cards----------------------------------------------------

app.get("/fetch-all",function(req,resp)
{
        mySqlVen.query("select * from tournaments where city=? and sports=?",[req.query.kuchCity,req.query.kuchGame],function(err,allRecords)
        {
           resp.send(allRecords);
        })
})
// ---------------------------------------------------------------------------------------------------
//
 app.get("/delete-all",function(req,resp)
{
    console.log(req.query)
    let emailid=req.query.emailidKuch;;
    let pwd=req.query.pwdKuch;

    mySqlVen.query("delete from tournaments where emailid=? and pwd=?",[emailid,pwd],function(errKuch,result)
    {
        if(errKuch==null)
                {
                    if(result.affectedRows==1)
                        resp.send(emailid+" Deleted Successfulllyyyy...");
                    else
                        resp.send("Invalid Email id");
                }
                else
                resp.send(errKuch);

    })
})



app.get("/do-get",function(req,resp)
{
       
        mySqlVen.query("select * from players",function(err,allRecords)
        {
          
                resp.send(allRecords);
           
        })
       
})
app.get("/delete-data",function(req,resp)
{
    console.log(req.query)
    
    let emailid=req.query.emailid;

    mySqlVen.query("delete from players where emailid=?",[emailid],function(errKuch,result)
    {
        if(errKuch==null)
                {
                    if(result.affectedRows==1)
                        resp.send(emailid+" Deleted Successfulllyyyy...");
                    else
                        resp.send("Invalid Email id");
                }
                else
                resp.send(errKuch);

    })
})

// -------------------------------------------Change Password in Settings-------------------------------------------------
app.get("/do-change-password",  function(req,resp){
   
    let emailid=req.query.emailid;
    let oldpwd=req.query.oldpwd;
    let newpwd=req.query.newpwd;

    console.log(emailid);
    console.log(oldpwd);
    console.log(newpwd);
    mySqlVen.query(" update users set password=? where emailid=? and password=?", [newpwd,emailid,oldpwd], function (errKuch,result) {
        if (errKuch == null)
        {
            if(result.affectedRows==1)
                        resp.send("Password changed successfully...Congratulations");
                    else
                        // resp.send("Try again.. some error in either emailid or password");
                    resp.send("Try again some error in emailid or password");
        }
        else
            resp.send(errKuch.message);
    })
})
    // -------------------------------------------------------------------------------------------------------
    app.get("/fetch-all-cities",function(req,resp)
{
       
        mySqlVen.query("select distinct city from tournaments",function(err,allRecords)
        {
          
                resp.send(allRecords);
           
        })
       
})
app.get("/fetch-all-sports",function(req,resp)
{
       
        mySqlVen.query("select distinct sports from tournaments",function(err,allRecords)
        {
          
                resp.send(allRecords);
           
        })
       
})




