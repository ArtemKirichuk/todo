import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'task', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule) },
  { path: '', loadChildren: () => import('./startpage/startpage.module').then(m => m.StartpageModule) }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
