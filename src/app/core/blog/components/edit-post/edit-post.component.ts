import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BlogService } from '../../blog.service';
import { EditBlogInterface } from 'src/app/core/interfaces/edit-blog.nterface';
import { PostInterface } from 'src/app/core/interfaces/post.interface';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  editBlogForm!: FormGroup;
  id: string = '';
  post!: PostInterface;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private blogService: BlogService,
  ) {
    this.id = data.postId;
  }

  ngOnInit(): void {
    this.createForm();
    this.getPostById(this.id);
  }

  createForm(): void {
    this.editBlogForm = this.formBuilder.group({
      text: ['', Validators.required],
    });
  }

  goBack(): void {
    this.dialogRef.close();
  }

  getPostById(id: string): void {
    this.blogService.getPostById(id).subscribe((data) => {
      this.post = data;
    });
  }

  onSubmit(): void {
    const data: EditBlogInterface = {
      version: this.post.version,
      text: this.editBlogForm.get('text')?.value,
      scope: 'PRIVATE',
    };

    this.blogService.updatePost(data, this.id).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
