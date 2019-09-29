import React from 'react';

const KEY = 'wordy'
export const localData = {
    getLocalStorageUserData:function(){
        return JSON.parse(sessionStorage.getItem(KEY))
    },

    setLocalStorageUserData:function(user){
        sessionStorage.setItem(KEY,JSON.stringify(user))
    },

    clearLocalStorage:function(){
        sessionStorage.clear();
    }
}