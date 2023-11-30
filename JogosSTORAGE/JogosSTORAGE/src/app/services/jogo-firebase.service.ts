import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Jogo } from '../model/entities/Jogo';

@Injectable({
  providedIn: 'root',
})
export class JogoFirebaseService {
  private PATH: string = 'jogos';

  constructor(private firebase: AngularFirestore) {}

  getJogoById(id: string) {
    return this.firebase.collection(this.PATH).doc(id).valueChanges();
  }

  getJogoByName(name: string) {
    return this.firebase
      .collection(this.PATH, (ref) => ref.where('nome', '==', name))
      .valueChanges();
  }

  getAllJogos() {
    return this.firebase.collection(this.PATH).snapshotChanges();
  }

  addJogo(jogo: Jogo) {
    return this.firebase.collection(this.PATH).add({
      nome: jogo.nome,
      dataLancamento: jogo.dataLancamento,
      genero: jogo.genero,
      plataforma: jogo.plataforma,
      numJogadores: jogo.numJogadores,
    });
  }


  editJogo(jogo: Jogo, id: string) {
    return this.firebase.collection(this.PATH).doc(id).update({
      nome: jogo.nome,
      dataLancamento: jogo.dataLancamento,
      genero: jogo.genero,
      plataforma: jogo.plataforma,
      numJogadores: jogo.numJogadores,
    });
  }

  deleteJogo(id: string) {
    return this.firebase.collection(this.PATH).doc(id).delete();
  }
}
