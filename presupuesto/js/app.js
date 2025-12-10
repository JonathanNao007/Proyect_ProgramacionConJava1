//>>>>>>>>>>>>Declaraciones<<<<<<<<<<<<<<
let listaIngresos = [];
let listaEgresos = [];
let valorTotalIngresos = 0;
let valorTotalEgresos = 0;
let presupuestoDisponible = 0;
let porcentajeEgreso = 0;

const agregarBtn = document.getElementById('agregar');
const agregarForm = document.getElementById('forma');
//>>>>>>>>>>>>Formato numerico<<<<<<<<<<<<<<
const opciones = {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true 
};
const opcionesPorcent = {
    style: 'percent',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: false 
};
const formatter = new Intl.NumberFormat('es-MX', opciones);
const formatterPorcent = new Intl.NumberFormat('es-MX', opcionesPorcent);
//>>>>>>>>>>>>Funciones<<<<<<<<<<<<<<
const cargaCabecero = () => {       
    presupuestoDisponible = totalIngresos() - totalEgresos();
    porcentajeEgreso = formatterPorcent.format(valorTotalEgresos/valorTotalIngresos);
    setTextInnerHtmlId('presupuesto-disponible', formatter.format(presupuestoDisponible));
    setTextInnerHtmlId('resumen-Ingresos', formatter.format(valorTotalIngresos));
    setTextInnerHtmlId('resumen-egresos', formatter.format(valorTotalEgresos));
    setTextInnerHtmlId('resumen-porcentaje-egresos', porcentajeEgreso);
};

const totalIngresos = () => {
    valorTotalIngresos = 0;
    Object.values(listaIngresos).forEach((i)=> {
        valorTotalIngresos += i.valor;
    });
    return valorTotalIngresos;
};

const totalEgresos= () => {
    valorTotalEgresos = 0;
    Object.values(listaEgresos).forEach((e)=>{
        valorTotalEgresos += e.valor;
    });
    return valorTotalEgresos;
};

function setTextInnerHtmlId(id,text){
    document.getElementById(id).innerHTML = text;
};

const AgregarDato = () => {
    var tipo = agregarForm.elements['selectTipo'].value;
    var descripcion = agregarForm.elements['descripcion'].value;
    var valor = agregarForm.elements['valor'].value;
    //Validacion
    if(ValidaElementos(descripcion, valor)){
        return;
    }
    //Agregando dato
    if(tipo === "ingreso"){
        listaIngresos.push(new Ingreso(descripcion.trim(), Number.parseInt(valor)));
    }
    else{
        listaEgresos.push(new Egreso(descripcion.trim(), Number.parseInt(valor)));
    }
    cargaCabecero();
    CleanForm();
};

function ValidaElementos(descripcion, valor){
    if(!descripcion){
        alert('Ingresa una descripción, para el nuevo ingreso o egreso.');
        return true;
    }
    if(!valor > 0){
        alert('El valor debe ser mayor a cero.')
        return true;
    }
    return false;
}

function CleanForm(){
    agregarForm.elements['selectTipo'].value = 'ingreso';
    agregarForm.elements['descripcion'].value = '';
    agregarForm.elements['valor'].value = '';
}
//>>>>>>>>>>>>Eventos<<<<<<<<<<<<<<
document.addEventListener('DOMContentLoaded', function(){
    listaIngresos.push(new Ingreso('Salario', 10000));
    listaIngresos.push(new Ingreso('Venta Coche', 1500));
    listaEgresos.push(new Egreso('Renta departamento', 1900));
    listaEgresos.push(new Egreso('Ropa', 400)); 
    cargaCabecero();
    //
    console.log('App lista para interacción.')
});
agregarBtn.addEventListener('click', ()=>{
    console.log('Entrando al evento click del boton agregar...');
    AgregarDato();
});
