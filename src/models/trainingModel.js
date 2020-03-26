const dbCtrl = require("../ctrls/dbCtrl");

async function del(idElemento) {
    let query = {
        text: "DELETE FROM elementos WHERE idElemento = $1",
        values: [idElemento]
    }
    await dbCtrl.execute(query);
}

async function create(training, idUser) {
    let query = {
        text: "INSERT INTO elementos(nombre, descripcion, idUsuario) values($1, $2, $3)",
        values: [training.nombre, training.descripcion, idUser]
    }
    await dbCtrl.execute(query);

    let queryGetID = {
        text: "SELECT idElemento \
                FROM elementos \
                WHERE nombre = $1 and idUsuario = $2",
        values: [training.nombre, idUser],
    };
    let res = (await dbCtrl.execute(queryGetID)).rows[0];
    let idElem = res.idelemento;


    query = {
        text: "INSERT INTO entrenamientos(idElemento) values($1)",
        values: [idElem],
    }
    await dbCtrl.execute(query);
}

module.exports = {
    del,
    create
}