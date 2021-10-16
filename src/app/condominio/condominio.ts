import { Bloco } from "../bloco/bloco";
import { Faturamento } from "../faturamento/faturamento";

export class Condominio {
    id!: number;
    nome!: string;
    logradouro!: string;
    numero!: string;
    bairro!: string | undefined;
    cidade!: string;
    sindico: any;
    blocos!: Bloco[];
    faturamentos!: Faturamento[];
}
