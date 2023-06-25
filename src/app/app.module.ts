import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './main/nav/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BlogPostsComponent } from './main/blog-posts/blog-posts.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { SinglePostComponent } from './main/single-post/single-post.component';
import { DeletePostComponent } from './delete/delete-post/delete-post.component';
import { UpdatePostComponent } from './update/update-post/update-post.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatePostComponent } from './create/create-post/create-post.component';
import { CategoriesComponent } from './main/categories/categories.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateCategoryComponent } from './update/update-category/update-category.component';
import { DeleteCategoryComponent } from './delete/delete-category/delete-category.component';
import { CreateCategoryComponent } from './create/create-category/create-category.component';
import { DeleteUserComponent } from './delete/delete-user/delete-user.component';
import { DeleteUserGroupComponent } from './delete/delete-user-group/delete-user-group.component';
import { CreateUserComponent } from './create/create-user/create-user.component';
import { CreateGroupComponent } from './create/create-group/create-group.component';
import { UpdateGroupComponent } from './update/update-group/update-group.component';
import { UpdateUserComponent } from './update/update-user/update-user.component';
import { UsersComponent } from './main/users/users.component';
import { GroupsComponent } from './main/groups/groups.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BlogPostsComponent,
    SinglePostComponent,
    DeletePostComponent,
    UpdatePostComponent,
    CreatePostComponent,
    CategoriesComponent,
    UpdateCategoryComponent,
    DeleteCategoryComponent,
    CreateCategoryComponent,
    DeleteUserComponent,
    DeleteUserGroupComponent,
    CreateUserComponent,
    CreateGroupComponent,
    UpdateGroupComponent,
    UpdateUserComponent,
    UsersComponent,
    GroupsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
