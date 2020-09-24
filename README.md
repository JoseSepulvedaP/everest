# Desafío técnico equipo Everest

## Solucion implementada y posible mejora
La solución implementada fue considerar la rotacion de la imagen cada 90 grados para obtener las direcciones izquierda, derecha, arriba, abajo. Esto me dio 256 combinaciones para usarlas como captcha. Poble la base de datos con documentos que guardaban un array de cuatro numeros con las posiciones y un campo para guardar que puerta usó ese captcha y no obtener el mismo si entro nuevamente a la misma puerta. 
Considerando la solución implementada usaría los 6 vértices que tiene el spark de Walmart para que los giros de la flecha sean seis y no los cuatro que tenemos actualmente. Esto incrementa las combinaciones posibles a 1296. La nueva rotación de la flecha sería de 60 grados.