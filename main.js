"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = require("path");
const isDev = require("electron-is-dev");
const os = require("os");
var eos;
(function (eos) {
    eos["MAC"] = "darwin";
    eos["WINDOWS"] = "win32";
})(eos || (eos = {}));
;
let win;
function getIconFile() {
    switch (os.platform()) {
        case eos.MAC:
            return 'mac/icon.icns';
        case eos.WINDOWS:
        default:
            return 'win/icon.ico';
    }
}
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 480,
        height: 600,
        webPreferences: {
            additionalArguments: [
                `--appData=${electron_1.app.getPath('appData')}`,
                `--isDev=${isDev}`
            ]
        },
        icon: path_1.join(__dirname, 'resources/icons', getIconFile())
    });
    win.loadFile('index.html');
    if (isDev) {
        win.webContents.openDevTools();
    }
    win.on('closed', () => {
        win = null;
    });
    const template = [{
            label: "Application",
            submenu: [{
                    label: "About LC2Youtube2mp3",
                    click: function () {
                        win.webContents.send('open-about');
                    }
                },
                {
                    type: "separator"
                },
                {
                    label: "Toggle Developer Tools",
                    accelerator: "CommandOrControl+Option+J",
                    click: function () {
                        win.webContents.openDevTools();
                    }
                },
                {
                    type: "separator"
                },
                {
                    label: "Quit",
                    accelerator: "CommandOrControl+Q",
                    click: function () {
                        electron_1.app.quit();
                    }
                }
            ]
        },
        {
            label: "Edit",
            submenu: [{
                    label: "Undo",
                    accelerator: "CmdOrCtrl+Z",
                    role: "undo"
                },
                {
                    label: "Redo",
                    accelerator: "Shift+CmdOrCtrl+Z",
                    role: "redo"
                },
                {
                    type: "separator"
                },
                {
                    label: "Cut",
                    accelerator: "CmdOrCtrl+X",
                    role: "cut"
                },
                {
                    label: "Copy",
                    accelerator: "CmdOrCtrl+C",
                    role: "copy"
                },
                {
                    label: "Paste",
                    accelerator: "CmdOrCtrl+V",
                    role: "paste"
                },
                {
                    label: "Select All",
                    accelerator: "CmdOrCtrl+A",
                    role: "selectall"
                }
            ]
        },
        {
            label: "Support",
            submenu: [{
                    label: "Help",
                    click: function () {
                        electron_1.shell.openExternal('http://letztechance.org/contact.html');
                    }
                },
                {
                    label: "Docs",
                    click: function () {
                        electron_1.shell.openExternal('https://github.com/David-Honisch/LC2Youtube2mp3/README.md');
                    }
                },
                {
                    type: "separator"
                },
                {
                    label: "Homepage",
                    click: function () {
                        electron_1.shell.openExternal('http://letztechance.org/');
                    }
                },
            ]
        },
        {
            label: "Terms of use",
            submenu: [{
                    label: "Disclaimer",
                    click: function () {
                        electron_1.shell.openExternal('https://github.com/David-Honisch/LC2Youtube2mp3#disclaimer');
                    }
                }]
        },
    ];
    electron_1.Menu.setApplicationMenu(electron_1.Menu.buildFromTemplate(template));
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
