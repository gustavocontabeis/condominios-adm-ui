export class Condominio {
    id!: number;
    nome!: string;
    logradouro!: string;
    numero!: string;
    bairro!: string | undefined;
    cidade!: string;
    sindico: any;
    blocos!: any[];
    faturamentos!: any[];
}
