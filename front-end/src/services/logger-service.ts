export const loggerService = {
  log: (payload: unknown) => {
    console.log({ dateTime: new Date().toISOString(), payload });
  },
};
