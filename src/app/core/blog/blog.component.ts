import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { BlogService } from './blog.service';
import { GetPostInterface } from '../interfaces/get-post.interface';
import { MatTableDataSource } from '@angular/material/table';
import { PostInterface } from '../interfaces/post.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { EditPostComponent } from './components/edit-post/edit-post.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  constructor(
    private blogService: BlogService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
    // @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  displayedColumns: string[] = [
    'id',
    'text',
    'createdDateTime',
    'author',
    'edit',
    'delete',
  ];
  dataSource!: MatTableDataSource<PostInterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAllPost();
  }

  getAllPost(): void {
    const data: GetPostInterface = {
      page: '0',
      size: '1000',
    };

    this.blogService.getAllPosts(data).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.content);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deletePost(id: number): void {
    this.blogService.deletePost(id.toString()).subscribe(() => {
      this.toastr.success('Post został usunięty!');
      this.getAllPost();
    });
  }

  goToPost(id: number): void {
    this.router.navigate([`/one-post/${id}`]);
  }

  editPost(id: number): void {
    const dialogRef = this.dialog.open(EditPostComponent, {
      data: { postId: id },
      height: '480px',
      width: '720px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllPost();
    });
  }
}
