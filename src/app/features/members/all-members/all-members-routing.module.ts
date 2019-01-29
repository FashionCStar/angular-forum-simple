import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AllMembersComponent} from "./all-members.component";

const routes: Routes = [{
    path: '',
    component: AllMembersComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AllMembersRoutingModule {
}
