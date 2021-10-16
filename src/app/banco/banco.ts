import { BancoLancamento } from "../banco-lancamento/banco-lancamento";
import { Condominio } from "../condominio/condominio";

export class Banco {
	id!: number;
	condominio!: Condominio;
	numero!: number;
	agencia!: string;
	conta!: string;
	tipo!: string;
	lancamentos!: BancoLancamento[];
}
