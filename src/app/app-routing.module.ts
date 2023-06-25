import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogPostsComponent } from './main/blog-posts/blog-posts.component';
import { CreatePostComponent } from './create/create-post/create-post.component';
import { CategoriesComponent } from './main/categories/categories.component';
import { UpdatePostComponent } from './update/update-post/update-post.component';
import { DeletePostComponent } from './delete/delete-post/delete-post.component';
import { UpdateCategoryComponent } from './update/update-category/update-category.component';
import { DeleteCategoryComponent } from './delete/delete-category/delete-category.component';
import { CreateCategoryComponent } from './create/create-category/create-category.component';
import { DeleteUserComponent } from './delete/delete-user/delete-user.component';
import { DeleteUserGroupComponent } from './delete/delete-user-group/delete-user-group.component';
import { SinglePostComponent } from './main/single-post/single-post.component';
import { CreateUserComponent } from './create/create-user/create-user.component';
import { CreateGroupComponent } from './create/create-group/create-group.component';
import { UpdateGroupComponent } from './update/update-group/update-group.component';
import { UpdateUserComponent } from './update/update-user/update-user.component';
import { UsersComponent } from './main/users/users.component';
import { GroupsComponent } from './main/groups/groups.component';

const routes: Routes = [
  { path: '', component: BlogPostsComponent },
  { path: 'blog', component: BlogPostsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'users', component: UsersComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'post/:id', component: SinglePostComponent },

  { path: 'createPost', component: CreatePostComponent },
  { path: 'createCategory', component: CreateCategoryComponent },
  { path: 'createUser', component: CreateUserComponent },
  { path: 'createGroup', component: CreateGroupComponent },

  { path: 'updatePost/:id', component: UpdatePostComponent },
  { path: 'updateCategory/:id', component: UpdateCategoryComponent },
  { path: 'updateUser/:id', component: UpdateUserComponent },
  { path: 'updateGroup/:id', component: UpdateGroupComponent },

  { path: 'deletePost/:id', component: DeletePostComponent },
  { path: 'deleteCategory/:id', component: DeleteCategoryComponent },  
  { path: 'deleteUser/:id', component: DeleteUserComponent},
  { path: 'deleteGroup/:id', component: DeleteUserGroupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
