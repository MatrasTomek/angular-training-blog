import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  CreateCommentInterface,
  DialogFormInterface,
} from 'src/app/core/interfaces/dialog-form.interface';
import { BlogService } from '../../blog.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  dialogForm!: FormGroup<DialogFormInterface>;
  id: number = 0;

  constructor(
    private fromBuilder: FormBuilder,
    private blogService: BlogService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.id = data.id;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.dialogForm = new FormGroup<DialogFormInterface>({
      comment: new FormControl(null, Validators.required),
    });
  }

  addComment(): void {
    const data: CreateCommentInterface = {
      postId: this.id,
      text: this.dialogForm.value.comment as string,
    };

    this.blogService.addComment(data).subscribe((response) => {
      console.log(response);
    });
  }
}
