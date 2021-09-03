import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserdashboardComponent } from './pages/user/userdashboard/userdashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCatagoriesComponent } from './pages/admin/view-catagories/view-catagories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizesComponent } from './pages/admin/view-quizes/view-quizes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';



const routes: Routes = [
    {path:'',component:HomeComponent,pathMatch:'full'},
    {path:'signup',component:SignupComponent,pathMatch:'full'},
    {path:'login',component:LoginComponent,pathMatch:'full'},
    {
      path:'admin-dashboard',
      component:DashboardComponent,
      canActivate:[AdminGuard], 
      children:[

          {
            path:'',
            component:WelcomeComponent,
            canActivate:[AdminGuard]
          },
          {
            path:'profile',
            component:ProfileComponent,
            canActivate:[AdminGuard]
          },
          {
            path:'categories',
            component:ViewCatagoriesComponent,
            canActivate:[AdminGuard]
          },
          {
            path:'add-category',
            component:AddCategoryComponent,
            canActivate:[AdminGuard]
          },
          {
            path:'view-quizes',
            component:ViewQuizesComponent,
            canActivate:[AdminGuard]
          },
          {
            path:'add-quizes',
            component:AddQuizComponent,
            canActivate:[AdminGuard]
          },
          {
            path:'update-quiz/:quid',
            component:UpdateQuizComponent,
            canActivate:[AdminGuard]
          }

      ]

    },
    {path:'user-dashboard',component:UserdashboardComponent,pathMatch:'full',canActivate:[NormalGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
