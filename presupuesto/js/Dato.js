class Dato{
    constructor(descripcion, valor){
        this._descripcion = descripcion;
        this._valor = valor;
    }
    //
    get descripcion(){
        //console.log('Obteniendo descripción...');
        return this._descripcion;
    }
    set descripcion(nuevaDescripcion){
        //console.log('Estableciendo descripción...');
        this._descripcion = nuevaDescripcion;
    }
    //
    get valor(){
        //console.log('Obteniendo valor...');
        return this._valor;
    }
    set valor(nuevoValor){
        //console.log('Estableciendo valor...');
        this._valor = nuevoValor;
    }
}