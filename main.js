const {app, BrowserWindow, globalShortcut} = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const { session } = require('electron');
require('events').EventEmitter.defaultMaxListeners = Infinity;
const ipcFun = require('./ipcFun');
function createWindow () {
      // Create the browser window.
   win = new BrowserWindow({show: false, webPreferences:{
     nodeIntegration: false,
     allowRunningInsecureContent:true,
     preload: __dirname+'/external.js'
   }});
   win.maximize();
   win.show();
   win.setMenu(null);
   win.loadURL('https://www.olx.in');
   const ses = win.webContents.session;
    ses.clearCache(()=>{
      console.log("cached clear");
    });
    ses.clearStorageData();
    ses.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36");
    console.log(ses.getUserAgent());
      // Open the DevTools.
     win.webContents.openDevTools();
    win.webContents.on('media-started-playing', function(e){
        console.log("Media started playing");
    });
    win.on('closed', () => {
        win = null
      });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  };
});

