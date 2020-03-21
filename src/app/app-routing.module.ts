import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'home-results', loadChildren: './pages/home-results/home-results.module#HomeResultsPageModule' },
  { path: 'usuarios', loadChildren: './pages/users/users.module#UsersPageModule' },
  { path: 'users', loadChildren: './pages/users/users.module#UsersPageModule' },
  { path: 'trucks', loadChildren: './pages/trucks/trucks.module#TrucksPageModule' },
  { path: 'warehouses', loadChildren: './pages/warehouses/warehouses.module#WarehousesPageModule' },
  { path: 'create-users', loadChildren: './pages/create-users/create-users.module#CreateUsersPageModule' },
  { path: 'create-trucks', loadChildren: './pages/create-trucks/create-trucks.module#CreateTrucksPageModule' },
  { path: 'create-warehouses', loadChildren: './pages/create-warehouses/create-warehouses.module#CreateWarehousesPageModule' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
