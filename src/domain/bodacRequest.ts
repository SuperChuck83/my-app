export interface bodacRequest {
    nhits: number,
    parameters: bodacParameters,
    records: bodacRecords[],
    facet_groups: bodacFacetGroups[];
}

interface bodacParameters {
    dataset: string[],
    rows: number,
    start: number,
    facet: string[],
    format: string,
    timezone: string,
}


export interface bodacRecords {
    datasetid: string,
    recordid: string,
    fields: bodacFields,
    record_timestamp: Date
}


interface bodacFacet {
    name: string,
    count: number,
    state: string,
    path: string
}

interface bodacFacetGroups {
    name: string,
    facet: bodacFacet,
}


interface bodacFields {
    publicationavis: string,
    listepersonnes: string,
    jugement: string,
    id: string,
    registre: string,
    depot: string,
    ville: string,
    ispdf_unitaire: string,
    cp: string,
    region_nom_officiel: string,
    commercant: string,
    dateparution: string,
    tribunal: string,
    pdf_parution_subfolder: number,
    region_code: number,
    numeroannonce: number,
    parution: string,
    publicationavis_facette: string,
    typeavis_lib: string,
    typeavis: string,
    familleavis_lib: string,
    familleavis: string,
    departement_nom_officiel: string,
    numerodepartement: string,

    //depot des comptes uniquement
    listeprecedentexploitant: string,
    //vente et cessions 
    listeprecedentproprietaire: string,
    divers: string,
    parutionavisprecedent: string,


    modificationsgenerales: string,
    acte : string,

    listeetablissements: string, 

    //radiation seulement 
    radiationaurcs: string


}


export interface radiationaurcs {
    radiationPP: radiationPP, 
    radiationPM: string,

}
export interface radiationPP {
    dateCessationActivitePP: string, 
}

export interface listeetablissements {
    etablissement: etablissement, 

}
export interface etablissement {
    qualiteEtablissement: string, 
    adresse: adresse, 
    activite: string, 
    origineFonds: string

}


export interface acte {
    dateImmatriculation: string,
    descriptif: string, 
    dateCommencementActivite: string,
    immatriculation: immatriculation_acte, 
    creation: creation,
    vente: vente_acte

}


export interface creation {
    categorieCreation: string,
}


export interface vente_acte {
    publiciteLegale: publiciteLegale,
    categorieVente: string,
    opposition: string,
}

export interface publiciteLegale {
    date: string,
    titre: string
}



export interface immatriculation_acte {
    categorieImmatriculation: string,
}


export interface modificationGen {
    descriptif: string,
}

//non utilisé
interface bodacDepot {
    dateCloture: Date,
    typeDepot: string,
}

export interface listepersonnes {
    personne: personne,
}
interface personne {
    typePersonne: string,
    adresseSiegeSocial: adresse,
    formeJuridique: string,
    numeroImmatriculation: immatriculation,
    denomination: string,

    //pour pp 
    nom: string,
    prenom: string,
    adressePP: adresse,
    activite: string,
    enseigne: string,



}
export interface adresse {
    ville: string,
    pays: string,
    typeVoie: string,
    codePostal: string,
    numeroVoie: string,
    nomVoie: string,
    complGeographique: string
}

interface immatriculation {
    codeRCS: string,
    numeroIdentification: string,
    nomGreffeImmat: string,
}


export interface jugementData {
    date: string,
    complementJugement: string,
    type: string,
    famille: string,
    nature: string,




}