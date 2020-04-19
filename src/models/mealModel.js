const dbCtrl = require("../ctrls/dbCtrl");

async function create(meal) {
    //create the meal
    let query = {
        text: "INSERT INTO comidas(nombre, horaComida, idElemento, tipoDia) values($1, $2, $3, $4) RETURNING idComida",
        values: [meal.nombre, meal.horaComida, meal.idElemento, meal.tipoDia]
    }
    idMeal = await dbCtrl.execute(query);
    return idMeal;

}

async function del(idComida) {
    let query = {
        text: "DELETE FROM comidas WHERE idComida = $1",
        values: [idComida]
    }
    await dbCtrl.execute(query);
}

async function update(newComida, idComida) {
    let query = {
        text: "UPDATE comidas SET nombre = $2 ,horaComida = $3 WHERE idComida = $1",
        values: [idComida, newComida.nombre, newComida.horaComida]
    }
    await dbCtrl.execute(query);
}

module.exports = {
    create, del, update
}