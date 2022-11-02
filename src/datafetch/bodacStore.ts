import axios from "axios";

export function useReadBodac(url: string): [Function, string] {

    const instance = axios.create({
        baseURL: 'https://bodacc-datadila.opendatasoft.com/api/records/1.0/search',
      });

    const call = () => {

        return instance.get('', {
            params: {
              dataset:"annonces-commerciales",
              q: "497984146",
              limit: 10,
            }
          })

    }
    const test = "toto";
    return [call,test];
}