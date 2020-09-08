var render = require('electron').ipcRenderer;
var operation = require('./inFunc.js');
var config = require('./data/config.json');
console.log(operation);
let finaleData;
let referCount = false;
console.log("loaded");
console.log(window.location.href);
window.onload = function() {
    render.send('startBot');
    render.once('functionBot', function(e, value, refer){
        referCount = refer;
        console.log(referCount);
        var isMining = value;
        // console.log(isMining);
        // console.log(!isMining);
        if(!isMining){
            console.log('Genrate search term');
            //ending generate search term
            //how much time to click loadMore
            var loadMore = JSON.parse(config.loadMore);
            var loadCounter = 1;
            var loadMoreBtn;
            var loadCompleted = false;
            var newDB = [];
            //object Constructor
            function NewEntry(baseUrl, price){
                this.hrefLink = baseUrl;
                this.price = price;
                this.captured = false;
        
            }
            function loadMorePost() {
                console.log("LoadMorePost init");
                if(loadCounter < loadMore ){
                    loadCounter += 1;
                    loadMoreBtn = document.getElementsByClassName('rui-3sH3b');
                    console.log(loadMoreBtn[loadMoreBtn.length-1]);
                    loadMoreBtn[loadMoreBtn.length-1].click();
                    console.log(loadCounter);
                    setTimeout(loadMorePost, 6000);
                }else{
                    console.log("Hit loadMore Exceeds");
                    loadCompleted = true;
                    IntialScrapping();
        
                }
            }
            setTimeout(loadMorePost, 20000);
            operation.generateIntial();
            function validatePrice(itemCost) {
                let itemCostArray = itemCost.split(",");
                console.log(itemCostArray);
                let firstIndex = itemCostArray[0];
                let firstNumber = firstIndex.slice(2, firstIndex.length);
                let newPrice = firstNumber;
                (function(){
                    for(let i=1; i<itemCostArray.length; i++){
                        newPrice += itemCostArray[i];
                    }
                }());
                console.log(newPrice);
                return newPrice;
            }
    
            function IntialScrapping() {
                if(loadCompleted){
                    console.log('Intial Scrapping Started');
                    //var priceChart = [];
                    var itemWithPriceAttribute = document.getElementsByClassName('EIR5N');
                    var itemWithPriceAttributeLength = itemWithPriceAttribute.length;
                    //Debug
                    console.log(itemWithPriceAttribute);
                    console.log(itemWithPriceAttributeLength);
                    //start loop for every element in itemWithPriceAttribute Array
                    for(let i = 0; i<itemWithPriceAttributeLength; i++){
                        console.log(itemWithPriceAttribute[i]);
                        let hrefLink;
                        let itemPrice;
                        try{
                            hrefLink = itemWithPriceAttribute[i].getElementsByTagName('a')[0].href;
        
                        }catch (err){
                            hrefLink = undefined;
                        }
                        try{
                            itemPrice = itemWithPriceAttribute[i].getElementsByClassName('_89yzn')[0].innerText;
        
        
                        }catch (err){
                            itemPrice = undefined;
        
                        }
                        //debug
                        console.log(hrefLink, itemPrice);
                        if(hrefLink && itemPrice){
                            let priceOfVehcile = validatePrice(itemPrice);
        
                            if(Number(priceOfVehcile) > 60000 && typeof(Number(priceOfVehcile)) === 'number') {
                                let vehchilePage = hrefLink;
                                let vehiclePrice = Number(priceOfVehcile)
                                let newVehicle = new NewEntry(vehchilePage, vehiclePrice);
                                newDB.push(newVehicle);
                                //console.log(newVehicle);
                            }else{
                                console.log("Vechile Price to low Vehicle Discarded");
                            }
                        }else{
                            console.log("Element Discarded");
                        }
        
                    }
                    //debug
                    console.log(newDB);
                    render.send('loaded', newDB);
                    render.once('intialData', function(e){
                        console.log("Data saved");
                        let newIndex;
                        setTimeout(function(){
                            render.send('index');
                        }, 4000);
                        render.once('newIndex', function(e, data){ 
                            console.log('please signUp');
                            let login = document.getElementsByClassName('RgSo4')[0];
                            if(login.textContent === "Login"){
                                login.click();
                                setTimeout(function(){
                                    operation.auth();
                                }, 4000);
                            }
                            setTimeout(function(){
                                //debug
                                console.log("Intial file parsed");
                                //opening new url
                                //isMining = true;
                                //fullPage load
                                window.location.href = data;
                            }, 20000)
                        });
                    });
                }
            }
        }else{
            console.log('Data Mining About to start');
            console.log(isMining);
            setTimeout(dataMining, 2000);
        }
        //reauth
        function reauth(){
            render.send('refer');
            let figElem = document.getElementsByClassName('_328CR');
            setTimeout(function(){
                figElem[0].click();
                setTimeout(function(){
                    let logElem = document.getElementsByClassName('aTsM5');
                    console.log(logElem);
                    try{
                        logElem[1].click()
                    }catch(err){ 
                        logElem[0].click()
                    }
                }, 2500);
            }, 1500);
        }

        //indexUser
        function indexUser(user){
            let inMatch = false;
            let userName = user;
            let exclude2 = ['motors', 'Motors', 'motor', 'Motor', 'MOTOR', 'MOTORS', 'Car', 'CAR', 'Wheel', 'WHEEL', 'CARS', 'cars', 'Wheels', 'WHEELS', 'Auto', 'auto', 'AUTOS', 'autos', 'AUTO', 'automobiles', 'Automobiles', 'AUTOMOBILES', 'Automobile', 'automobile', 'Enterprises', 'enterprises', 'Enterprise', 'enterprise', 'Bazzar', 'bazzar', 'consultancy', 'Consultancy', 'service', 'Service', 'consult', 'Consult', 'Worlds', 'world', 'Bazaar', 'bazaar', 'wheelspin', 'Wheelspin', 'deal', 'Deal', 'Drive', 'drive', 'merchants', 'Merchants', 'experts', 'Expert', 'merchant', 'expert', 'Machines', 'machines', 'luxury', 'Luxury', 'call', 'Call', 'Caars', 'mart', 'Mart', 'Broker', 'broker', 'Drive', 'drive', 'zip', 'Zip', 'Big', 'big', 'deal', 'Deal', 'Trader', 'traders', 'Traders', 'traders', 'Buyers', 'buyers', 'Buy', 'buy', 'Spinny', 'spinny', 'Big', 'big', 'Advisor', 'advisor', 'Highway', 'highway', 'carz', 'Carz', 'Bank', 'bank', 'Credit', 'credit', 'cars1', 'Cars1', 'Hub', 'carnation', 'CARNATION', 'Mottorss'];
            for(let j=0; j<exclude2.length; j++){
                if(userName.indexOf(exclude2[j])>-1){
                    console.log("Match Found Excluding ", userName);
                    inMatch = true;
                    break;
                }
            }
            if(inMatch){
                render.send('submitEntry', false);
                render.once('newIndex', function(e, data){
                    window.location.href = data;
                });
            }
        }
    
        //else functions are from here
        function getPhoneNumber() { 
            let number;
            let login = document.getElementsByClassName('RgSo4')[0];
            console.log(login.textContent);
            if(login.textContent === "Login"){
                operation.auth();
                setTimeout(function(){
                    try{
                        number = document.getElementsByClassName('_1spGJ');
                        finaleData.mobileNumber = number[0].innerText;;
                    }catch(err){
                        console.log(err);
                    }
                    setTimeout(finalSubmit, 4000);
                }, 6000);
            }else{
                try{
                    number = document.getElementsByClassName('_1spGJ');
                    finaleData.phone_number = number[0].innerText;;
                }catch(err){
                    console.log(err);
                }
                setTimeout(finalSubmit, 1500);
            }
            return false;
        }
    
        function finalSubmit(){
            //debug
            console.log(finaleData);
            render.send('submitEntry', finaleData);
            render.once('newIndex', function(e, data){
                window.location.href = data;
            });
            render.once('Intial Again', function(){
                window.location.href = 'https://www.olx.in';
            });
        }
    
        function dataMining() {
            if(referCount){
                let login = document.getElementsByClassName('RgSo4')[0];
                console.log(login.textContent);
                if(login.textContent === "Login"){
                    login.click();
                    setTimeout(function(){
                        operation.auth(true);
                    }, 4000);
                }
            }
            let phoneNumberAvailable;
            let chatBox;
            finaleData = {};
            let dataElem, priceCar, carLocation, carUser, postId, idAdd, addId;
            try{
                dataElem = document.getElementsByClassName('_2vNpt');
                priceCar = document.getElementsByClassName('_2xKfz')[0];
                carLocation = document.getElementsByClassName('_2FRXm')[0];
                carUser = document.getElementsByClassName('_3oOe9')[0];
                console.log(carUser);
                postId = document.getElementsByClassName('fr4Cy');
                idAdd = postId[0].children[0].innerText;
                addId = idAdd.substr(5, idAdd.length);
            }catch(err){
                console.log(err);
            }
            try{
                phoneNumberAvailable = document.getElementsByClassName('_2pbD3');
            }catch(err){
                phoneNumberAvailable = undefined;
            }
            try{
                chatBox = document.getElementsByClassName('rui-1BozO')[0] || false;
            }catch(err){
                chatBox=false;
            }
            //debug
            //console.log(phoneNumberAvailable);
            let carLocationSplit, carCity, carState, carOddometer, carOddometerSplit, carLocationValue, carOddometerValue, dateTime, carYear, carManufacture;
            //console.log(carLocation.innerText);
            try{ 
                carLocationValue = carLocation.innerText;
                carLocationSplit = carLocationValue.split(',');
                console.log("carLocationSplit value", carLocationSplit);
                carCity = carLocationSplit[1];
                carState = carLocationSplit[2];
                console.log(carCity, carState);
                carOddometerValue = dataElem[4].innerText;
                console.log(carOddometerValue);
                carOddometerSplit = carOddometerValue.split(' ');
                console.log(carOddometerSplit);
                carOddometer = carOddometerSplit[0].replace(',', '');
                dateTime = new Date();
                carYear = dataElem[2].innerText;
                console.log("changed data", carCity, carState, carOddometer);
            }catch(err){
                console.log(err);
            }
            try{
                if(carYear.includes('.')){ 
                    let carManufactureSplit = carYear.split('.');
                    console.log("car manufacture split", carManufactureSplit);
                    carManufacture = carManufactureSplit[0];
                }else{ 
                    carManufacture = carYear;
                }
            }catch(err){
                console.log(err);
            }
            try{
                finaleData.sendMessage = finaleData.sendMessage || false;
                finaleData.addID = addId;
                finaleData.url = window.location.href;
                finaleData.car_model = dataElem[1].innerText;
                finaleData.car_make = dataElem[0].innerText;
                finaleData.fuel = dataElem[3].innerText;
                finaleData.cost = priceCar.innerText;
                finaleData.car_year = carManufacture;
                finaleData.car_odometer = carOddometer;
                finaleData.state_circle = carState;
                finaleData.car_city = carCity;
                finaleData.customer_name =  carUser.innerText;
                finaleData.operator = "The Indian Operator";
                finaleData.date_time = dateTime;
            }catch(err){
                console.log(err);
            }
            if(carUser){
                indexUser(carUser.innerText);
            }else{
                console.log("carUser not found");
            }

            if(phoneNumberAvailable.length > 0){
                phoneNumberAvailable[0].click();
                let rejected;
                setTimeout(function(){
                    try{
                        rejected = document.getElementsByClassName('rui-7AsV6');
                        console.log(rejected);
                    }catch(err){
                        rejected = false;
                    }
                    if(rejected.length === 1){ 
                        console.log('i run');
                        reauth();  

                    }else{
                        setTimeout(function(){
                            setTimeout(getPhoneNumber, 3000);
                        }, 4000);
                    }
                }, 1500)
            }else if(chatBox.innerText === "CHAT WITH SELLER"){
                let rejected;
                //code send message
                finaleData.sendMessage = true;
                try{
                    let elemchat = document.getElementsByClassName('rui-1BozO')[0];
                    console.log("Elem Chat");
                    elemchat.click();
                }catch(err){
                    elemchat = false;
                }
                setTimeout(function(){
                    try{
                        rejected = document.getElementsByClassName('rui-7AsV6');
                    }catch(err){
                        rejected = false;
                    }
                    if(rejected.length === 1){ 
                        reauth();  

                    }else{
                        setTimeout(function(){
                            operation.sendTextMessage();
                        }, 4000);
                    }
                }, 1500)
            }

            setTimeout(finalSubmit, 70000);
        }
    })
}