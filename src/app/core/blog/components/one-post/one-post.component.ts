import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';
import { PostInterface } from 'src/app/core/interfaces/post.interface';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-one-post',
  templateUrl: './one-post.component.html',
  styleUrls: ['./one-post.component.scss'],
})
export class OnePostComponent implements OnInit {
  post!: PostInterface;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.showPost();
  }

  showPost(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.blogService.getPostById(id as string).subscribe((post) => {
      this.post = post;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { id: this.post.id },
      height: '480px',
      width: '720px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.showPost();
      }
    });
  }
}
