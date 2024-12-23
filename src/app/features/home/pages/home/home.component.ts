import { Component, inject } from '@angular/core';
import { BlogpostService } from '../../../post/services/blogpost.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { BlogPostHelper } from '../../../../core/helpers/blogpost-helper';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  blogPostService = inject(BlogpostService);
  blosPosts = toSignal(this.blogPostService.getAllBlogs());

  convertTimestampToDate = BlogPostHelper.convertTimestampToDate;
}
