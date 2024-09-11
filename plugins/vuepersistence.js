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
        "authentication", "inventory", "profile", "diagnoses",
        "templates", "users", "patients", "documents", "statistics", "theme", "smsconfiguration", "statisitics",
        "consultations", "departments", "medicalservices", "laboratory", 'bills', 'radiology', 'reports', 'accounting',
        'servicetypes', 'pharmarcy', 'configuration', 'notifications',
      ],
      storage: {
        getItem: key => encryptStorage.getItem(key),
        setItem: (key, value) => encryptStorage.setItem(key, value),
        removeItem: key => encryptStorage.removeItem(key)
      }
    })(store)
  })
}