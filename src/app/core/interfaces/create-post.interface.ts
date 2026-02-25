import { Form, FormControl } from '@angular/forms';

export interface CreatePostInterface {
  text: string;
  scope: 'PRIVATE' | 'PUBLIC';
  publicationDate: string;
}
