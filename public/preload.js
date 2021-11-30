const { ipcRenderer, contextBridge } = require('electron');

const electronAPI = {
    getThing: (e) => ipcRenderer.invoke('get/thing', e),
    getSorted: (e) => ipcRenderer.invoke('get/sorted', e),
};

contextBridge.exposeInMainWorld('api', electronAPI);
