const { calcularPrecioFinal } = require("../src/catalogo");

describe("calcularPrecioFinal", () => {
  test("un producto de electrónica en buen estado aplica el descuento correcto", () => {
    const resultado = calcularPrecioFinal(1000, "electronica", "buen-estado");
    expect(resultado.descuentoAplicado).toBeCloseTo(0.4);
    expect(resultado.precioFinal).toBe(600);
  });

  test("un producto como-nuevo no suma descuento adicional por estado", () => {
    const resultado = calcularPrecioFinal(1000, "ropa", "como-nuevo");
    expect(resultado.descuentoAplicado).toBeCloseTo(0.5);
  });

  test("debe lanzar un error si la categoría no existe", () => {
    expect(() =>
      calcularPrecioFinal(1000, "categoria-invalida", "buen-estado")
    ).toThrow();
  });

  test("debe lanzar un error si el precio base no es válido", () => {
    expect(() => calcularPrecioFinal(-10, "ropa", "buen-estado")).toThrow();
  });

  // TODO (estudiantes): agreguen al menos 1 prueba adicional que cubra
  // el caso "desgastado" antes de continuar con la etapa de despliegue.
});
