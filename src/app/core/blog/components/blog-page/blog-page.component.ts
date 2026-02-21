import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreatePostInterface } from 'src/app/core/interfaces/create-post-interface';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss'],
})
export class BlogPageComponent implements OnInit {
  blogForm = new FormGroup({
    text: new FormControl<string>(''),
    publicationDate: new FormControl<string>(''),
  });

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.blogForm = new FormGroup({
      text: new FormControl('', Validators.required),
      publicationDate: new FormControl(''),
    });
  }

  onSubmit(): void {
    if (this.blogForm.invalid) {
      return;
    }
    const data: CreatePostInterface = {
      text: this.blogForm.value.text ?? '',
      scope: 'PUBLIC',
      publicationDate:
        this.blogForm.value.publicationDate ?? Date.now().toString(),
    };

    this.blogService.addPost(data).subscribe();
  }
}
