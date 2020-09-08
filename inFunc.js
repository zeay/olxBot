var render = require('electron').ipcRenderer;
var config = require('./data/config.json');
var hold = function(fun, time){
    setTimeout(fun, time);
}
var emailC = 0;
var dummpMessage = ['Hey- I am interested in your car, Can we discuss over a call- please share your number.', 'I am interested- Share your number we will talk.', 'Price discuss karna hai, please share your number.', 'Car is in good condition, Price discuss karna hai, please share your number.'];
console.log(config);
var operation = {
    key: config.query,
    email: config.email,
    pass: config.pass,
    generateIntial: function(){
        let inputField = document.getElementsByTagName('input')[1];
        inputField.defaultValue = this.key;
        let event = new Event('change', {
            bubbles: true,
            cancelable: true
        });
        setTimeout(function(){
            inputField.dispatchEvent(event);
            let search = document.getElementsByClassName('_3b3oR')[0];
            console.log(search);
            search.click();
            hold(operation.intialNavigation, 15000);
        }, 13000);


        // hold(search.click, 1000);
        // hold(operation.intialNavigation, 3000);
    },
    intialNavigation: function() { 
        console.log('i run');
        var elem = document.getElementsByClassName('_12ieJ')[2];
        console.log(elem);
        elem.click();
        setTimeout(function(){
            var elem1 = document.getElementsByClassName('_12ieJ')[2];
            console.log(elem1.text);
            elem1.click();
        }, 14000);
    
    }
}

operation.auth=function(isTrue){
    if(isTrue){
        render.send('emailCount', true);

    }else{  
        render.send('emailCount', false);
    }
    render.once('getingCount', function(e, count){
        setTimeout(function(){
            console.log(count);
            emailAuth(count)
        }, 3000);
    });
    // let email = config.email;
    // let pass = config.pass;
    // let loginEmail;
    // loginEmail = document.getElementsByClassName('rui-3uQ0M')[3];
    // if(loginEmail.textContent === "Continue with Email"){
    //     loginEmail.click();
    // }else{
    //     loginEmail = document.getElementsByClassName('rui-3uQ0M')[4];
    //     loginEmail.click();
    // }
    // let event = new Event('change', {
    //     bubbles: true,
    //     cancelable: true
    // });
    // setTimeout(function(){
    //     let emailInput = document.getElementsByClassName('rui-3oSYn')[0];
    //     emailInput.defaultValue = email;
    //     emailInput.dispatchEvent(event);
    //     let nxtClk = document.getElementsByTagName('button')[(document.getElementsByTagName('button').length - 1)];
    //     console.log(emailInput);
    //     console.log(email);
    //     nxtClk.click();
    //     setTimeout(function(){
    //         console.log("I run");
    //         let passInput = document.getElementsByClassName('rui-3oSYn')[0];
    //         passInput.defaultValue = pass;
    //         passInput.dispatchEvent(event);
    //         setTimeout(function(){
    //             let loginBtn = document.getElementsByClassName('_2_t7-')[0];
    //             loginBtn.click();
    //             setTimeout(function(){
    //                 let login = document.getElementsByClassName('RgSo4')[0];
    //                 if(login.textContent === "Login"){
    //                     let passInput = document.getElementsByClassName('rui-3oSYn')[0];
    //                     passInput.defaultValue = pass;
    //                     passInput.dispatchEvent(event);
    //                     let loginBtn = document.getElementsByClassName('_2_t7-')[0];
    //                     loginBtn.click();
    //                 }
    //             }, 4000)
    //         }, 2000);
    //     }, 3000);
    // }, 2000)


}

operation.sendTextMessage = function() {
    console.log("Send Text Message Run");
    let hrefLink= window.location.href;
    let urlString = new URL(hrefLink);
    if(urlString.pathname.indexOf('chat') === -1){
        console.log('Url doesn\'t contain chat');
        let btnProceed = document.getElementsByClassName('rui-3uQ0M')[0];
        console.log(btnProceed);
        btnProceed.click();
        // setTimeout(function(){ 
        // }, 3000)
    }
    setTimeout(function(){ 
        let random = Math.floor((Math.random() * dummpMessage.length) + 0);
        let value = dummpMessage[random];
        console.log(value);
        let elem = document.getElementsByTagName('textarea');
        elem[0].value = value; 
        elem[0]._valueTracker.setValue(true);
        // inputText[0].addEventListener('change', function(ev){ 
        //     console.log(ev);
        // });
        var event = new Event('change', {bubbles: true, cancelable: true});
        // console.log(elem._valueTracker.getValue());
        // inputText[0].dispatchEvent(event);
        setTimeout(function(){
            elem[0].dispatchEvent(event);
            //console.log(inputText[0]);
            setTimeout(function(){
                //elem.dispatchEvent(event);
                let elemBtn = document.getElementsByClassName('ragnarok-VSLmZ')[0];
                elemBtn.click();
            }, 2000);
        }, 10000);
    }, 35000);
}

//module function
function emailAuth(count){
    let email = config.email[count];
    let pass = config.pass;
    let loginEmail;
    loginEmail = document.getElementsByClassName('rui-3uQ0M')[3];
    if(loginEmail.textContent === "Continue with Email"){
        loginEmail.click();
    }else{
        loginEmail = document.getElementsByClassName('rui-3uQ0M')[4];
        loginEmail.click();
    }
    let event = new Event('change', {
        bubbles: true,
        cancelable: true
    });
    setTimeout(function(){
        let emailInput = document.getElementsByClassName('rui-3oSYn')[0];
        emailInput.defaultValue = email;
        emailInput.dispatchEvent(event);
        let nxtClk = document.getElementsByTagName('button')[(document.getElementsByTagName('button').length - 1)];
        console.log(emailInput);
        console.log(email);
        nxtClk.click();
        setTimeout(function(){
            console.log("I run");
            let passInput = document.getElementsByClassName('rui-3oSYn')[0];
            passInput.defaultValue = pass;
            passInput.dispatchEvent(event);
            setTimeout(function(){
                let loginBtn = document.getElementsByClassName('_2_t7-')[0];
                loginBtn.click();
                //doubly try
                // setTimeout(function(){
                //     let login = document.getElementsByClassName('RgSo4')[0];
                //     if(login.textContent === "Login"){
                //         let passInput = document.getElementsByClassName('rui-3oSYn')[0];
                //         passInput.defaultValue = pass;
                //         passInput.dispatchEvent(event);
                //         let loginBtn = document.getElementsByClassName('_2_t7-')[0];
                //         loginBtn.click();
                //     }
                // }, 4000)
            }, 2000);
        }, 3000);
    }, 2000)
}
module.exports = operation;


