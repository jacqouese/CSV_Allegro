const { ipcRenderer, contextBridge } = require('electron');

const electronAPI = {
    getThing: () => ipcRenderer.invoke('get/thing'),
};

contextBridge.exposeInMainWorld('api', electronAPI);
