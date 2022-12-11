export default interface IBcryptProvider {
  encrypt(payloadToEncrypt: string): Promise<string>
  validate(payload: string, hashedPayload: string): Promise<boolean>
}