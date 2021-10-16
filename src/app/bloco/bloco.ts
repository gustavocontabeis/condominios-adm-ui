import { Apartamento } from "../apartamento/apartamento";
import { Condominio } from "../condominio/condominio";

export class Bloco {
	id!: number;
	nome!: string;
	tipo!: string;
	condominio!: Condominio;
	apartamentos!: Apartamento[];
}