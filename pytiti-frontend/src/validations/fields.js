'use strict'
import { date } from 'quasar'

export default {
  correo: v => {
    const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    return re.test(String(v).toLowerCase()) || 'El correo no es valido.'
  },
  contrasena: v => v.length >= 6 || 'Debe tener al menos 6 carcateres.',
  requerido: v => !!v || 'El campo es requerido.',
  minimoOcho: v => v.length > 8 || 'Debe tener mas de 8 caracteres.',
  minimoUno: v => v.length >= 1 || 'Seleccione al menos 1.',
  maximoDos: v => v.length < 3 || 'Select max 3 choices.',
  telefono: v => {
    const re = /^[0-9]/
    return (re.test(String(v).toLowerCase()) && v.length === 8) || 'Introduzca un numero de celular valido.'
  },
  letras: v => {
    //const re = /^[a-zñÑáéíóú]/
    const re = /^[a-zA-ZñÑáéíóú\s]*$/
    return  re.test(String(v).toLowerCase()) ||  'Solo se permiten letras.'
  },
  numeros: v => {
    const re = /^\d+$/g
    return re.test(String(v)) || 'Solo se permiten numeros enteros.'
  },
  decimales: v => {
    const re = /^\d{0,2}(.\d{0,2}){0,1}$/g
    return re.test(String(v)) || 'Solo se permiten numeros decimales.'
  },
  date: v =>{
    const validDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/g;
    return validDate.test(v) || 'Fecha no válida'
  },
  dateFormat: v =>{
    const validDate =/(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d/g;
    return validDate.test(v) || 'Fecha no válida'
  },
  fechaNacimiento: v=>{
    const actual = new Date().getFullYear()
    if(!v){
      return 'El campo es requerido'
    }
    const parts = v.split('/')
    return +parts[ 2 ] + 14 <= actual || 'Fecha no válida'
  },
  fechasFuturas: v=>{
    const today = new Date().getTime()
    if(!v){
      return 'El campo es requerido'
    }
    const parts = v.split('/')
    const idate = new Date(parts[2], parts[1] - 1, parts[0]).getTime();
    return (idate- today ) < 0 || 'Fecha no válida'
  },
  fechasFuturasNoRequerida: v=>{
    const today = new Date().getTime()
    const parts = v.split('/')
    const idate = new Date(parts[2], parts[1] - 1, parts[0]).getTime();
    return (idate- today ) < 0 || 'Fecha no válida'
  }
}

// PARA las validaciones
// numero entero, fracciones
// subcadenas