/**
 * Sobrescreve um getter. Desnecessário qdo publicarem isto:
 * https://github.com/jasmine/jasmine/issues/943
 * @param target objeto que possui o getter
 * @param getter nome do getter
 * @param mock função que deve ser executada ao invés da original
 */
export function mockGetter(target: any, getter: PropertyKey, mock: () => any) {
  const spy = jasmine.createSpy(`'get ${getter.toString()}'`).and.callFake(mock);
  Object.defineProperty(
    Object.getPrototypeOf(target),
    getter,
    { get: spy },
  );
  return spy;
}
