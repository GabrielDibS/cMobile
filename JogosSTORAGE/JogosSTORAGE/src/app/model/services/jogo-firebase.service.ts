import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Jogo } from '../model/entities/Jogo';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class JogoFirebaseService {
  private PATH: string = 'jogos';

  constructor(private firebase: AngularFirestore) {}
  read(){
    return this.firestore.collection(this.PATH)
    .snapshotChanges();
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

  createWithImage(jogo: Jogo){
    return this.firestore.collection(this.PATH)
    .add({nome: contato.nome, telefone: contato.telefone,
    downloadURL : contato.downloadURL});
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

  updateWithImage(jogo: Jogo, id: string){
    return this.firestore.collection(this.PATH).doc(id)
    .update({nome: contato.nome, telefone: contato.telefone,
      downloadURL : contato.downloadURL});
  }
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
  deleteJogo(id: string) {
    return this.firebase.collection(this.PATH).doc(id).delete();
  }
  uploadImage(imagem: any, contato: Contato){
    const file = imagem.item(0);
    if(file.type.split('/')[0] !== 'image'){
      console.error('Tipo Não Suportado');
      return;
    }
    const path = `images/${contato.nome}_${file.name}`;
    const fileRef = this.storage.ref(path);
    let task = this.storage.upload(path,file);
    task.snapshotChanges().pipe(
      finalize(()=>{
        let uploadedFileURL = fileRef.getDownloadURL();
        uploadedFileURL.subscribe(resp=>{
          contato.downloadURL = resp;
          if(!contato.id){
            this.createWithImage(contato);
          }else{
            this.updateWithImage(contato, contato.id);
          }
        })
       })).subscribe();

  }
}
