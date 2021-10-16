import { Bloco } from "../bloco/bloco";
import { Morador } from "../morador/morador";
import { Pessoa } from "../pessoa/pessoa";

export class Apartamento {
	id!: number;
	numero!: string;
	moradores!: Morador[];
	bloco!: Bloco;
	proprietario!: Pessoa;
	titular!: Pessoa;
}