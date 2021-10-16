import { Banco } from "../banco/banco";
import { CentroDeCusto } from "../centro-de-custo/centro-de-custo";

export class BancoLancamento {
	id!: number;
	banco!: Banco;
	data!: string;
	centroDeCusto!: CentroDeCusto;
	documento!: string;
	historico!: string;
	valor!: number;
	saldo!: number;
}
