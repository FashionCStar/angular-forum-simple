import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LeadProfileRoutingModule} from './lead-profile-routing.module';
import {LeadProfileComponent} from './lead-profile.component';
import {SmartadminLayoutModule} from '@app/shared/layout';
import {StatsModule} from '@app/shared/stats/stats.module';
import {ModalModule} from 'ngx-bootstrap/modal';
import {SharedModule} from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        SmartadminLayoutModule,
        StatsModule,
        LeadProfileRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot()
    ],
    declarations: [LeadProfileComponent]
})
export class LeadProfileModule {
}
