export class Jogo {
  private _id!: string;
  private _nome: string;
  private _dataLancamento: number;
  private _genero!: string;
  private _plataforma!: string;
  private _numJogadores!: number;


  constructor(nome: string, dataLancamento: number) {
    this._nome = nome;
    this._dataLancamento = dataLancamento;
  }


  public get id(): string {
    return this._id;
  }

  public get nome(): string {
    return this._nome;
  }

  public get dataLancamento(): number {
    return this._dataLancamento;
  }

  public get genero(): string {
    return this._genero;
  }

  public get plataforma(): string {
    return this._plataforma;
  }

  public get numJogadores(): number {
    return this._numJogadores;
  }

  public set nome(nome: string) {
    this._nome = nome;
  }

  public set dataLancamento(dataLancamento: number) {
    this._dataLancamento = dataLancamento;
  }

  public set genero(genero: string) {
    this._genero = genero;
  }

  public set plataforma(plataforma: string) {
    this._plataforma = plataforma;
  }

  public set numJogadores(numJogadores: number) {
    this._numJogadores = numJogadores;
  }
}
