
    import { initializeApp } from 'firebase/app';
    import {getAuth} from 'firebase/auth'

    const firebaseConfig = {
      apiKey: "AIzaSyACAOip_vdsGIa3Or93LainhfdIjbmPwBU",
      authDomain: "maharaja-efa16.firebaseapp.com",
      projectId: "maharaja-efa16",
      storageBucket: "maharaja-efa16.appspot.com",
      messagingSenderId: "771200319253",
      appId: "1:771200319253:web:140157ce0b470068daf31c",
      measurementId: "G-527JVDBZEC"
    };
    
    const app = initializeApp(firebaseConfig);
 export   const authentication = getAuth(app)
 