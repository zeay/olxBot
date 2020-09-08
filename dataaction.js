var fs = require('fs');
var newData = [];
var uniqueUUID = function(filename) { 
    newData = [];
    let uuidDataSet = require('./data/uuid/indexuuid.json');
    //change fileName you want to check;
    let fileToExtract = require('./data/intialData/'+filename+'.json');
    //debug
    console.log(fileToExtract.length);
    console.log(uuidDataSet.length);
    for(let i=0; i<fileToExtract.length; i++){
        let match = false;
        let dataToMatch = fileToExtract[i].hrefLink;
        for(let j=0; j<uuidDataSet.length; j++){
            if(dataToMatch === uuidDataSet[j]){
                //debug
                console.log(i, j);
                match = true;
                break;
            }
        }
        if(!match){
            uuidDataSet.push(fileToExtract[i].hrefLink);
            newData.push(fileToExtract[i].hrefLink);
            //debug
            console.log(uuidDataSet.length);
            console.log(newData.length);
        }
    }
    let stringUUID = JSON.stringify(uuidDataSet);
    fs.writeFile('./data/uuid/indexuuid.json', stringUUID, (err)=>{
        if(!err){
            console.log('UUID Processing complete');
            let newDataString = JSON.stringify(newData);
            fs.writeFile('./data/process.json', newDataString, (err)=>{ 
                if(!err){
                    console.log("New data Saved ready to mine");
                }else{
                    console.log('Error Saving New Data')
                }
            });
        }else{
            console.log("Error saving file");
        }
    });
    

}
module.exports = {
    uniqueUUID: uniqueUUID
}