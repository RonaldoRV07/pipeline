/**
 * Lógica de negocio: cálculo del precio final de un producto.
 * ClickMarket Perú - API de catálogo (marketplace de productos usados).
 */

/**
 * Calcula el precio final de un producto de segunda mano según su
 * categoría y su estado de conservación.
 *
 * @param {number} precioBase - precio de referencia del producto (nuevo)
 * @param {"electronica"|"ropa"|"muebles"} categoria
 * @param {"como-nuevo"|"buen-estado"|"desgastado"} estado
 * @returns {{precioFinal: number, descuentoAplicado: number}}
 */
function calcularPrecioFinal(precioBase, categoria, estado) {
  if (typeof precioBase !== "number" || precioBase <= 0) {
    throw new Error("precioBase debe ser un número mayor a 0");
  }

  const descuentoPorCategoria = {
    electronica: 0.3,
    ropa: 0.5,
    muebles: 0.4,
  };

  const descuentoAdicionalPorEstado = {
    "como-nuevo": 0,
    "buen-estado": 0.1,
    desgastado: 0.25,
  };

  const descuentoCategoria = descuentoPorCategoria[categoria];
  const descuentoEstado = descuentoAdicionalPorEstado[estado];

  if (descuentoCategoria === undefined) {
    throw new Error(`Categoría no soportada: ${categoria}`);
  }
  if (descuentoEstado === undefined) {
    throw new Error(`Estado no soportado: ${estado}`);
  }

  const descuentoAplicado = Math.min(descuentoCategoria + descuentoEstado, 0.9);
  const precioFinal = Math.round(precioBase * (1 - descuentoAplicado));

  return { precioFinal, descuentoAplicado };
}

module.exports = { calcularPrecioFinal };
