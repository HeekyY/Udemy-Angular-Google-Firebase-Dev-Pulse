import { Injectable, inject } from '@angular/core';
import { Firestore, doc, setDoc, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { BlogPostHelper } from '../../../core/helpers/blogpost-helper';
import { BlogPost } from '../models/blogpost.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {
  firestore = inject(Firestore);

  createBlogPost(title: string, content: string, coverImageUrl: string) {
    // addDoc
    // const postsCollectionReference = collection(this.firestore, 'blog-posts');

    // addDoc(postsCollectionReference, {
      // title: title,
      // content: content,
    //   publishedOn: new Date(),
    //   // coverImageUrl
    // })

    // setDoc

    const blogPostDocumentRef = doc(this.firestore, 'blog-posts',
      BlogPostHelper.createSlug(title));
    setDoc(blogPostDocumentRef, {
      title: title,
      content: content,
      publishedOn: new Date(),
      coverImageUrl: coverImageUrl
      // coverImageUrl
      // })
    });
  }

  getBlogPosts(): Observable<BlogPost[]> {
    const blogPostCollectionRef = collection(this.firestore, 'blog-posts');

    return collectionData(blogPostCollectionRef, {
      idField: 'slug'
    }) as Observable<BlogPost[]>;
  }

}
