export * from './mandate'

export function JoiValidate(schema, payload) {
  return schema.validate(payload)
}
