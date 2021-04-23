//Declaracion inputs
const id  = document.getElementById('id');
const nombre = document.getElementById('nombre');
const idVoto = document.getElementById('idVoto');
const btnRegistro = document.getElementById('btnRegistro');
const btnVoto = document.getElementById('btnVoto');
const btnCandi = document.getElementById('btnCandi');
const btnVota = document.getElementById('btnVota');

//Firebase
var database = firebase.database();

const registrar = () => {
    let id_2 = id.value;
    let nombre_2 = nombre.value;

   database.ref('candidatos/'+id_2).get().then((data)=>{
       let candis = data.val(); //objeto que esta contenido de la rama

       if(candis !== null){
           alert('Este candidato ya se encuentra inscrito');
       }else{
           alert('Registro con exito');
           let objVotante = {
               id_2 : id_2,
               nombre_2 : nombre_2
           };
           database.ref('candidatos/'+id_2).set(objVotante);
       }
   })
   // let json = JSON.stringify(objVotante);
    }

const votar = () => {
    console.log('entra');
    let idVoto_2 = idVoto.value;

    database.ref('candidatos/'+idVoto_2).get().then((data)=>{
        let valiId = data.val();

        if(valiId !== null){
            let objVoto = {
                idVoto_2 : idVoto_2
            };
            console.log(idVoto_2);
            alert('Su voto por el candidato '+ idVoto_2 + ' ha sido exitoso');

            database.ref('numVotos/'+idVoto_2).push().set(objVoto);
        }else{
            alert('Este candidato no esta registrado');
        }
    }) 

}

const verCandidatos = () => {
    database.ref('candidatos').get().then((data)=>{
        let listaCandi = '';

        data.forEach(function(element){
            let candidatos = element.val();
            listaCandi += candidatos.nombre_2 + " " + candidatos.id_2 + "\n";
        })
        alert(listaCandi);
    })
}

const verVotos = () => {
    let id2_2 = idVoto.value;
    
    database.ref('numVotos').get().then((data)=>{ //data es un conjunto de elementos

        let listaConteoVotos = '';
        let nCandis = '';
        let listaV = [];
        let listaK = [];
        let total = 0;

        data.forEach(function(element){//recorremos el conjunto de todos los obj - es una iteracion
            let nCandis = element.numChildren();
            //console.log('pase por aqui');
            // idCandidato = idesCandis.idVoto_2;
            listaV.push(nCandis); //cantidad de votos que tiene c/u
            total += nCandis;
            console.log(element.key);
            let key = element.key;
            listaK.push(key);
            console.log(element.key + " " + nCandis);
            //console.log(nCandis + 'soy el arreglo');
            //llamar a la rama de candidatos
            
        })
        console.log(total + 'total');
        
        for(let i = 0; i<listaV.length;i++){
            let porcentaje = (listaV[i]/total)*100; 
            listaConteoVotos += listaK[i] + " " + porcentaje + "%" +"\n";          
        }
        alert(listaConteoVotos);
    })

}

//Accion botones
btnRegistro.addEventListener('click',registrar);
btnVoto.addEventListener('click',votar);
btnCandi.addEventListener('click', verCandidatos);
btnVota.addEventListener('click',verVotos);
