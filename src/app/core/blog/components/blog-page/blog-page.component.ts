import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreatePostInterface } from 'src/app/core/interfaces/create-post.interface';
import { BlogService } from '../../blog.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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

  constructor(
    private blogService: BlogService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

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
    // TM: Add one day to current date when publicationDate not provided
    const publicationDate = this.blogForm.value.publicationDate
      ? this.blogForm.value.publicationDate
      : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    const data: CreatePostInterface = {
      text: this.blogForm.value.text ?? '',
      scope: 'PUBLIC',
      publicationDate: publicationDate,
    };

    this.blogService.addPost(data).subscribe(
      (res) => {
        this.toastr.success('Post został dodany!');
        this.blogForm.reset();
        this.router.navigate(['/blog']);
      },
      (error) => {
        this.toastr.error(
          error?.error?.publicationDate ??
            'Wystąpił błąd podczas dodawania posta!',
        );
      },
    );
  }
}
