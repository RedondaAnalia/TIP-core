![icon](https://drive.google.com/open?id=1yFcZBN8S9T_oxb_7jm2ZrqpgfJdKRlZ9)


# PET HEROES
> 28 de Marzo del 2019

----
## VISIÓN GENERAL
Aplicación de gestión de actas médicas de mascotas para centralizar y digitalizar estudios y vacunaciones para la mascota en cuestión

----
## OBJETIVOS
Facilitar a las veterinarias el fácil acceso al expediente médico del paciente.
Tener registro de la vacunacion correspondiente y alertar su próxima vacuna.
Englobar servicios a mascotas de todo tipo.
Incentivar al buen cuidado de las mascotas.

----
## ESPECIFICACIONES
Un sistema que al registrarte puedes adquirir puntos al mostrar responsabilidad en el cuidado de tus mascotas, se premiara o castigara con un sistema de puntos que adquiere tener su mascota con la vacunacion al dia, con las buenas conductas que le enseñas, con los me gusta(caricias) que tus amigos hacen a tus actividades. 
Los registros y historias clinicas son creadas y modificadas sólo por veterinarios registrados que pueden acceder a toda la información. Pueden bajar las fichas y antecedentes en formato imprimible, las fichas pueden tener adjuntos estudios, radiografías, etc. 
Los dueños de sus mascotas pueden puntuar al veterinario como a todos los servicios disponibles en la app, como paseadores, peluqueros, psicólogos caninos, etc. 

----
## DESARROLLO
Stack tecnológico
Las tecnologías elegidas son para el Back-End Node-Express que será encargado de recibir las consultas de las diferentes interfaces. La base de datos en un principio será Mongo, pero cuando se llegue a la interacción entre amigos se agregara Neo4J. Para el Front-End se pensó usar Angular para el desarrollo Web y Android para la parte móvil.

----
## METODOLOGIAS

KANBAN [Trello](https://trello.com/b/0I2U0rdd/pet-heroes-grupo-10)



-----------------------------------
## Cuando te pierdas sobre que debes documentar.....
Esta modalidad de TTIP está pensado para crear un producto de software. Entonces, ¿qué queremos que documentes?
las decisiones importantes que tuviste que tomar para tu proyecto: MVP, arquitectura base, premisas, los requerimientos y cómo los resolviste.
la documentación debe ser la justa. Nadie va a ver un diagrama de clases de toda la solución (y es imposible que entre en una hoja A4). Mejor, generá los diagramas que creas convenientes para un requerimiento o para una parte importante del mismo: diagrama entidad-relación, de objetos, de clases, de secuencia, de estados, el que fuera necesario. ¿Qué hay que mostrar? lo que es central, el core. Si un requerimiento tiene decisiones triviales, un alta-baja-modificación de una entidad por ejemplo, no vale la pena invertir en documentarlo. 
La documentación tiene que ahorrar el esfuerzo a quien lo lee de bucear en todo el código. Por lo tanto, no hay que copiar métodos largos, ni decir con palabras lo mismo que lo que él dice: hay que despejar las abstracciones y hacerlas evidentes.
Es bueno acompañar los diagramas con explicaciones breves, cortas y que sean fáciles de leer (así también serán breves y cortas a la hora de escribirlas).
Así como no es conveniente abarrotar pilas de documentos y manuales, tampoco es una buena idea la ausencia de documentación. ¿Cuál sería tu sensación si te piden que utilices un framework del que sólo disponés el código fuente, sin explicaciones de cómo usarlo o bien cuáles son sus ideas principales?