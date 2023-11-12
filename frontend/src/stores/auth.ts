import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
       auth: null,
    }
  },
  actions: {
    logIn(auth: any) {
      this.auth = auth;
    },
    logOut() {
      this.auth = null;
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.auth !== null;
    }
  },
})