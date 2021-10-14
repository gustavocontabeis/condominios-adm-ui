import { Apartamento } from "../apartamento/apartamento";
import { Pessoa } from "../pessoa/pessoa";

export class Morador {
	id!: number;
	pessoa!: Pessoa;
	proprietario!: boolean;
	apartamento!: Apartamento;
}
