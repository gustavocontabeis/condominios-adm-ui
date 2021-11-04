import { Apartamento } from "../apartamento/apartamento";
import { Faturamento } from "../faturamento/faturamento";
import { Pessoa } from "../pessoa/pessoa";

export class Totais {
	descricao!: string;
	valor!: number;
	juros!: number;
	multa!: number;
	total!: number;
}