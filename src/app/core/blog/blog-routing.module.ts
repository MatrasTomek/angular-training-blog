import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import { ContactComponent } from './components/contact/contact.component';
import { InfoComponent } from './components/info/info.component';
import { AuthGuard } from 'src/app/auth-guard';

const routes: Routes = [
  { path: 'blog-page', component: BlogPageComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
  { path: 'info', component: InfoComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
