import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { setupActions } from '../../../store/setup/setup.actions';
import {
  selectSetupState,
  selectUserProfile,
  selectUserProfileSetup,
} from '../../../store/setup/setup.reducers';
import { MatStepper } from '@angular/material/stepper';
import { ClientsService } from '../../data-access/clients.service';

@Component({
  selector: 'app-clients-setup',
  templateUrl: './clients-setup.component.html',
  styleUrls: ['./clients-setup.component.css'],
})
export class ClientsSetupComponent implements OnInit {
  store = inject(Store);
  clientsService = inject(ClientsService);
  isLoading$ = this.store.selectSignal(selectUserProfile);
  userProfile$ = this.store.selectSignal(selectUserProfileSetup);
  setupState$ = this.store.selectSignal(selectSetupState);
  @ViewChild('stepper') stepper!: MatStepper;

  ngOnInit() {
    this.clientsService.moveToNextStep$.subscribe(() => {
      this.stepper.next();
    });
  }




}
