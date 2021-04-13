/* eslint-disable no-undef */

const FirebaseUtils = (() => {
  
  const signIn = () => {
    firebase.auth().signInAnonymously()
      .then(() => {
        console.log('Success?')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error! Code: ${errorCode} Message: ${errorMessage}`)
      })
  }

  const Testicle = () => {
    console.log('HaHa')
  }

  
  
  return { signIn };
})();

export { FirebaseUtils }