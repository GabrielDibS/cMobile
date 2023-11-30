import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Jogo } from 'src/app/model/entities/Jogo';
import { JogoFirebaseService } from 'src/app/services/jogo-firebase.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  jogo: Jogo;
  nome: string;
  dataLancamento: number;
  genero: string;
  numJogadores: number;
  plataforma: string;
  edicao: boolean = true;
  public imagem : any;

  constructor(private router: Router,
    private firebase: JogoFirebaseService) { }

  ngOnInit() {
    this.jogo = history.state.jogo;
    this.nome = this.jogo.nome;
    this.dataLancamento = this.jogo.dataLancamento;
    this.genero = this.jogo.genero;
    this.numJogadores = this.jogo.numJogadores;
    this.plataforma = this.jogo.plataforma;
  }

  habilitar(){
    if(this.edicao){
      this.edicao = false;
    }else{
      this.edicao = true;
    }
  }

  public uploadFile(imagem: any){
    this.imagem = imagem.files;
   }

  editar(){
    let novo: Jogo = new Jogo(this.nome, this.dataLancamento, this.genero, this.numJogadores, this.plataforma);
    novo.id = this.jogo.id;
    if(this.imagem){
      this.firebase.uploadImage(this.imagem, novo);
    }else{
      novo.downloadURL = this.jogo.downloadURL;
      this.firebase.update(novo, this.jogo.id);
    }
    this.router.navigate(["/home"]);
  }

  excluir(){
    this.firebase.delete(this.jogo);
    this.router.navigate(["/home"]);
  }

}
