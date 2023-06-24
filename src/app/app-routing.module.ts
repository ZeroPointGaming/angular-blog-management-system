import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogPostsComponent } from './blog-posts/blog-posts.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { CategoriesComponent } from './categories/categories.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { DeletePostComponent } from './delete-post/delete-post.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import { CreateCategoryComponent } from './create-category/create-category.component';

const routes: Routes = [
  { path: '', component: BlogPostsComponent },
  { path: 'blog', component: BlogPostsComponent },
  { path: 'createPost', component: CreatePostComponent },
  { path: 'createCategory', component: CreateCategoryComponent },
  { path: 'updatePost/:id', component: UpdatePostComponent },
  { path: 'deletePost/:id', component: DeletePostComponent },
  { path: 'updateCategory/:id', component: UpdateCategoryComponent },
  { path: 'deleteCategory/:id', component: DeleteCategoryComponent },
  { path: 'categories', component: CategoriesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
