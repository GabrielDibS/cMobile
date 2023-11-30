import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Jogo } from 'src/app/model/entities/Jogo';
import { JogoFirebaseService } from 'src/app/services/jogo-firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public listajogos : Jogo[] = [];

  constructor(private firesabe : JogoFirebaseService,
    private router : Router) {

      this.firesabe.read()
      .subscribe(res => {
        this.listajogos = res.map(jogo =>{
          return{
            id: jogo.payload.doc.id,
            ... jogo.payload.doc.data() as any
          }as Jogo;
        })
      })
    }


  irParaCadastrar(){
    this.router.navigate(["/cadastrar"]);
  }

  editar(jogo : Jogo){
    this.router.navigateByUrl("/detalhar", {state : {jogo:jogo}});
  }

}
