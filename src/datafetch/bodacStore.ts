import axios, { AxiosResponse } from "axios";
import qs from "qs";
import { bodacRequest } from "../domain/bodacRequest";

export function useReadBodac(
  url: string
): [() => Promise<AxiosResponse<bodacRequest>>, string] {
  const instance = axios.create({
    baseURL: "https://bodacc-datadila.opendatasoft.com/api/records/1.0/search",
  });

  const call = () => {
    const params = {
      dataset: "annonces-commerciales",
      q: "497984146",
      limit: 10,
      // "refine.familleavis_lib" : "Procédures de conciliation"
      refine: { familleavis_lib: "Dépôts des comptes" },
      sort: "dateparution",
      facet: ["1", "2"],
    };
    const test = qs.stringify(params, {
      arrayFormat: "repeat",
      allowDots: true,
    });
    return instance.get(`?${test}`);
  };
  const test = "toto";
  return [call, test];
}
