import { Boleto } from "../boleto/boleto";
import { Condominio } from "../condominio/condominio";

export class Faturamento {
	id!: number;
	periodo!: string;
	condominio!: Condominio;
	boletos!: Boleto[];
}
