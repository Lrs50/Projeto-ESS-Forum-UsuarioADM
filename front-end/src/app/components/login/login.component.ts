import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { AppState, changeUserInfo, changeUserLoggedStatus } from 'src/app/app.store'
import { User } from '../../../../../common/types'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    validateForm!: FormGroup

    submitForm(): void {
        if (this.validateForm.valid) {
            console.log('submit', this.validateForm.value)
            this.store.dispatch(changeUserInfo({ payload: { id: 'fake-id', name: this.validateForm.value.userName, type: 'admin' } as User }))
            this.store.dispatch(changeUserLoggedStatus({ payload: true }))
            this.router.navigateByUrl('/home')
        } else {
            Object.values(this.validateForm.controls).forEach((control) => {
                if (control.invalid) {
                    control.markAsDirty()
                    control.updateValueAndValidity({ onlySelf: true })
                }
            })
        }
    }

    constructor(private fb: FormBuilder, private router: Router, private store: Store<{ app: AppState }>) {}

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            userName: [null, [Validators.required]],
            password: [null, [Validators.required]],
        })
    }
}
