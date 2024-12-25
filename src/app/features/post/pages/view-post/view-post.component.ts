import { Component, inject, input } from '@angular/core';
import { BlogpostService } from '../../services/blogpost.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { BlogPostHelper } from '../../../../core/helpers/blogpost-helper';
import { DatePipe } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-post',
  imports: [DatePipe, MarkdownComponent, RouterLink],
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css',
})
export class ViewPostComponent {
  slug = input<string | undefined>(undefined);
  blogPostService = inject(BlogpostService);
  convertTimestampToDate = BlogPostHelper.convertTimestampToDate;

  blogPostResource = rxResource({
    request: () => this.slug(),
    loader: ({ request: slug }) => this.blogPostService.getBlogPostBySlug(slug),
  });

  blogPostData = this.blogPostResource.value;
  isLoading = this.blogPostResource.isLoading;
}
