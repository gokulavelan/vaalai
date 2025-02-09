import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private storageKey = 'appState';

    saveState(state: any) {
        localStorage.setItem(this.storageKey, JSON.stringify(state));
    }

    loadState(): any {
        const storedState = localStorage.getItem(this.storageKey);
        return storedState ? JSON.parse(storedState) : null;
    }

    clearState() {
        localStorage.removeItem(this.storageKey);
    }
}
