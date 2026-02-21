import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, BlogModule, AuthModule],
})
export class CoreModule {}
