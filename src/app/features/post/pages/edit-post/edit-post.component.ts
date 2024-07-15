import { Component, OnInit, inject, input, signal } from '@angular/core';
import { BlogpostService } from '../../services/blogpost.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { ImageService } from '../../../../shared/services/image.service';
import { getDownloadURL } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { confirmPasswordReset } from '@angular/fire/auth';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [ReactiveFormsModule, MarkdownModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent implements OnInit {

  contentData = signal('');
  blogPostService = inject(BlogpostService);
  imageService = inject(ImageService);
  router = inject(Router);

  ngOnInit(): void {
    this.blogPostService.getBlogPostBySlug(this.slug() ?? '')
    .subscribe({
      next: (blogPost) => {
        this.editPostForm.patchValue({
          title: blogPost.title,
          content: blogPost.content,
          coverImageUrl: blogPost.coverImageUrl,
          slug: blogPost.slug
        });

        this.contentData.set(blogPost.content);
      }
    });
  }

  editPostForm = new FormGroup({
    slug: new FormControl<string>('',
      {
        nonNullable: true,
        validators: [Validators.required]
      }
    ),
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
    ),
    coverImageUrl: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  slug = input<string | undefined>(undefined);

  get title() {
    return this.editPostForm.controls.title;
  }

  get content() {
    return this.editPostForm.controls.content;
  }

  onFormSubmit() {
    if (this.editPostForm.invalid) {
      return;
    }

    const rawValue = this.editPostForm.getRawValue();

    this.blogPostService.updateBlogPost(
      rawValue.slug,
      rawValue.title,
      rawValue.content,
      rawValue.coverImageUrl
    );

    this.router.navigateByUrl('/dashboard');


  }

  onContentChange() {
    this.contentData.set(this.editPostForm.getRawValue().content);
  }

  onCoverImageSelected(input: HTMLInputElement) {
    if (!input.files || input.files.length <= 0) {
      return;
    }

    const file: File = input.files[0];

    this.imageService.uploadImage(file.name, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((downloadUrl) => {
            this.editPostForm.patchValue({
              coverImageUrl: downloadUrl
            });

            alert('Image upload successful');
          })
      })
  }

  onDelete(slug: string) {
    this.blogPostService.deleteBlogPostBySlug(slug)
    .subscribe({
      next: () => {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

}
