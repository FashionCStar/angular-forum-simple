import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MemberProfileComponent} from "./member-profile.component";

const routes: Routes = [{
    path: '',
    component: MemberProfileComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class MemberProfileRoutingModule {
}
