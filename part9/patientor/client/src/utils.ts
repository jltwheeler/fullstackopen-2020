export const assertNever = (value: never): never => {
  throw new Error(`Unhandled member: ${JSON.stringify(value)}`);
};
