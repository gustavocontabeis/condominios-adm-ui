import { Condominio } from "../condominio/condominio";

export class Bloco {
	id!: number;
	nome!: string;
	tipo!: string;
	condominio!: Condominio;
	apartamentos!: any[];
}