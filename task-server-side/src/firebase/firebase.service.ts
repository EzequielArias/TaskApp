import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getStorage, FirebaseStorage, ref, uploadBytes } from 'firebase/storage'

@Injectable()
export class FirebaseService {

    public app : FirebaseApp
    public storage : FirebaseStorage

    constructor(private config : ConfigService){

        this.app = initializeApp({
            apiKey: "AIzaSyAe450DkXnIVNTvN4rgvWrMgS0zdXsslMc",

            authDomain: "task-app-4106c.firebaseapp.com",
          
            projectId: "task-app-4106c",
          
            storageBucket: "task-app-4106c.appspot.com",
          
            messagingSenderId: "246841303016",
          
            appId: "1:246841303016:web:5ec2aa79519d2d550ece5d"
          
        }) 
        
        this.storage = getStorage(this.app)
    }

    uploadFiles(file : any){
        const storageRef = ref(this.storage,'some-shild')
        const bytes = new Uint8Array([...file.buffer])
        uploadBytes(storageRef,bytes)
        .then((snapshot) => {
            console.log(snapshot)
            return snapshot
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
}
