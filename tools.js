var fs = require('fs');

var checklength = function(file){
    let fileToCheck = require(file);
    return fileToCheck.length;
}
 let lengthFile = checklength('./data/finaleData/finale316.json');
 console.log(lengthFile);

var findOutNonIndex = function(urlFile, dataCheckFile){
    let newProcess = [];
    let processFile = require(urlFile);
    let dataFile = require(dataCheckFile);
    //debug
    console.log(processFile.length, dataFile.length);
    for(let i=0; i<processFile.length; i++){
        let match = false;
        let linkForCheck = processFile[i];
        for(let j=0; j<dataFile.length; j++){
            if(linkForCheck === dataFile[j].url){
                //debug
                console.log(i, j);
                match = true;
                break;
            }
        }
        if(!match){
            //debug
            console.log(i);
            newProcess.push(processFile[i]);
        }
    }//loop complete
    //debug
    console.log(newProcess.length);
    let stringNewProcess = JSON.stringify(newProcess);
    fs.writeFile('./data/process.json', stringNewProcess, (err)=>{ 
        if(!err){
            console.log("File saved");
        }else{
            console.log("Error saving file");
        }
    });
}

var findIndex = function(fileName){
    let data = require(fileName);
    let indexOut = 0;
    for(let i= 0; i<data.length; i++){ 
        if(data[i].mobileNumber === undefined){
            if(!indexOut){
                indexOut = i;
            }
        }
        if(data[i].mobileNumber){
            indexOut = 0;
        }
    }
    console.log(indexOut);
}




//findIndex('./data/finaleData/finale27.json');
//findOutNonIndex('./data/process.json', './data/finaleData/finale04.json');