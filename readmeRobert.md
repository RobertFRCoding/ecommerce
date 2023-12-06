Nueva actualización SM: 0x8373c1F70e43f85A4b78f7011ADc621E8e19dc1c

Funciones agregadas:

Eliminar producto
Modificar precio
Obtener productos por empresa (con toda la información de cada producto)
Mejoras:

Ahora no se pueden registrar dos empresas, ni con el mismo nombre ni con el mismo NIF con diferente wallet.
Se han trasladado algunos "requires" a "modifier" para tener un código más limpio y reutilizable.
Había un fallo en el aumento de stock, ya que no permitía subir más del doble de lo que ya había y lo reconocía como 0.
