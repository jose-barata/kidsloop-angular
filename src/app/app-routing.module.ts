import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./features/sign-in/sign-in.module').then((m) => m.SignInModule),
    },
    {
        path: 'create-account',
        pathMatch: 'full',
        loadChildren: () =>
            import('./features/create-account/create-account.module').then((m) => m.CreateAccountModule),
    },
    {
        path: 'reset-password',
        pathMatch: 'full',
        loadChildren: () =>
            import('./features/reset-password/reset-password.module').then((m) => m.ResetPasswordModule),
    },
    {
        path: '**',
        redirectTo: '',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
