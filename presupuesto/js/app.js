//>>>>>>>>>>>>Declaraciones<<<<<<<<<<<<<<
let listaIngresos = [];
let listaEgresos = [];
let valorTotalIngresos = 0;
let valorTotalEgresos = 0;
let presupuestoDisponible = 0;
let porcentajeEgreso = 0;
let textLayoutIngresos = '';
let textLayoutEgresos = '';

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
    porcentajeEgreso = formatterPorcent.format((isNaN(valorTotalEgresos/valorTotalIngresos) ? 0 : (valorTotalEgresos/valorTotalIngresos)));
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
    LimpiaForm();
    GeneraListaIngresos();
    GeneraListaEgresos();
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

function LimpiaForm(){
    agregarForm.elements['selectTipo'].value = 'ingreso';
    agregarForm.elements['descripcion'].value = '';
    agregarForm.elements['valor'].value = '';
}

const GeneraListaIngresos = () =>{
    textLayoutIngresos = '';
    setTextInnerHtmlId('lista-ingresos', '');
    Object.values(listaIngresos).forEach((i)=> {
        textLayoutIngresos += `<div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${i.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">+ ${formatter.format(i.valor)}</div>
                        <div class="elemento_eliminar">
                            <button type="button" class="elemento_eliminar--btn" onclick="BorrarDatoIngreso(${i.id})"><ion-icon name="close-circle-outline"></ion-icon></button>
                        </div>
                    </div>
                </div>\n`;
    });
    setTextInnerHtmlId('lista-ingresos', textLayoutIngresos);
}

const GeneraListaEgresos = () =>{
    textLayoutEgresos = '';
    setTextInnerHtmlId('lista-egresos', '');
    Object.values(listaEgresos).forEach((e)=>{
        var porcentaje = formatterPorcent.format(e.valor/valorTotalEgresos);
        textLayoutEgresos += `<div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${e.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">- ${formatter.format(e.valor)}</div>
                        <div class="elemento_porcentaje">${porcentaje}</div>
                        <div class="elemento_eliminar">
                            <button type="button" class="elemento_eliminar--btn" onclick="BorrarDatoEgreso(${e.id})"><ion-icon name="close-circle-outline"></ion-icon></button>
                        </div>
                    </div>
                </div>`;
    });
    setTextInnerHtmlId('lista-egresos', textLayoutEgresos);
}

function BorrarDatoIngreso(id){
    const index = listaIngresos.findIndex(e => e.id === id);
    listaIngresos.splice(index,1);   
    cargaCabecero(); 
    GeneraListaIngresos();
}
function BorrarDatoEgreso(id){
    const index = listaEgresos.findIndex(e => e.id === id);
    listaEgresos.splice(index,1);    
    cargaCabecero();
    GeneraListaEgresos();
}

//>>>>>>>>>>>>Eventos<<<<<<<<<<<<<<
document.addEventListener('DOMContentLoaded', function(){
    listaIngresos.push(new Ingreso('Salario', 10000));
    listaIngresos.push(new Ingreso('Venta Coche', 1500));
    listaEgresos.push(new Egreso('Renta departamento', 1900));
    listaEgresos.push(new Egreso('Ropa', 400)); 
    cargaCabecero();
    GeneraListaIngresos();
    GeneraListaEgresos();
    console.log('App lista para interacción.')
});

agregarBtn.addEventListener('click', ()=>{
    console.log('Entrando al evento click del boton agregar...');
    AgregarDato();
});
