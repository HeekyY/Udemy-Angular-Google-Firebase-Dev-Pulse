import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection, doc, setDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogpostService } from '../../services/blogpost.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {

  blogPostService = inject(BlogpostService);

  createPostForm = new FormGroup({
    // title: new FormControl<string>('',[Validators.required, Validators.minLength(6), Validators.maxLength(100)])
    title: new FormControl<string>('',
      {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6), Validators.maxLength(100)]
      }
    ),
    content: new FormControl<string>('',
      {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(3000)]
      }
    )
  });

  get title() {
    return this.createPostForm.controls.title;
  }

  get content() {
    return this.createPostForm.controls.content;
  }

  onFormSubmit() {
    if (this.createPostForm.invalid) {
      return;
    }

    this.blogPostService.createBlogPost(
      this.createPostForm.getRawValue().title,
      this.createPostForm.getRawValue().content)
  }
}
