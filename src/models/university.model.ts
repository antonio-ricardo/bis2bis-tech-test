export namespace UniversityModel {
  export interface UniversityFromBisApi {
    'state-province': string | null;
    domains: string[];
    country: string;
    web_pages: string[];
    name: string;
    alpha_two_code: string;
  }

  export interface UniversityToMongo {
    state_province: string | null;
    domains: string[];
    country: string;
    web_pages: string[];
    name: string;
    alpha_two_code: string;
  }
}
