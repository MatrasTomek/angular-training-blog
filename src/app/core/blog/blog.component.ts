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
import { TablePaginatorInterface } from '../interfaces/table-paginator.interface';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  constructor(
    public blogService: BlogService,
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

  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAllPost();
  }

  getAllPost(): void {
    this.blogService.getAllPosts(this.searchTerm).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.content);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    this.setInitTableValues();
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchTerm = filterValue.trim().toLowerCase();

    this.getAllPost();
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

  paginatorAction(event: TablePaginatorInterface): void {
    this.blogService.pageIndex = event.pageIndex;
    this.blogService.pageSize = event.pageSize;
    this.getAllPost();
  }

  private setInitTableValues(): void {
    this.blogService.pageIndex = this.blogService.initPageIndex;
    this.blogService.pageSize = this.blogService.initPageSize;
    this.blogService.tableLength = this.blogService.initTableLength;
  }
}
