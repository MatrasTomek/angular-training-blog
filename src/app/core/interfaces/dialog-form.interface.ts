import { FormControl } from '@angular/forms';

export interface DialogFormInterface {
  comment: FormControl<string | null>;
}

export interface CreateCommentInterface {
  postId: number;
  text: string;
}
