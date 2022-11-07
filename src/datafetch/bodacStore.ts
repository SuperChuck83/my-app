import axios, { AxiosResponse } from "axios";
import qs from "qs";
import { bodacRequest } from "../domain/bodacRequest";

export function useReadBodac(
  url: string
): [(siret: string, refine: Object) => Promise<AxiosResponse<bodacRequest>>, string] {
  const instance = axios.create({
    baseURL: "https://bodacc-datadila.opendatasoft.com/api/records/1.0/search",
  });

  const call = (siret: string, refine : Object) => {
    const params = {
      dataset: "annonces-commerciales",
      q: siret,
      limit: 10,
      refine: refine,
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
