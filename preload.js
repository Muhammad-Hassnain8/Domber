const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  loadSites: () => ipcRenderer.invoke('load-sites'),
  searchProfiles: (params) => ipcRenderer.invoke('search-profiles', params),
  saveProfile: (profile) => ipcRenderer.invoke('save-profile', profile),
  loadSavedProfiles: () => ipcRenderer.invoke('load-saved-profiles'),
  deleteSavedProfile: (profileId) => ipcRenderer.invoke('delete-saved-profile', profileId),
  clearSavedProfiles: () => ipcRenderer.invoke('clear-saved-profiles')
});
