import { Apartamento } from "../apartamento/apartamento";
import { Faturamento } from "../faturamento/faturamento";
import { Pessoa } from "../pessoa/pessoa";

export class Boleto {
	id!: number;
	apartamento!: Apartamento;
	faturamento!: Faturamento;
	titular!: Pessoa;
	vencimento!: string;
	pagamento!: string;
	valor!: number;
	juros!: number;
	multa!: number;
	total!: number;
}