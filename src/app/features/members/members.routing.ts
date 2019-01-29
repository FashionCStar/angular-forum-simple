import {ModuleWithProviders} from "@angular/core"
import {RouterModule, Routes} from "@angular/router";


export const routes: Routes = [
    {
        path: 'all-members',
        loadChildren: './all-members/all-members.module#AllMembersModule',
        data: {pageTitle: 'All Members'}
    },
    {
        path: 'member-profile',
        loadChildren: './member-profile/member-profile.module#MemberProfileModule',
        data: {pageTitle: 'Member Profile'}
    },
];


export const routing = RouterModule.forChild(routes)
