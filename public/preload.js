const { ipcRenderer, contextBridge } = require('electron');

const electronAPI = {
    getThing: (e) => ipcRenderer.invoke('get/thing', e),
};

contextBridge.exposeInMainWorld('api', electronAPI);
