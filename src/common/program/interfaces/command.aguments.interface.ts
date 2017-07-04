export interface CommandArguments {}

export interface CreateCommandArguments extends CommandArguments {
  name: string
  destination?: string
}