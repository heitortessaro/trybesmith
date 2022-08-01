// Converter para TS
// based on: https://stackoverflow.com/questions/68941867/typescript-error-when-adding-property-to-error-object-property-does-not-exi
class NewError extends Error {
  statusCode: number | undefined;
}

export default (statusCode: number, message:string) => {
  const error = new NewError(message);
  error.statusCode = statusCode;
  throw error;
};