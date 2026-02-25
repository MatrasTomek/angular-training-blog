import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogService } from './blog.service';
import { GetPostInterface } from '../interfaces/get-post.interface';
import { MatTableDataSource } from '@angular/material/table';
import { PostInterface } from '../interfaces/post.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  constructor(
    private blogService: BlogService,
    private router: Router,
  ) {}

  displayedColumns: string[] = [
    'id',
    'text',
    'createdDateTime',
    'author',
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

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  deletePost(id: number): void {
    console.log(id);
  }

  goToPost(id: number): void {
    this.router.navigate([`/one-post/${id}`]);
  }
}
