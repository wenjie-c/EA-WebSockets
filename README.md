# Angular WebSockets

1. Què passaria si un mateix usuari obre el xat en dues pestanyes diferents? Com podríem evitar que el seu nom surti duplicat?
El que pasaria es que surtiria el mateix nom dues vegades en la llista de conectats ja que no s'ha desconectat anteriorment. Una manera d'evitar seria prohibir que un segon socket es conecti si ho fa amb el mateix id d'usuari.
2. Per què és millor que el servidor enviï la llista sencera cada vegada en lloc d'enviar només "usuari X s'ha connectat"?
Es podria fer, pero com que no tenim queues y la forma d'eliminar items en Javascript es com es, es molt més senzill settejar el signal de la llista de conectats.
## Referencias
+ [Video conceptual](https://www.youtube.com/watch?v=1BfCnjr_Vjg)
+ [Video practico](https://www.youtube.com/watch?v=V6aoRAm-y9E)
+ [Documentacion](https://socket.io/docs/v4/client-socket-instance/)