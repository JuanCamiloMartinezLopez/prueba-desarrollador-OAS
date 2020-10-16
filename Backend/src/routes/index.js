const express = require("express");
const router = express.Router();

const fs = require("fs");
var data = fs.readFileSync("./src/data.json");
var cuadrangular = JSON.parse(data);

router.get("/equipos", (req, res) => {
  let equipos = Array;
  equipos = cuadrangular.equipos;
  equipos.sort(function (equipo1, equipo2) {
    if (
      equipo1.golesAfavor - equipo1.golesContra <
      equipo2.golesAfavor - equipo2.golesContra
    ) {
      return 1;
    } else if (
      equipo1.golesAfavor - equipo1.golesContra >
      equipo2.golesAfavor - equipo2.golesContra
    ) {
      return -1;
    }
    return 0;
  });
  res.json(equipos);
});

router.get("/partidos", (req, res) => {
  res.json(cuadrangular.partidos);
});

router.get("/partido/:id", (req, res) => {
  var id = req.params.id;
  res.json(cuadrangular.partidos[id]);
});

router.post("/equipo/:id/:nombre", (req, res) => {
  var id = req.params.id;
  var nombre = req.params.nombre;
  cuadrangular.equipos[id].nombre = nombre;
  var data = JSON.stringify(cuadrangular, null, 2);
  fs.writeFile("./src/data.json", data, finished);
  function finished(err) {
    console.log(err);
  }
  res.json(cuadrangular);
});

router.post("/partido/equipos/:id/", (req, res) => {
  var id = req.params.id;
  var info = req.body;
  console.log(info);
  if (cuadrangular.partidos[id].equipo1 === "") {
    cuadrangular.equipos.push({
      nombre: info.equipo1,
      golesAfavor: 0,
      golesContra: 0,
    });
    cuadrangular.partidos[id].Id1 = cuadrangular.equipos.length - 1;
  } else {
    cuadrangular.equipos[cuadrangular.partidos[id].Id1].nombre = info.equipo1;
  }
  cuadrangular.partidos[id].equipo1 = info.equipo1;
  if (cuadrangular.partidos[id].equipo2 === "") {
    cuadrangular.equipos.push({
      nombre: info.equipo2,
      golesAfavor: 0,
      golesContra: 0,
    });
    cuadrangular.partidos[id].Id2 = cuadrangular.equipos.length - 1;
  } else {
    cuadrangular.equipos[cuadrangular.partidos[id].Id2].nombre = info.equipo2;
  }
  cuadrangular.partidos[id].equipo2 = info.equipo2;

  var data = JSON.stringify(cuadrangular, null, 2);
  fs.writeFile("./src/data.json", data, finished);
  function finished(err) {
    console.log(err);
  }
  res.status(200);
  res.json({
    equipo1: cuadrangular.partidos[id].equipo1,
    equipo2: cuadrangular.partidos[id].equipo2,
    id1: cuadrangular.equipos.length - 2,
    id2: cuadrangular.equipos.length - 1,
  });
});

router.post("/partido/marcador/:id/", (req, res) => {
  var id = req.params.id;
  var info = req.body;
  console.log(info);
  cuadrangular.partidos[id].marcador1 = info.marcador1;
  var id1 = cuadrangular.partidos[id].Id1;
  cuadrangular.equipos[id1].golesAfavor =
    cuadrangular.equipos[id1].golesAfavor + info.marcador1;
  cuadrangular.equipos[id1].golesContra =
    cuadrangular.equipos[id1].golesContra + info.marcador2;

  cuadrangular.partidos[id].marcador2 = info.marcador2;
  var id2 = cuadrangular.partidos[id].Id2;
  cuadrangular.equipos[id2].golesAfavor =
    cuadrangular.equipos[id2].golesAfavor + info.marcador2;
  cuadrangular.equipos[id2].golesContra =
    cuadrangular.equipos[id2].golesContra + info.marcador1;
  var data = JSON.stringify(cuadrangular, null, 2);
  fs.writeFile("./src/data.json", data, finished);
  function finished(err) {
    console.log(err);
  }
  res.status(200);
  res.json(cuadrangular.partidos[id]);
});

router.post("/clasificarEquipo/", (req, res) => {
  var info = req.body;
  console.log("clasi", info);
  var idClas = info.idClas;
  var nEquipo = info.numE;
  var nombre = info.nombre;
  var idE = info.id;
  if (nEquipo === 1) {
    cuadrangular.partidos[idClas].equipo1 = nombre;
    cuadrangular.partidos[idClas].Id1 = idE;
  }
  if (nEquipo === 2) {
    cuadrangular.partidos[idClas].equipo2 = nombre;
    cuadrangular.partidos[idClas].Id2 = idE;
  }
  console.log(info);
  var data = JSON.stringify(cuadrangular, null, 2);
  fs.writeFile("./src/data.json", data, finished);
  function finished(err) {
    console.log(err);
  }
  res.status(200);
  res.json(cuadrangular.partidos[idClas]);
});

module.exports = router;
