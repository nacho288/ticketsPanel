import { Component, OnInit } from '@angular/core';
import { ConectionsService } from 'src/app/services/conections.service';
import { ToastrService } from 'ngx-toastr';
import { UsuariosDataService } from 'src/app/services/usuarios-data.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {

  resetPack = {
    password: null,
    resetPass: null,
    resetPass_confirmation: null
  }

  constructor(
    private conections: ConectionsService,
    private toastr: ToastrService,
    public usuarios: UsuariosDataService
  ) { }

  sendReset = () => {

    if (!this.resetPack.password) {
      this.toastr.error('Debe completarse el campo de contraseña actual', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (!this.resetPack.resetPass) {
      this.toastr.error('Debe completarse el campo de contraseña nueva', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (this.resetPack.resetPass != this.resetPack.resetPass_confirmation) {
      this.toastr.error('la confirmación de contraseña no es correcta', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }
    this.conections.resetPassword(this.resetPack);
    this.limpiarReset();
  }

  limpiarReset = () => {
    this.resetPack = {
      password: null,
      resetPass: null,
      resetPass_confirmation: null,
    }
  }

  ngOnInit() {
  }

}
