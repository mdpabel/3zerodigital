declare module 'psl' {
  export interface ParsedDomain {
    tld: string | null;
    sld: string | null;
    domain: string | null;
    subdomain: string | null;
  }
  const psl: {
    parse(domain: string | null): ParsedDomain;
    get(domain: string | null): string | null;
    isValid(domain: string | null): boolean;
  };
  export default psl;
}
