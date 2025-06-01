export const serializeBigInts = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(serializeBigInts);
  }

  if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        typeof value === "bigint" ? value.toString() : serializeBigInts(value)
      ])
    );
  }

  return obj;
};
