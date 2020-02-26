# Projet Cours IOT M1 "Sams'ISEN"

* Joseph de Gourcuff
* Florent Deroo
* Corentin Duval

## Idées principales de notre solution 
Pour ce projet nous sommes partit dans l'idées de créer un systeme d'aquisition de données et de monitoring le plus générique possible. Pour avoir un réseau accesible le plus largement en France (Ville, Campagne, capteurs en déplacement) nous avons optés pour le réseau sigfox, en sachant que nous serons donc limité au niveau de la quantité de data envoyable par jour.
Pour le capteur nous avons aussi opté pour une solution générique, l'ESP32 qui permets une grande flexibilité dans le choix des capteurs utilisés, en effet ce microcontroleurs est pourvu à la fois d'entrées numérique, d'un ADC et de plusieurs interfaces tels que la liaison série (UART), le 1-wire, l'i2c et le SPI entre autre. Pour notre capteur de démonstration captons l'humidité relative et la température grâce à un DTH11 et la luminovité grâce à [////////].

## Structure
![alt text](schema.png)
Le shéma ci-dessus montre le fonctionnement globale du système.
Le capteur qui reste en veille la plupart du temps va sortir du sommeil pour prendre les données, les envoyés sur le réseaux sigfox qui va ensuite les envoyés sur notre API en Node JS. Cette API va servir à receptionner les données du réseaux sigfox, vérifiés la conformité des données, les stockers sur une base de données MongoDB puis les mettre à disposotion des différentes interfaces Web de monitoring. 
## ESP32

## CallBack SigFox

## Back-end 

#### Technologies utilisés : 

* **Node JS**
* **Express JS** création du serveur http et traitement des routes + layer sécurité.
* **Mongo DB** stockage des données. 
* **Express JSON parser** middleware Express pour le parsing JSON

#### Prérequis et Instalation : 

``


## Front-end

