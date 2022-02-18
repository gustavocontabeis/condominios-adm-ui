import { CentroDeCusto } from "../centro-de-custo/centro-de-custo";
import { Condominio } from "../condominio/condominio";
import { Pessoa } from "../pessoa/pessoa";

export class Caixa {
	id!: number;
	condominio!: Condominio;
	pessoa!: Pessoa;
	data!: string;
	centroDeCusto!: CentroDeCusto;
	tipoDocumento!: string;
	para!: string;
	cpfCnpj!: string;
	descricao!: string;
	fluxo!: string;
	valor!: number;
	saldo!: number;
}
