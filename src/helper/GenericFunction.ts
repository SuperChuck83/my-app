// Validation d'un siret francais
export function isSiretValid(Siret?: string | null): boolean {
    if (!Siret) {
        return true;
    }

    let estValide: boolean = false;
    //algo siret validation ou pas,
    if ((Siret.length !== 14) || isNaN(Number(Siret))) {
        estValide = false;
    } else {
        // Donc le SIRET est un numérique à 14 chiffres
        // Les 9 premiers chiffres sont ceux du SIREN (ou RCS), les 4 suivants
        // correspondent au numéro d'établissement
        // et enfin le dernier chiffre est une clef de LUHN.
        let somme: number = 0;
        let tmp: number;
        let cpt: number = 0;
        for (cpt = 0; cpt < Siret.length; cpt++) {
            if ((cpt % 2) == 0) { // Les positions impaires : 1er, 3è, 5è, etc...
                tmp = parseInt(Siret.charAt(cpt)) * 2; // On le multiplie par 2
                if (tmp > 9) {
                    tmp -= 9;
                }	// Si le résultat est supérieur à 9, on lui soustrait 9
            } else {
                tmp = parseInt(Siret.charAt(cpt));
            }
            somme += tmp;
        }
        if ((somme % 10) == 0) {
            estValide = true;
        } else { // Si la somme est un multiple de 10 alors le SIRET est valide
            estValide = false;
        }
    }
    return estValide;
}