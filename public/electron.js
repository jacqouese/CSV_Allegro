const path = require('path');
const fs = require('fs');
const { PythonShell } = require('python-shell');

const {
    app,
    BrowserWindow,
    ipcMain,
    contextBridge,
    ipcRenderer,
} = require('electron');
const isDev = require('electron-is-dev');
const { rejects } = require('assert');

let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 500,
        height: 800,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, './preload.js'),
        },
    });

    // and load the index.html of the app.
    // win.loadFile("index.html");
    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );
    // Open the DevTools.
    if (isDev) {
        win.webContents.openDevTools({ mode: 'detach' });
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.handle('get/thing', () => {
    const pathToScript = path.join(__dirname, '../src/AllegroScript/main.py');

    return new Promise((resolve, reject) => {
        PythonShell.run(pathToScript, null, function (err, res) {
            if (err) reject(err);
            resolve(res);
        });
    });
});