import {ModuleWithProviders} from "@angular/core"
import {RouterModule, Routes} from "@angular/router";


export const routes: Routes = [
    {
        path: 'all-leads',
        loadChildren: './all-leads/all-leads.module#AllLeadsModule',
        data: {pageTitle: 'All Leads'}
    },
    {
        path: 'lead-profile',
        loadChildren: './lead-profile/lead-profile.module#LeadProfileModule',
        data: {pageTitle: 'Lead Profile'}
    },
];


export const routing = RouterModule.forChild(routes)
