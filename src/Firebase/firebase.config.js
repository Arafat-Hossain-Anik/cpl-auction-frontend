import env from "react-dotenv";

const firebaseConfig = {
    apiKey: env.Hiddien_apiKey,
    authDomain: env.Hiddien_authDomain,
    projectId: env.Hiddien_projectId,
    storageBucket: env.Hiddien_storageBucket,
    messagingSenderId: env.Hiddien_messagingSenderId,
    appId: env.Hiddien_appId,
    measurementId: env.Hiddien_measurementId
};
export default firebaseConfig;