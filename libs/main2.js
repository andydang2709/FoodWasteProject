function getMenuList(){    
    ofweek = "Fullmenu";
    var foodlist;
        $.ajax({
            url : "menu.php",
            type : "post",
            dataType:"json",
            async: false,
            data : {
                dayOfWeek: ofweek                        
            },
            success : function (myresult) { 
                foodlist = myresult;
                }
        });
return foodlist;
}

function list(item,cate,opto) {
    html1 = "<section id = '" + cate + "'><div class='main-body-menu'>";    
    rating = "<div class='stars-outer'><div class='stars-inner'></div></div>";
    if (opto==1) { html1 = "<section id = '" + cate + "'><h2>Menu for " + cate + "</h2><div class='main-body-menu'>"; }
    html2 = "</div></section>";
    html="";
if (opto==0) {
    for (i in item) { if (item[i].cate==cate) 
        { html = html + "<div class='" +item[i].foodid+ "'><img src='libs/img/menu/" + item[i].foodid + ".jpg'> <div class='text'><p class='normal'>" + item[i].name + "</p><p class='normal'>" + Formatnumber(item[i].price) + " VND</p></div>";
        html = html + rating + "<div class='overlay' onclick='reviews(`" +item[i].foodid+ "`)'><div class='text'>Review & Ratings</div></div></div>"; } }
    } else { for (i in item) { if (item[i].date==cate) 
        { 
        html = html + "<div class='" +item[i].foodid+ "'><img src='libs/img/menu/" + item[i].foodid + ".jpg' onclick='reviews(`" +item[i].foodid+ "`)'><div class='text'>"+rating+"<p class='normal'>" + item[i].name + "</p><p class='normal'> " + Formatnumber(item[i].price) + " VND</p></div>"; 
        html = html + "<div class='textcart'><div class='cart' onClick='updateOrders(``,`"+item[i].foodid+ "`, 1)'></div></div>";
        html = html + "</div>";
        }
        }    
    }   
        
    html = html1 + html + html2    

    return html;
}

function loadmenu() { document.getElementById("main").innerHTML = ihtml; ratingUpdate();}

function cal_change(n,thisMonth){
    htm = myCalendar(n,thisMonth);
    document.getElementById("mycal").innerHTML = htm;    
}

function myCalendar(n,thisMonth) {
    var d = new Date();
    var cY = d.getMonth()+"/"+d.getFullYear();
    var newDate = new Date(d.getFullYear(),d.getMonth(),1); 
        /* not current day */
    if (thisMonth == 0) {	
        var month = document.getElementById("cmonth").innerText;
        var month = months.indexOf(month)+n;
        var year = document.getElementById("cyear").innerText;
        var newDate = new Date(year, month,1);    
    }    
    htm = '<div class="cal-wrapper"><div class="cal-panel">';
    htm = htm + '<div style="text-align:center;"><span id="prev" class="prev" onclick="cal_change(-1,0)">&#10094;</span>';
    htm = htm + '<span id ="cmonth" style="padding-right: 5px; font-size:16px">' + months[newDate.getMonth()] + '</span><span id ="cyear" style="font-size:16px">' + newDate.getFullYear() + '</span>';
    htm = htm + '<span id="next" class="next" onclick="cal_change(1,0)">&#10095;</span></div>';
    htm = htm + '<div class="grid-day"><div class="box" id="disable">M</div><div class="box" id="disable">T</div><div class="box" id="disable">W</div><div class="box" id="disable">T</div><div class="box" id="disable">F</div>';
    htm = htm + '<div class="box" id="disable">S</div><div class="box" id="disable">S</div>';
    htm = htm + display_ByMonth(newDate) + '</div></div></div>';
return htm;
}

function display_ByMonth(d1) {    
    /* Current dates */
    var d2 = new Date();
    var d2 = new Date(d2.getFullYear(),d2.getMonth(),d2.getDate());
    var t2 = d2.getTime();
    
    /* New current dates begin of month (day 1) */
    var i1 = d1.getDay(); /* 0-6 */
    var m1 = d1.getMonth();
    var y1 = d1.getFullYear();
    var t1 = d1.getTime();
    
    var a = daysInMonth(m1+1,y1);
    
    if (i1==0) {i1=6;} else {i1--}
    
    ml = "";
    for (n=1; n<=i1; n++){ ml = ml + '<div class="box" id="disable"></div>'; }		
    k = n;
    for (j = 1; j<=a; j++){
        var d3 = new Date(y1, m1, j);
        var i3 = d3.getDay(); /* 0-6 */
        var t3 = d3.getTime();
        txtId = "day" + k;
        if (t3<=t2) { 
            if (t2==t3) { ml = ml + "<div id = 'disable' class='box today'>" + j + "</div>";}
            else { ml = ml + '<div class="box" id = "disable">' + j + "</div>";}
            } else {
            if (i3==6||i3==0) { 
                ml = ml + '<div class="box" id = "disable">' + j + "</div>";
                } 
            else {
                dad = j + "/" + (d3.getMonth() + 1) + "/" + d3.getFullYear();                
                dad = isCart(dad);
                iii = "`" + txtId + "`";
                if (dad == true) { ml = ml + "<div class='box has-order' id = '" + txtId + "' onClick='getMenu(" +iii+ ")'>" + j + "</div>";} else {
                ml = ml + "<div class='box' id = '" + txtId + "' onClick='getMenu(" +iii+ ")'>" + j + "</div>"; }
                
            }
            }
            k++;
        }
        for (m=k;m<=42;m++) {
            ml = ml + '<div class="box" id="disable">&nbsp</div>';
        }        
return ml;
}

