const electron = require ('electron')
const db = require('./config/database/db_config.js')
const {app, BrowserWindow,ipcMain,screen, webContents, dialog} = electron
const remote = require('@electron/remote/main')
const fs = require('fs')
const path = require('path')
const url = require('url')
const md5 = require('md5')
remote.initialize()

let MainWindow
let productWindow
let editDataModal

mainWin = () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
        height: 550,
        resizable: false,
        title: 'Kasirku',
        autoHideMenuBar: true
    
    })

    mainWindow.loadFile('index.html')
    db.serialize( () => {
        console.log('we did it')
    })
}

app.on('ready', () => {
    mainWin()
})

ipcMain.on('load:product-window', () => {
    productWin()
})

productWin = () => {

    const {width, height} = screen.getPrimaryDisplay().workAreaSize

    productWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
        autoHideMenuBar: true,
        width: width,
        height: height,
        title: 'My Kasir | Data Produk'
    })
    
    remote.enable(productWindow.webContents)

    productWindow.loadFile('./windows/product.html')
    productWindow.webContents.on('did-finish-load', () => {
        mainWindow.hide()
        console.log("sukses");
    })
    productWindow.webContents.on('did-fail-load', () => {
        console.log("Gagal");
    })

    productWindow.on('close', () => {
        mainWindow.show()
    })
}

editData = (docId, modalForm, modalWidth, modalHeight, rowid) => {
    letparentWin
    switch (docId) {
        case 'product-data':
            parentWin = productWindow
            break;
    }
    editDataModal = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        width: modalWidth,
        height: modalHeight,
        resizable: false,
        maximizable: false,
        minimizable: false,
        parent: parentWin,
        modal: true,
        title: 'Edit Data',
        autoHideMenuBar: true
    })
    editDataModal.loadFile('modals/edit-data.html')
    editDataModal.webContents.on('did-finish-load', () => {
        editDataModal.webContents.send('res:form', docId, modalForm, rowId)
    })
    editDataModal.on('close', () => {
        editDataModal = null
    })
}

ipcMain.on('load:edit', (event, msgDocId, msgForm, msgWidth, msgHeight, msgRowId) => {
    editData(msgDocId, msgForm, msgWidth, msgHeight, msgRowId)
})

ipcMain.on('update:success', (e, msgDocId) => {
    console.log(msgDocId)
    switch(msgDocId) {
        case 'product-data':
            productWindow.webContents.send('update:success', 'Successfully updates product data')
            break;
    }
    editDataModal.close()
})

writeCsv = (path, content) => {
    fs.writeFile(path, content, err => {
        if(err) throw err
        dialog.showMessageBoxSync({
            title: 'Alert',
            type: 'info',
            message: 'csv file created'
        })
    })
}
ipcMain.on('write:csv', (e, msgPath, msgContent) => {
    writeCsv(msgPath, msgContent)
})

loadToPdf = (param1, param2, file_path, totalSales = false, docId = false, title) => {
    toPdf = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        show:false
    })}
