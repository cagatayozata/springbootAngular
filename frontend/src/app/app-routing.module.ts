import { AuthGuardService } from './services/auth.guard';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { SearchComponent } from './pages/search/search.component';
import { NewuserComponent } from './pages/newuser/newuser.component';

const routes: Routes = [

  { path: "users", component: UsersComponent },
  { path: "", component: HomepageComponent },
  { path: "search", component: SearchComponent },
  { path: "add", component: NewuserComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