function popupShow(divid,modalname,popupcontent) {
    $(divid).load(popupcontent);
    document.getElementById(modalname).style.display = "block";
}

function isCart(i_Date){    
    _ret = false;
    _order = sessionStorage.getItem("orders");
    if (_order!="") {
        _order = JSON.parse(_order);
        if (_order.length > 0) {
            for (iii=0; iii < _order.length; iii++) { if (_order[iii].day  == i_Date) { return true;} } 
            }    
        }
return _ret; }

function getFoodMame(id) {
    retHtm = [];
    for (imn in myObj) {
        if (myObj[imn].foodid==id) {
            retHtm[0] = myObj[imn].name;
            retHtm[1] = myObj[imn].price ;
            retHtm[2] = myObj[imn].description ;
            retHtm[3] = myObj[imn].consumerReviews ;
            retHtm[4] = myObj[imn].consumerRatings ;
         }
    }
return retHtm; }

function codeGen(n) {
    var str = "Q0WE1R2TY3UI5OP4A6SD7FG8HJKLZX9CVBNM";                
    PIN="";
    for (i=1;i<=n;i++){
        index = Math.floor(Math.random()*36);
        PIN = PIN + str.charAt(index);
    }
return PIN; }

function cardVerify(){    
    var carNo = document.getElementById("retypeMealcard").value;
    if (carNo=="") {
        document.getElementById("errormsg").innerHTML = "Please enter your meal card number"; return false } else {
        /* isCardvalid = API to check with food vendor*/
        isCardvalid = true;

        if (!isCardvalid) { 
            document.getElementById("errormsg").innerHTML = "Card validation failed. Please make sure that your card number links with e-mail your registered with this system";
        }
        else {
            document.getElementById("errormsg").innerHTML = "Please wait while system is validating your personal information...";
            code = codeGen(6);
            codeSender(code);
            document.getElementById("pin").innerHTML = code;
            document.getElementById("proceed").disabled = true;
            document.getElementById("retypeMealcard").disabled = true;
            document.getElementById("pincode").style.visibility = "visible";
            document.getElementById("finish").style.visibility = "visible";
        }
    return true;}
}

function finishOrder(){
    code = document.getElementById("pin").innerHTML;
    tmp = document.getElementById("pincode").value;    
    if (code!=tmp) { document.getElementById("errormsg").innerHTML = "Verification code is not valid - "+code;} else { updateOrder(); }
}

function codeSender(iCode){
    var userinfo = sessionStorage.getItem("userInfo");
        userinfo = JSON.parse(userinfo);
        email = userinfo.email;
        fullname = userinfo.Fullname;
        $.ajax({
            url : "sendCode.php",
            type : "post",
            dataType:"html",
            async: false,
            data : {
                Code: iCode,
                Userid: email,
                Fullname: fullname
            },
            success : function (result) {
                document.getElementById("errormsg").innerHTML = "Card validation successfully. Please check your email to get PIN.";
                }
        });
}

function updateOrder(){
    
    var userinfo = sessionStorage.getItem("userInfo");
        userinfo = JSON.parse(userinfo);
        userinfo = userinfo.email;
    var order = sessionStorage.getItem("orders");

    $.ajax({
        url : "updateOrder.php",
        type : "post",
        dataType:"html",
        async: false,
        data : {
            orderNumber: codeGen(10),
            orderItem: order,
            userInfo: userinfo
        },
        success : function (result) {            
            sessionStorage.setItem("cart",0);
            sessionStorage.setItem("orders","");
            document.getElementById("myorder").innerHTML="";
            document.getElementById("cartcount").innerHTML="";
            document.getElementById("myshoppingcart").style.display = "none";
            document.getElementById("cartModal").style.display = "none";
            loadmenu();
        }
    });
}

function ratingUpdate() {
    var myresult = sessionStorage.getItem("foodRatings");
    if (myresult=="") {    
        $.ajax ({
            url : "getRatings.php",
            type : "post",
            dataType:"html",
            async: false,
            success : function (myresult){    
                sessionStorage.setItem("foodRatings",myresult);
            }
    })}
    
    myresult = sessionStorage.getItem("foodRatings");
    if (myresult!="") {
            myresult = JSON.parse(myresult);
            
            ratings = "";
                    for (k = 0; k<myresult.length; k++) {
                        rate = myresult[k].ratings;
                        rate = rate.split(",");
                        total=0;
                        for (i = 0; i < rate.length; i++) { total = total + parseInt(rate[i]); }
                        ratings = ratings + '"' + myresult[k].foodid + '" : ' + total/rate.length + ',';
                    }
                        ratings = "{" + ratings.substr(0, ratings.length-1) +"}" ;                        
                        ratings = JSON.parse(ratings);
                        const starTotal = 5;

                        for (rating in ratings) {
                                const starPercentage = (ratings[rating] / starTotal) * 100;    
                                const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;    
                                document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded; 
                            }
    }
}

function voteRatings(id){        
    for (i = 1; i<=5; i++) {
      xx = document.getElementById(i).classList.remove("themsao");          
      document.getElementById(i).innerHTML="&#xf006;";
    }
    n = parseInt(id);
    for (i = 1; i<=n; i++) {
      xx = document.getElementById(i).classList.add("themsao");          
      document.getElementById(i).innerHTML="&#xf005;";
    }
    
    document.getElementById("myrating").value = id;    
}