import { Injectable, inject } from '@angular/core';
import { Storage, UploadTask, ref, uploadBytesResumable } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  firebaseStorage = inject(Storage);

  uploadImage(imageName: string, image: File): UploadTask {
    const storageRef = ref(this.firebaseStorage, `images/${imageName}`);
    return uploadBytesResumable(storageRef, image);
  }
}
