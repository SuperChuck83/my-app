export interface bodacRequest {
    nhits: number,
    parameters : bodacParameters,
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
    fields :  bodacFields, 
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
    facet : bodacFacet, 
}


interface bodacFields {
    publicationavis: string,
    listepersonnes : string,
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
    divers:string,
    parutionavisprecedent: string


    modificationsgenerales: string,
}


export interface modificationGen {
    descriptif: string,
}

//non utilisé
interface bodacDepot {
    dateCloture: Date,
    typeDepot : string, 
}

export interface listepersonnes {
    personne: personne,
}
interface personne {
    typePersonne: string,
    adresseSiegeSocial: adresse,
    formeJuridique: string,
    numeroImmatriculation: immatriculation,
    denomination: string
}
interface adresse {
    ville: string,
    pays: string,
    typeVoie: string,
    codePostal: string,
    numeroVoie: string, 
    nomVoie: string
}

interface immatriculation {
    codeRCS: string,
    numeroIdentification: string,
    nomGreffeImmat: string,
}