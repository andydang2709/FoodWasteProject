        function makeChart(whereDIV) {
            $.getJSON("data.json", function(myObj){
                var data = new Array;
                var label = new Array;
                avr = myObj.average_pre_year;        
                avr1 = 0;
                m = 0;
                for (i in myObj.chartData) {
                    label[i] = myObj.chartData[i].month ;
                    monthlywaste = 0;
                    k=0;
                    for (j in myObj.chartData[i].weight) {
                            monthlywaste+= myObj.chartData[i].weight[j];
                            k = k+1;
                    }               
                        data[i] = 100*((monthlywaste/k)/avr);
                        avr1 = avr1 + data[i];
                        m = m + 1;
                }
                    avr1 = 100 - avr1/m;
                    document.getElementById("reduce").innerHTML = avr1.toPrecision(3) + "<sup>%</sup>";

                var ctx = document.getElementById(whereDIV).getContext('2d');
                var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: label,
                    datasets: [{
                        label: 'BIS Food waste by month',
                        data: data, 
                        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(192, 0, 0, 1)'],
                        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(192, 0, 0, 0.2)'],
                    }]
                },
                options: {
                    scales: { yAxes: [{ ticks: { beginAtZero: true } }] }
                }

                });        
            });
        }

        function showMeup(sectionname,classid) {
            var cateoffood = ['Rice','Stir_Noodle','Noodle','Salad'];
            for (i=0;i<4;i++){
                document.getElementById(cateoffood[i]).style.display='none';
                var element = document.getElementById("i"+cateoffood[i]);
                element.classList.remove("act");
            }
            var x = document.getElementById(sectionname);
                x.style.display='block';
            var element = document.getElementById("iHome");
                element.classList.remove("act");
            var element = document.getElementById(classid).classList.add("act");            
        }        
               
        function getMenu(idtxt){            
            curDIV = document.getElementById("curID").value;
            if (curDIV!="0") { document.getElementById(curDIV).classList.remove('active'); }
            
            document.getElementById(idtxt).classList.add('active');
            document.getElementById("curID").value = idtxt;

            var weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            d = document.getElementById(idtxt).innerHTML;
            m = months.indexOf(document.getElementById("cmonth").innerHTML)+1; /*month 0-9 => +1  */
            y = document.getElementById("cyear").innerHTML;
            var y = y + "/" + m + "/" + d;
            var date1 = new Date(y);        
            var thu = date1.getDay();            
            
            document.getElementById("cur_date").value = date1.getDate()+"/"+(1+date1.getMonth())+"/"+date1.getFullYear(); 
            
            daymenu = list(myObj,weekday[thu],1);
            document.getElementById("fullmenu").innerHTML = daymenu;
            ratingUpdate();
        }          
        
        function daysInMonth (month, year) { return new Date(year, month, 0).getDate(); }

        function Formatnumber(num)
        {
            var num_parts = num.toString().split(".");
            num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return num_parts.join(".");
        }
        
        function signUp(){
			
		if ($('#Userpassword').val()!=$('#retypePass').val()){
			document.getElementById("sign_up_result").innerHTML= "Password does not match. Please try again.";
			return false
		} else {
            $.ajax({
                    url : "signUp.php",
                    type : "post",
                    dataType:"html",
                    async: false,
                    data : {
                        Userid: $('#Userid').val(),
                        Userpassword: $('#Userpassword').val(),
                        Fullname: $('#Fullname').val(),
                        Phone: $('#Phone').val(),
                        Form: $('#Myclass').val()                        
                    },
                    success : function (myresult){
                        if (myresult=="OK") {
                            $('#account').load('header.html #loginform');
							toggleShow("#userlog");
							popupShow('#aboutme','aboutModal','header.html #signupconfirm');
                        }
                        else { $('#sign_up_result').html(myresult);}
                    }
            });            
            return false
        }}

        function logIn(){
                $.ajax({
                    url : "signIn.php",
                    type : "post",
                    async: false,
                        dataType:"html",
                        data : {
                            userid : $('#userid').val(),
                            userpassword: $('#userpassword').val()						
                            },
                        success : function (result){
                            if (result=="NOT") { $('#login_result').html("Incorect user name, password or account has not yet been activated"); }
                            else {                                
                                sessionStorage.setItem("userInfo",result);                                
                                userInfo = sessionStorage.getItem("userInfo");
                                userInfo = JSON.parse(result);
                                htm = '<div class="login-body"><div ><img class="center" src="libs/img/signup.jpg" width="50%"><p class="center"><button class="full" onClick="logOut();">Log Out</button></p></div><div class="login-content">';
                                htm = htm + '<span class="login-close" onclick="toggleShow(`#userlog`)">&times;</span>';
                                htm = htm + "<p>Account: " +userInfo.email+ "</p>" + "<p>Name: " + userInfo.name+ "</p>" + "<p>Form: " + userInfo.form+ "</p>";
                                htm = htm + "<button class='full' onclick='userUpdate()'>Account Update</button><button class='full' onclick='loadOrderHistory()'>Orders History</button></div></div>";
                                $('#account').html(htm);
                                toggleShow("#userlog");
                                }                                
                            }
                        });
            return false
        }
		
		function passRecovery(){
                $.ajax({
                    url : "forgetPassword.php",
                    type : "post",
                    async: false,
                        dataType:"html",
                        data : { Userid : $('#userid').val() },
                        success : function (result){
                            if (result=="NOT") { $('#login_result').html("User does not exist"); }
                            else {
								$('#account').load('header.html #loginform');
								toggleShow("#userlog");
                                popupShow('#aboutModal','aboutModal','header.html #resetPass');
                                }
                            }
                        });
            return false
        }

        function userUpdate(){
            userInfo = sessionStorage.getItem("userInfo");
            userInfo = JSON.parse(userInfo);
            toggleShow("#userlog");
            toggleShow("#userupdate");
            document.getElementById("useremail").value = userInfo.email;
            document.getElementById("name").value = userInfo.name;
            document.getElementById("phone").value = userInfo.phone;
            document.getElementById("form").value = userInfo.form;
            document.getElementById("password").value = userInfo.password;
            document.getElementById("retypePass").value = userInfo.password;
            document.getElementById("activePass").value = userInfo.password;
        }
        
        function confirmChange(){            
            if ($('#password').val()!=$('#retypePass').val()) {
                document.getElementById("change_result").innerHTML="Password does not match!";
                return false } else {                    
            $.ajax({
                url : "changeUserInfo.php",
                type : "post",
                async: false,
                    dataType:"html",
                    data : { 
                        Userid : $('#useremail').val(),
                        Username : $('#name').val(),
                        Userphone : $('#phone').val(),
                        Userform : $('#form').val(),
                        Activepass: $('#activePass').val(),
                        Userpass : $('#password').val()
                    },
                success : function (result){ toggleShow("#userupdate");logOut(); }
            });
        return false; }
        }

        function logOut() {
                $('#account').load('header.html #loginform');
                
                sessionStorage.clear();
                sessionStorage.setItem("cart",0);
                sessionStorage.setItem("orders","");
                sessionStorage.setItem("userInfo","");
                
                document.getElementById("myorder").innerHTML="";
                document.getElementById("cartcount").innerHTML="";
                document.getElementById("myshoppingcart").style.display = "none";
                loadmenu();                
        }
                               
        function updateOrders(day,id,quan) {
                var myOrders = sessionStorage.getItem("orders");
                var cartcount = parseInt(sessionStorage.getItem("cart"));
                if (day=="") { day = document.getElementById("cur_date").value; }
                var item = "";
                var orderExist = false;
                var itemExist = false;
                var k = 0;
                var n = 0;
                if (myOrders=="") {myOrders=[]} else {myOrders = JSON.parse(myOrders);}
              
                for (i in myOrders) { if (myOrders[i].day==day) { orderExist = true ; break; }; k++;}
                if (!orderExist) { item = '{"day":"' +day+ '","food":[{"id":"' +id+ '","quantity":' +quan+ '}]}'; item = JSON.parse(item); myOrders.push(item); cartcount++;} else {
                  for (j in myOrders[k].food) {
                    if (myOrders[k].food[j].id==id) { 
                        item = myOrders[k].food[j].quantity = quan;
                        itemExist =  true;                        
                        break };
                    n++; }
                    if (!itemExist) { item = '{"id":"' +id+ '","quantity":' +quan+ '}'; item = JSON.parse(item); myOrders[k].food.push(item); cartcount++; }
                }  
                orders = JSON.stringify(myOrders);
                sessionStorage.setItem("orders",orders);
                sessionStorage.setItem("cart",cartcount);
                
                idtxt = document.getElementById("curID").value ;
                document.getElementById(idtxt).classList.add('has-order');                

                document.getElementById("cartcount").innerHTML = "Cart[" + cartcount + "]: Finish Order>>";
                if (cartcount == 0){document.getElementById("myshoppingcart").style.display = "none"; } else {document.getElementById("myshoppingcart").style.display = "block";}
        }            
                        
        function amountCal(quantity,price,code,dayday){
                qCode= "q"+code;
                if (code!="total") { quantity = parseInt(document.getElementById(qCode).innerHTML)+quantity;
                    if (quantity<0) {quantity = 0} else {if (quantity>9){quantity=9}}
                    document.getElementById(qCode).innerHTML = quantity;
                }

                newAmount = quantity*price;

                if (price!=0) {
                    newCode = "amount"+code;
                    document.getElementById(newCode).innerHTML = newAmount;                    
                    updateOrders(dayday,code,quantity);
                    }

                aa = document.getElementsByClassName("amountCal");
                totalAmount = 0;
                for (i=0; i<aa.length;i++) {
                    totalAmount = totalAmount + parseInt(aa[i].innerHTML);
                }
                document.getElementById("total").innerHTML = Formatnumber(totalAmount);
                               
                if (quantity==0) {
                    document.getElementById(code).classList.add("deleted-item");                    
                }
                else { if (price!=0) {document.getElementById(code).classList.remove("deleted-item"); }}
        }

        function getCart(outPut) {
                var orders = sessionStorage.getItem("orders");                
                orders = JSON.parse(orders);               
                htm = '<div class="login-body"><span style="font-size: 80px; text-align: center" class="fa fa-cart-plus"><p class="center">Your Shopping Cart</p></span>';
                htm = htm + '<div class="login-content"><span class="login-close" onclick="toggleShow(`#cartModal`)">&times;</span><div id="userinfo"></div>';
                htm = htm + "<div class='orders'><div>Dish</div><div>Quantity</div><div>Price</div><div>Anount</div>";
                for (i in orders ) {
                    htm = htm + "<div class='item1'>" + orders[i].day + "</div>";
                        j = 0;
                        for (k in orders[i].food) {
                            code = orders[i].food[j].id;
                            quan = orders[i].food[j].quantity;
                            ff = getFoodMame(code);
                            fName = ff[0];
                            price = ff[1];
                            delClass="";
                            if (outPut=="view") {
                                if (quan == 0) { delClass = "deleted-item"}
                                    htm = htm + "<div class='foodCode " +delClass+ "' id='" + code +"'>" + fName + "</div><div><span class='fa adjust-icon' onclick= 'amountCal(-1," + price +",`" +code+ "`,`" +orders[i].day+ "`)'>&#xf056;"
                                    htm = htm + "</span><span class='foodQuantity' id='q" +code+ "'>" + quan +"</span><span class='fa adjust-icon' onclick='amountCal(1," + price +",`" +code+ "`,`" +orders[i].day+ "`)'>&#xf055;</span></div>";

                                    htm = htm + "<div id='foodPrice'>" +price+ "</div><div class='amountCal' id ='amount" + code + "'>" + price*quan +"</div>";
                            } else { /*check out*/
                                if (quan > 0) { 
                                    htm = htm + "<div>" +fName+ "</div><div><input disabled class='foodQuantity' type='number' min='0' max='9' value=" +quan+ "></input></div>";
                                    htm = htm + "<div>" +price+ "</div><div class='amountCal' id ='amount" + code + "'>" + price*quan +"</div>";
                                }
                                } 
                            j++;
                        }
                }
                htm = htm + "<div class='item2'>Total order in VND </div> <div id='total' style='font-size: 16px; font-weight: bold;'>&nbsp</div></div>";
                htm = htm + '<div class="login-footer" style="text-align: right;"><button id="checkout" onclick="checkOut()">Check Out</button><button onclick="toggleShow(`#cartModal`)">Keep shopping</button></div>';
                htm = htm +"</div></div>";                
            return htm; }
            
            
            function viewCart(){
                document.getElementById("myorder").innerHTML = getCart("view");
                amountCal(1,0,"total","");
                
                document.getElementById("checkout").style.visibility="visible";
                document.getElementById("cartModal").style.display = "block";
            }

            function inlineLogin() {
                span = document.getElementById("cartModal");
                span.style.display = "none";
                toggleShow('#userlog');
                document.getElementById("userid").focus();
            }
            
            function checkOut() {
                document.getElementById("checkout").style.visibility="hidden";
                userInfo = sessionStorage.getItem("userInfo");                
                htm = "<h2>Account details</h2><p>";
                if (userInfo=="") {htm = htm + "You need to login in order to proceed checkout and payment (your shoppimg cart remains after login)<span><button type='button' onclick='inlineLogin()'>Sign In | Sign Up</button></span>"; 
                    } 
                else {                    
                    userInfo = JSON.parse(userInfo);
                    htm = htm + "Account: " +userInfo.email+ "</p>" + "<p>Name: " + userInfo.name+ "</p>" + "<p>Form: " + userInfo.form+ "</p>";
                    htm = htm + "<p>Order date: " + new Date() + "</p>";
                    htm = htm + "<h2>Payment Verification</h2><p>";
                    htm = htm + "<input id='retypeMealcard' placeholder='Your meal card #' required>&nbsp&nbsp<button class='full' id='proceed' onClick='return cardVerify()'>Submit</button>"; 
                    htm = htm + "<input id ='pincode' type='text' placeholder='PIN' style='visibility: hidden' required><button class='full' id='finish' onClick='finishOrder()' style='visibility: hidden'>Finish order</button>";
                    htm = htm + "<div id='errormsg'></div><div class='mySlides' id='pin'></div>";
                }                
                
                htm = htm + "<h2>Order summary</h2>";
                document.getElementById("userinfo").innerHTML = htm;
                amountCal(1,0,"total","");                
            }

            function showSlides(foodID,cateID) {
                var x = document.getElementsByClassName(cateID);
                for (j=0; j<x.length; j++)
                    {
                        x[j].style.display = "none";
                    }
                var x = document.getElementById(foodID);
                x.style.display = "block";
            }

            function navFunction() {
                if (window.pageYOffset >= sticky) {
                    navbar.classList.add("sticky");                    
                    document.getElementById("myshoppingcart").style.top = "95%";
                } else {
                    navbar.classList.remove("sticky");
                    document.getElementById("myshoppingcart").style.top = "47%";
                }
            }

            function myCounter(n,place){
                var max = document.getElementById("tien").innerHTML;
                max = max.replace(/[^\d\.\-eE+]/g, "");
                max = parseInt(max,10);          
                if (max<n) { max=max+1000;
                    document.getElementById("tien").innerHTML=Formatnumber(max);
                }
                else {                    
                    clearInterval(xx);
                }
            }

            function ordersHistory(){
                var _ret="";
                useremail = sessionStorage.getItem("userInfo");
                useremail = JSON.parse(useremail);
                userEmail = useremail.email;
                $.ajax({
                    url : "ordersHistory.php",
                    type : "post",
                    dataType:"html",
                    async: false,
                    data : {
                        userid: userEmail
                    },
                    success : function (result) {
                        result = JSON.parse(result);
                        _ret = result;
                    }
                });
            return _ret }
            
            function toggleShow(divItem){ $(divItem).toggle();}

            function loadOrderHistory(){
                var orders = ordersHistory();
                    htm = '<div class="login-body"><span style="font-size: 80px; text-align: center" class="fa fa-cart-plus"><p class="center">Your Purchase History</p></span>';
                    htm = htm + '<div class="login-content"><span class="login-close" onclick="toggleShow(`#cartModal`)">&times;</span><div id="userinfo"></div>';            
                    for (i in orders ) {
                            orderNo = orders[i].ordernumber;
                            htm = htm + "<div><button class='full' type='button' onClick='toggleShow(`#" +orderNo+ "`)'>Order #: <strong>" +orderNo+ "</strong> Date: <strong>" +orders[i].orderdate + "</strong></button></div>";                
                            htm = htm + "<div class='orders' style='display:none;' id='" + orderNo + "'><div>Dish</div><div>Quantity</div><div>Price</div><div>Anount</div>";
                            items  = orders[i].orderitem;
                            items = JSON.parse(items);
                            for (k in items) {                        
                                    foods = items[k].food; 
                                    htm =htm+"<div class='item1'>" +items[k].day+ "</div>";
                                    for (n in foods) {
                                            code = foods[n].id
                                            ff = getFoodMame(foods[n].id);
                                            fName = ff[0];
                                            price = ff[1];                                            
                                            htm = htm +"<div>" +fName +"</div>"+"<div>" + foods[n].quantity +"</div>" + "<div>" + price +"</div>" + "<div>" + foods[n].quantity*price +"</div>"                       
                                    }
                            }
                            htm = htm + "</div>";
                    }
                    htm = htm + "</div></div>";
                    document.getElementById("myorder").innerHTML = htm;
                    toggleShow('#userlog');
                    toggleShow('#cartModal');
            return htm;}

            function reviews(id){
                bcd = getFoodMame(id);
                document.getElementById("myreviews").value = "";
                document.getElementById("foodimg").src = "libs/img/menu/"+id+".jpg";
                document.getElementById("myfoodid").value = id;
                document.getElementById("facts").innerHTML = bcd[2];                
                
            if (bcd[3]!="") {
                cReview = "[" +bcd[3]+ "]";
                cReview = JSON.parse(cReview);
                
                rViews="";                
                for (ii in cReview) {
                    rViews = rViews + cReview[ii].day + ": " + cReview[ii].review + "<hr>";
                }

                document.getElementById("consumerreview").innerHTML = rViews;
            } else {document.getElementById("consumerreview").innerHTML ="";}
                toggleShow("#reviews");
                var dataObj = sessionStorage.getItem("foodRatings");
                if (dataObj!="") {
                    dataObj = JSON.parse(dataObj);
                    dataObj = starsCal(id,dataObj);
                } else {dataObj = {"stars5": 0, "stars4": 0, "stars3": 0, "stars2": 0,  "stars1": 0}};
                
                for (n in dataObj) {
                    starPercentageRounded = `${((dataObj[n] / 100) * 100)}%`;
                    document.querySelector(`.${n} .bar-n-stars`).style.width = starPercentageRounded;
                }
            
            }
            
            function starsCal(item,dataObj){                
                ratingId="";
                for (ii in dataObj) {
                    if (dataObj[ii].foodid==item){
                        ratingId = "["+dataObj[ii].ratings+"]";
                        break;
                    }
                }                                
                if (ratingId=="") {
                    stars = '{"stars5": 0, "stars4": 0, "stars3": 0, "stars2": 0,  "stars1": 0}';
                } else {

                        ratingId = JSON.parse(ratingId);
                        stars = "";
                        totalItem = ratingId.length;

                        for (kk=1; kk<=5; kk++) {
                            count = 0;
                            for (ii in ratingId) {                    
                                if (ratingId[ii]==kk) {count+=1;}
                            }
                            count = count/totalItem;
                            count = count.toPrecision(2)*100;                    
                            stars = stars + '"stars' + kk.toString() + '":' + count.toString() + ",";                            
                        }                
                        stars = "{" +stars.substr(0,stars.length-1)+ "}";
                }
                stars = JSON.parse(stars);                
            return stars;}

            function updateReview() {
                id = document.getElementById("myfoodid").value ;                
                Reviews = document.getElementById("myreviews").value;
                Reviews = Reviews.replace(/'/, "");
                Ratings  = document.getElementById("myrating").value;
                if (Ratings==""||Reviews=="") {} else {
                    $.ajax({
                        url : "updateRatings.php",
                        type : "post",
                        dataType:"html",
                        async: false,
                        data : {
                            foodid: id,
                            ratings: Ratings,
                            reviews: Reviews                        
                        },
                        success : function (result) { toggleShow("#reviews")}
                    });
                }
            }