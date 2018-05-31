export interface ContractTemplate {
  provider: string,
  providerId : string,
  name: string,
  details: string,
  conditions: ReadonlyArray<string>
}
