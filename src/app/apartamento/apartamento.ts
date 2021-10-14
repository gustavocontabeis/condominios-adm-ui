import { Bloco } from "../bloco/bloco";

export class Apartamento {
	id!: number;
	numero!: string;
	moradores!: any[];
	bloco!: Bloco;
	proprietario!: any;
	titular!: any;
}