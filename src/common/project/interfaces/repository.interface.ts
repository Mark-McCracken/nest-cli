export interface Repository {
  clone(): Promise<void>
  cloneV2(origin: string, destination: string): Promise<void>
}
