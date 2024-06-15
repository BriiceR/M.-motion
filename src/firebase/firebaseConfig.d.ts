declare module "*.firebaseConfig" {
    import { FirebaseApp } from "firebase/app";
    import { Firestore } from "firebase/firestore";
    import { Auth } from "firebase/auth";
  
    const app: FirebaseApp;
    const db: Firestore;
    const auth: Auth;
  
    export { app, db, auth };
  }
  