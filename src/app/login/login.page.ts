import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonText, IonCard, IonCardContent, IonItem, IonButton, IonInput } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { 
  AlertController, 
  LoadingController, 
  ToastController 
} from '@ionic/angular';
import { IUserLogin } from '../interface/IUsers';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonInput, IonButton, IonItem, IonCardContent, IonCard, IonText, IonIcon, IonContent,  CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

 
  
  email: string = '';
  password: string = '';
 

  showPassword: boolean = false;
  private authService = inject(AuthService);
  private router = inject(Router);
  private loadingController = inject(LoadingController);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);
  loading:any;
  // Inyectar servicios de Ionic
  constructor(
  ) { }

  ngOnInit() {
    // Inicialización si es necesaria
  }

  /**
   * Toggle password visibility
   */
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async showLoading() {
     this.loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'crescent',

    });
    this.loading.present();
  }
  async presentAlert(message: string ) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Bienvenid@s, a Movies App',
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }
  async login() {
    this.showLoading();
    this.authService.login(this.email,this.password).subscribe({
      next: (response:IUserLogin) => {
        console.log('Login exitoso:', response);
        // Navegar a la página principal
        this.router.navigate(['/tabs/home']);
        this.loading.dismiss();
        this.presentToast();
      },
      error: (error) => {
        this.loading.dismiss();
        this.presentAlert(error.error.message);
        console.error('Error en el login:', error);
      }
    });








    
    // Validación básica
    // if (!this.email || !this.password) {
    //   await this.showAlert('Error', 'Por favor completa todos los campos');
    //   return;
    // }

    // if (!this.isValidEmail(this.email)) {
    //   await this.showAlert('Error', 'Por favor ingresa un email válido');
    //   return;
    // }

    // // Mostrar loading
    // const loading = await this.loadingController.create({
    //   message: 'Iniciando sesión...',
    //   spinner: 'crescent'
    // });
    // await loading.present();

    // try {
    //   // Aquí iría tu lógica de autenticación
    //   // Por ejemplo: await this.authService.login(this.email, this.password);
      
    //   // Simular una llamada a API
    //   await this.simulateAPICall();
      
    //   await loading.dismiss();
      
    //   // Mostrar toast de éxito
    //   await this.showToast('¡Bienvenido!', 'success');
      
    //   // Navegar a la página principal
    //   this.router.navigate(['/tabs/home']);
      
    // } catch (error) {
    //   await loading.dismiss();
    //   await this.showAlert('Error', 'Credenciales incorrectas. Inténtalo de nuevo.');
    // }
  }

  /**
   * Handle Google Sign In
   */
  async signInWithGoogle() {
    const loading = await this.loadingController.create({
      message: 'Conectando con Google...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      // Aquí iría tu lógica de Google Sign In
      // Por ejemplo: await this.googleAuth.signIn();
      
      await this.simulateAPICall();
      await loading.dismiss();
      
      await this.showToast('¡Conectado con Google!', 'success');
      this.router.navigate(['/tabs/home']);
      
    } catch (error) {
      await loading.dismiss();
      await this.showAlert('Error', 'No se pudo conectar con Google. Inténtalo de nuevo.');
    }
  }

  /**
   * Handle forgot password
   */
  async forgotPassword() {
    const alert = await this.alertController.create({
      header: 'Recuperar Contraseña',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Ingresa tu email',
          value: this.email
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Enviar',
          handler: async (data) => {
            if (data.email && this.isValidEmail(data.email)) {
              // Aquí iría tu lógica de reset password
              await this.showToast('Email de recuperación enviado', 'success');
            } else {
              await this.showAlert('Error', 'Por favor ingresa un email válido');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Navigate to sign up page
   */
  goToSignUp() {
    this.router.navigate(['/signup']);
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Show alert message
   */
  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  /**
   * Show toast message
   */
  private async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom',
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

  /**
   * Simulate API call delay
   */
  private simulateAPICall(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 2000);
    });
  }

}
