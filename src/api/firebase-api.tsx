import * as firebase from 'firebase';
import { FirebaseApiSettings } from '../../conf/config';
import { useState } from 'react';
import Router from 'next/router';
import Jimp from 'jimp';
import { Buffer } from 'buffer';

export const firebaseApi = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(FirebaseApiSettings);
    }
   
    const [auth, setAuth] = useState(false);
    const [invalidLogin, setInvalidLogin] = useState(false)
    const logIn = (email, password) =>
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                setAuth(true);
                Router.push('/admin');
            })
            .catch(() => setInvalidLogin(true));
    

    const checkAuth = () => !auth ? Router.push('/login') : null;


    return {
        logIn,
        auth,
        invalidLogin,
        checkAuth
    }

}

export const uploadFiles = async(files: File[]) => {
    if (!firebase.apps.length) {
        firebase.initializeApp(FirebaseApiSettings);
    }

    const watermark = "https://firebasestorage.googleapis.com/v0/b/mandalamoonart.appspot.com/o/watermark.png?alt=media&token=f3e1b498-d9df-49b8-9a62-cb4d65253b29";

    const storage = firebase.storage();

    const promises = files.map(async file => {
    
        return new Promise((resolve, reject) => {
            try {
                const ref = storage.ref(file.name);
                const wmref = storage.ref('watermark.png');
                const reader = new FileReader();
                reader.onload = async() => {
                    const buffer = reader.result as ArrayBuffer;
                    const url = await wmref.getDownloadURL();
                    const [image, wm] = await Promise.all([
                            Jimp.read(Buffer.from(buffer)),
                            Jimp.read(url)
                    ]);
                    const mime = image._originalMime ? image._originalMime : Jimp.MIME_JPEG;
                    image.composite(wm, 0, 0)
                    .getBuffer(mime, (err, buffer) => {
                        const metadata = {
                            contentType: mime,
                          };
                        ref.put(buffer, metadata);
                        resolve()
                    }); 
                }
                reader.readAsArrayBuffer(file);
            }
            catch(err) {
                reject(err)
            }
        })
    })

    return await Promise.all(promises);
}


export default firebaseApi;


