//Declaracion inputs
const id  = document.getElementById('id');
const nombre = document.getElementById('nombre');
const idVoto = document.getElementById('idVoto');
const btnRegistro = document.getElementById('btnRegistro');
const btnVoto = document.getElementById('btnVoto');
//Firebase
var database = firebase.database();

const registrar = () => {
    let id_2 = id.value;
    let nombre_2 = nombre.value;
}

let objVotante = {
    id: id_2,
    nombre : nombre_2
}

let json = JSON.stringify(objVotante);

database.ref('candidatos').push().set(objVotante);


//Accion botones
btnRegistro.addEventListener('click',registrar);


console.log(objVotante);