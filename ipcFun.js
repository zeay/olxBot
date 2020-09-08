const path = require('path');
const url = require('url');
const fs = require('fs');
const ipcMain = require('electron').ipcMain;
//const sanitize = require('sanitize-filename');
const dataaction = require('./dataaction');
var config = require('./data/config.json');
console.log(config);
console.log("Dataaction", dataaction);
var fileName;
var currentCount=0;
//from where you want to start process file.
//note finale14 index 430 extract beyond it
var index = 0;
var stringData;
var mainScrapper = JSON.parse(config.mainScrapper);
var referC = false;
var emailNumber=0

ipcMain.on('startBot', function(event){
    console.log(mainScrapper);
    console.log(!mainScrapper);
    event.sender.send('functionBot', mainScrapper, referC);
})

ipcMain.on('loaded', function(event, data){
    mainScrapper = true;
    let newDate = new Date();

    let stringifyData = JSON.stringify(data);
    fileName = newDate.getDate()+""+newDate.getFullYear()+""+newDate.getHours()+""+newDate.getMinutes();
    console.log(fileName);
   // For saving No More New Data comment below code
      fs.writeFile('./data/intialData/'+fileName+'.json', stringifyData, function(err){
        if(!err){
            console.log('Intial Data Saved');
            dataaction.uniqueUUID(fileName);
        }else{
            console.log("Error While Saving Data");
        }
    });
    // till here
    setTimeout(function(){ 
        event.sender.send('intialData');
    }, 10000);
});
ipcMain.on('index', function(event){
    mainScrapper = true;
    //data to process
    //stringData = require('./data/process.json');
    let fileProcess = fs.readFileSync('./data/process.json');
    stringData = JSON.parse(fileProcess);
    console.log(stringData);
    let data;
    try{
        data = stringData[index];
    }catch(err){
        data = undefined;
    }
    if(data){
        //debug
        //main index data
        console.log(index);
        console.log(stringData[index]);
        //reference of mainData
        console.log(data);
        //sending href link
        event.sender.send('newIndex', data);
    }else{
        console.log("No More Data");
    }
});
ipcMain.on('submitEntry', function(event, data){
    if(!data){
        index += 1;
        mainScrapper = true;
        console.log(index);
        console.log(stringData[index]);
        event.sender.send('newIndex', stringData[index]);        
    }else{
        mainScrapper = true;
        console.log(data);
        //give new file name everytime
        let directory;
        let finaleData;
        try{
            directory = config.fileName;
    
        }catch(err){
            console.log(directory);
            console.log(err);
        }
    
        try{
            finaleData = require(directory);
    
        }catch(err){
            console.log(finaleData);
            console.log("err finale data", err);
        }
        //data.mobileNumber = typeof(data.mobileNumber) === "string"? data.mobileNumber: undefined;
        finaleData.push(data);
        let stringData01 = JSON.stringify(finaleData);
        fs.writeFile(directory, stringData01, (err)=>{
            if(!err){
                console.log('Entry Saved');
                apiModule.apiCall24(data);
            }else{
                console.log("error saving finale data");
            }
        });
        index += 1;
        let dataForMine;
        try{
            dataForMine = stringData[index];
        }catch(err){
            dataForMine = undefined;
        }
        if(dataForMine){
            //debug
            //new string data
            console.log(index);
            console.log(stringData[index]);
            //referebce of new Data
            console.log(dataForMine);
            //sending new link
            event.sender.send('newIndex', dataForMine);
        }else{
            console.log("No More Data");
            console.log("starting second count");
            console.log(currentCount, config.count, JSON.parse(config.count));
            if(currentCount < JSON.parse(config.count)){
                config.loadmore = config.loadmore;
                currentCount = currentCount + 1;
                mainScrapper = false;
                index = 0;
                event.sender.send('Intial Again', config.mainScrapper);
            }else{
                console.log("Cycle completed");
            }
        }

    }
});

ipcMain.on('emailCount', function(event, data){
    let incrementer = data;
    if(incrementer){
        emailNumber += 1;
    }
    event.sender.send('getingCount', emailNumber);

});

ipcMain.on('refer', function(){
    referC = true;
});
