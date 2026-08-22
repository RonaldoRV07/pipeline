const express = require("express");
const { calcularPrecioFinal } = require("./catalogo");

const app = express();
const PORT = process.env.PORT || 3000;

// Catálogo simulado (en un caso real vendría de una base de datos)
const productosSimulados = {
  "CM-01": { precioBase: 1200, categoria: "electronica", estado: "buen-estado" },
  "CM-02": { precioBase: 80, categoria: "ropa", estado: "como-nuevo" },
  "CM-03": { precioBase: 500, categoria: "muebles", estado: "desgastado" },
};

app.get("/", (req, res) => {
  res.json({ servicio: "ClickMarket Catálogo API", estado: "operativo" });
});

// Endpoint: GET /productos/:id/precio-final
app.get("/productos/:id/precio-final", (req, res) => {
  const producto = productosSimulados[req.params.id];

  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  const resultado = calcularPrecioFinal(
    producto.precioBase,
    producto.categoria,
    producto.estado
  );

  res.json({ id: req.params.id, ...resultado });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`ClickMarket Catálogo API escuchando en el puerto ${PORT}`);
  });
}

module.exports = app;
