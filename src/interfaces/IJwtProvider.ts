export default interface IJwtProvider {
  generate(payload: string | object): string
}