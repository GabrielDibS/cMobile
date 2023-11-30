import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Jogo } from 'src/app/model/entities/Jogo';
import { JogoFirebaseService } from 'src/app/services/jogo-firebase.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  public nome :string;
  public telefone : number;
  public dataLancamento: number;
  public genero: string;
  public plataforma: string;
  public numJogadores: number;
  public imagem : any;


  constructor(private alertController: AlertController,
    private router : Router,
    private firebase: JogoFirebaseService)  { }

  ngOnInit() {
  }

 public uploadFile(imagem: any){
  this.imagem = imagem.files;
 }

  cadastrar(){
    if(this.nome && this.telefone && this.dataLancamento && this.genero && this.plataforma && this.numJogadores && this.imagem){
      let novo: Jogo = new Jogo(this.nome, this.dataLancamento);
      novo.genero = this.genero;
      novo.plataforma = this.plataforma;
      novo.numJogadores = this.numJogadores;
      this.firebase.addJogo(novo);
      this.router.navigate(['home'])
      if(this.imagem){
        this.firebase.uploadImage(this.imagem, novo);
      }else{
        this.firebase.create(novo);
      }
      this.presentAlert("Sucesso", "Jogo cadastrado com sucesso!");
      this.router.navigate(["/home"]);
    }else{
     this.presentAlert("Erro", "Todos os campos são obrigatórios!");
    }
  }

  async presentAlert(subHeader : string, message : string) {
    const alert = await this.alertController.create({
      header: 'Cadastro de Jogo',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
