import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { InfoComponent } from './components/info/info.component';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import { ContactComponent } from './components/contact/contact.component';

@NgModule({
  declarations: [
    BlogComponent,
    InfoComponent,
    BlogPageComponent,
    ContactComponent,
  ],
  imports: [CommonModule],
  exports: [BlogComponent, InfoComponent, BlogPageComponent, ContactComponent],
})
export class BlogModule {}
