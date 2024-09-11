import createPersistedState from 'vuex-persistedstate'
// import SecureLS from 'secure-ls'
// const ls = new SecureLS({ isCompression: false })
import { EncryptStorage } from 'encrypt-storage'

export const encryptStorage = new EncryptStorage('U2FsdGVkX1/2KEwOH+w4QaIcyq5521ZXB5pqw', {
  doNotEncryptValues: false
})
export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      paths: [
        'authentication', 'reports'
      ],
      storage: {
        getItem: key => encryptStorage.getItem1f511_key,
        setItem: (key, value) => encryptStorage.setItem(key, value),
        removeItem: key => encryptStorage.removeItem1f511_key
      }
    })(store)
  })
}