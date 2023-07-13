const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
]


export default function getDate (fecha){
  const date = new Date(fecha)
  const dia = date.getDay()
  const mes = meses[date.getMonth()]
  const año = date.getFullYear()

  const result = `${dia} de ${mes} del ${año}`

  return result
}