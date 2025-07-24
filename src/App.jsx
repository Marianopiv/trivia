import React, { useState, useEffect } from "react";
import { useRef } from "react";

// Preguntas de ejemplo para cada temática
const QUESTIONS = {
  "Harry Potter": [
    // 1-10
    { question: "¿Cómo se llama la lechuza de Harry?", options: ["Hedwig", "Crookshanks", "Scabbers", "Fawkes"], answer: "Hedwig", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Quién es el director de Hogwarts?", options: ["Snape", "Dumbledore", "McGonagall", "Voldemort"], answer: "Dumbledore", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Qué casa ganó la Copa de las Casas en el primer año de Harry?", options: ["Slytherin", "Gryffindor", "Hufflepuff", "Ravenclaw"], answer: "Gryffindor", image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Quién es el padrino de Harry?", options: ["Remus Lupin", "Sirius Black", "Arthur Weasley", "Alastor Moody"], answer: "Sirius Black", image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Qué objeto es una de las Reliquias de la Muerte?", options: ["La varita de saúco", "El giratiempo", "La snitch dorada", "El giratiempo"], answer: "La varita de saúco", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Quién mató a Dumbledore?", options: ["Bellatrix", "Snape", "Voldemort", "Draco"], answer: "Snape", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Cómo se llama el tren que va a Hogwarts?", options: ["Expreso de Hogwarts", "Tren Mágico", "Expreso de Londres", "Tren de las Brujas"], answer: "Expreso de Hogwarts", image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Quién es el guardabosques de Hogwarts?", options: ["Hagrid", "Filch", "Snape", "Dobby"], answer: "Hagrid", image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Qué animal representa a Ravenclaw?", options: ["Águila", "Serpiente", "Tejón", "León"], answer: "Águila", image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Quién es el mejor amigo de Harry?", options: ["Ron", "Neville", "Draco", "Cedric"], answer: "Ron", image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },
    // 11-80 (preguntas generadas)
    { question: "¿Cuál es el nombre completo de Harry?", options: ["Harry James Potter", "Harry Sirius Potter", "Harry Albus Potter", "Harry Remus Potter"], answer: "Harry James Potter", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Quién es el jefe de la casa Slytherin?", options: ["Snape", "McGonagall", "Flitwick", "Sprout"], answer: "Snape", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Cómo se llama el banco de los magos?", options: ["Gringotts", "Ollivanders", "Flourish & Blotts", "Honeydukes"], answer: "Gringotts", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Quién es el elfo doméstico de la familia Malfoy?", options: ["Dobby", "Kreacher", "Winky", "Hokey"], answer: "Dobby", image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Qué criatura custodia la cámara secreta?", options: ["Basilisco", "Dragón", "Troll", "Hipogrifo"], answer: "Basilisco", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Quién es el profesor de Pociones en el sexto año?", options: ["Slughorn", "Snape", "Lockhart", "Lupin"], answer: "Slughorn", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Qué animal representa a Hufflepuff?", options: ["Tejón", "León", "Águila", "Serpiente"], answer: "Tejón", image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Quién es el padre de Draco Malfoy?", options: ["Lucius", "Arthur", "James", "Remus"], answer: "Lucius", image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Qué objeto destruye Ron en la cámara de los secretos?", options: ["El guardapelo", "La copa", "El diario", "La diadema"], answer: "El diario", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Quién es el guardián de Gryffindor?", options: ["McGonagall", "Snape", "Sprout", "Flitwick"], answer: "McGonagall", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" },
    // ... (agrega más preguntas hasta llegar a 80)
  ],
  "Fútbol": [
    // 1-10
    { question: "¿En qué país se originó el fútbol?", options: ["Inglaterra", "Brasil", "Italia", "Alemania"], answer: "Inglaterra", image: "https://images.unsplash.com/photo-1505843271152-2547c2ec0f8c?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Cuántos jugadores tiene un equipo de fútbol en cancha?", options: ["11", "10", "9", "12"], answer: "11", image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Quién ganó el Mundial 2014?", options: ["Alemania", "Argentina", "Brasil", "España"], answer: "Alemania", image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Qué país tiene más Copas del Mundo?", options: ["Brasil", "Alemania", "Italia", "Argentina"], answer: "Brasil", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Quién es el máximo goleador de la historia?", options: ["Cristiano Ronaldo", "Pelé", "Messi", "Miroslav Klose"], answer: "Cristiano Ronaldo", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Qué club ganó más Champions League?", options: ["Real Madrid", "Barcelona", "Bayern Munich", "Liverpool"], answer: "Real Madrid", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" },
    { question: "¿En qué año se jugó el primer Mundial?", options: ["1930", "1950", "1920", "1940"], answer: "1930", image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Quién es conocido como 'La Pulga'?", options: ["Messi", "Maradona", "Neymar", "Mbappé"], answer: "Messi", image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Qué selección ganó la Copa América 2021?", options: ["Argentina", "Brasil", "Uruguay", "Chile"], answer: "Argentina", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Qué país organizó el Mundial 2018?", options: ["Rusia", "Qatar", "Francia", "Alemania"], answer: "Rusia", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80" },
    // 11-80 (preguntas generadas)
    { question: "¿Quién es el máximo goleador de los mundiales?", options: ["Miroslav Klose", "Pelé", "Ronaldo", "Messi"], answer: "Miroslav Klose", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Qué país ganó el Mundial 2010?", options: ["España", "Holanda", "Alemania", "Brasil"], answer: "España", image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Quién es el máximo goleador de la Champions League?", options: ["Cristiano Ronaldo", "Messi", "Lewandowski", "Benzema"], answer: "Cristiano Ronaldo", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Qué selección ganó la Eurocopa 2016?", options: ["Portugal", "Francia", "Alemania", "Italia"], answer: "Portugal", image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Quién es el máximo goleador de la historia de la selección argentina?", options: ["Messi", "Batistuta", "Maradona", "Aguero"], answer: "Messi", image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Qué club argentino ganó más Copas Libertadores?", options: ["Independiente", "Boca Juniors", "River Plate", "Estudiantes"], answer: "Independiente", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Quién es el máximo goleador de la historia de Boca Juniors?", options: ["Martín Palermo", "Riquelme", "Tevez", "Maradona"], answer: "Martín Palermo", image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Qué país ganó la Copa América 2019?", options: ["Brasil", "Perú", "Argentina", "Chile"], answer: "Brasil", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Quién es el máximo goleador de la historia de River Plate?", options: ["Ángel Labruna", "Francescoli", "Gallardo", "Alonso"], answer: "Ángel Labruna", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Qué selección ganó la Copa América 2015?", options: ["Chile", "Argentina", "Brasil", "Uruguay"], answer: "Chile", image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80" },
    // ... (agrega más preguntas hasta llegar a 80)
  ],
  "Game of Thrones": [
    // 1-10
    { question: "¿Quién es conocido como la 'Madre de Dragones'?", options: ["Daenerys", "Cersei", "Arya", "Sansa"], answer: "Daenerys", image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Cuál es el lema de la casa Stark?", options: ["Se acerca el invierno", "Fuego y sangre", "Nuestra es la furia", "Ours is the Fury"], answer: "Se acerca el invierno", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Quién mató a Joffrey Baratheon?", options: ["Olenna Tyrell", "Tyrion Lannister", "Sansa Stark", "Petyr Baelish"], answer: "Olenna Tyrell", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Cómo se llama el lobo de Jon Snow?", options: ["Ghost", "Nymeria", "Summer", "Grey Wind"], answer: "Ghost", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Quién se sienta en el Trono de Hierro al final de la serie?", options: ["Bran", "Jon", "Daenerys", "Sansa"], answer: "Bran", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Qué personaje es apodado 'El Perro'?", options: ["Sandor Clegane", "Gregor Clegane", "Bronn", "Podrick"], answer: "Sandor Clegane", image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Quién es el padre de Jon Snow?", options: ["Rhaegar Targaryen", "Ned Stark", "Robert Baratheon", "Tywin Lannister"], answer: "Rhaegar Targaryen", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Cómo se llama la espada de Arya?", options: ["Aguja", "Hielo", "Garra", "Veneno"], answer: "Aguja", image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Quién mató al Rey de la Noche?", options: ["Arya", "Jon", "Bran", "Daenerys"], answer: "Arya", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Cuál es la ciudad más grande de Poniente?", options: ["Desembarco del Rey", "Invernalia", "Braavos", "Altojardín"], answer: "Desembarco del Rey", image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },
    // 11-80 (preguntas generadas)
    { question: "¿Quién es el hermano mayor de Daenerys?", options: ["Viserys", "Rhaegar", "Jon", "Aegon"], answer: "Rhaegar", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Qué casa tiene como emblema un león?", options: ["Lannister", "Stark", "Baratheon", "Tully"], answer: "Lannister", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Quién es la madre de Jon Snow?", options: ["Lyanna Stark", "Catelyn Stark", "Cersei Lannister", "Sansa Stark"], answer: "Lyanna Stark", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Qué personaje es apodado 'El Pez Negro'?", options: ["Brynden Tully", "Edmure Tully", "Robb Stark", "Petyr Baelish"], answer: "Brynden Tully", image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Quién es el padre de Joffrey Baratheon?", options: ["Jaime Lannister", "Robert Baratheon", "Stannis Baratheon", "Renly Baratheon"], answer: "Jaime Lannister", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Qué casa tiene como emblema un ciervo?", options: ["Baratheon", "Stark", "Lannister", "Arryn"], answer: "Baratheon", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Quién es el rey loco?", options: ["Aerys II", "Robert", "Joffrey", "Stannis"], answer: "Aerys II", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Qué personaje es apodado 'El Perro'?", options: ["Sandor Clegane", "Gregor Clegane", "Bronn", "Podrick"], answer: "Sandor Clegane", image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Quién es el padre de Sansa Stark?", options: ["Eddard Stark", "Robb Stark", "Jon Snow", "Tywin Lannister"], answer: "Eddard Stark", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
    { question: "¿Qué casa tiene como emblema un lobo?", options: ["Stark", "Lannister", "Baratheon", "Tully"], answer: "Stark", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
    // ... (agrega más preguntas hasta llegar a 80)
  ],
  "Razas de Perros": [
    // 1-10
    { question: "¿Qué raza es conocida como 'el mejor amigo del hombre'?", options: ["Golden Retriever", "Labrador", "Pastor Alemán", "Bulldog"], answer: "Golden Retriever", image: "https://images.dog.ceo/breeds/retriever-golden/n02099601_1024.jpg" },
    { question: "¿Cuál es la raza más pequeña del mundo?", options: ["Chihuahua", "Yorkshire", "Pomerania", "Pug"], answer: "Chihuahua", image: "https://images.dog.ceo/breeds/chihuahua/n02085620_1024.jpg" },
    { question: "¿Qué raza es originaria de Alemania?", options: ["Pastor Alemán", "Doberman", "Rottweiler", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/germanshepherd/n02106662_1024.jpg" },
    { question: "¿Cuál es la raza más inteligente según Stanley Coren?", options: ["Border Collie", "Pastor Alemán", "Golden Retriever", "Poodle"], answer: "Border Collie", image: "https://images.dog.ceo/breeds/collie-border/n02106166_1024.jpg" },
    { question: "¿Qué raza es conocida por su lengua azul?", options: ["Chow Chow", "Shar Pei", "Tibetan Mastiff", "Akita"], answer: "Chow Chow", image: "https://images.dog.ceo/breeds/chow/n02112137_1024.jpg" },
    { question: "¿Cuál es la raza más rápida del mundo?", options: ["Greyhound", "Whippet", "Saluki", "Afgano"], answer: "Greyhound", image: "https://images.dog.ceo/breeds/greyhound-italian/iss2016_Gray_%28cropped%29.jpg" },
    { question: "¿Qué raza es originaria de Japón?", options: ["Akita", "Shiba Inu", "Hokkaido", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/akita/Akita_inu_2.jpg" },
    { question: "¿Cuál es la raza más popular en Estados Unidos?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    { question: "¿Qué raza es conocida como 'perro policía'?", options: ["Pastor Alemán", "Belga Malinois", "Doberman", "Rottweiler"], answer: "Pastor Alemán", image: "https://images.dog.ceo/breeds/germanshepherd/n02106662_1024.jpg" },
    { question: "¿Cuál es la raza más antigua del mundo?", options: ["Basenji", "Saluki", "Akita", "Chow Chow"], answer: "Basenji", image: "https://images.dog.ceo/breeds/basenji/n02110806_1024.jpg" },
    // 11-20
    { question: "¿Qué raza es originaria de Francia?", options: ["Poodle", "Bichon Frise", "Basset Hound", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/poodle-standard/n02113799_1024.jpg" },
    { question: "¿Cuál es la raza más grande del mundo?", options: ["Gran Danés", "Mastín Inglés", "San Bernardo", "Leonberger"], answer: "Gran Danés", image: "https://images.dog.ceo/breeds/dane-great/n02109047_1024.jpg" },
    { question: "¿Qué raza es conocida por su pelaje rizado?", options: ["Poodle", "Bichon Frise", "Cocker Spaniel", "Setter Irlandés"], answer: "Poodle", image: "https://images.dog.ceo/breeds/poodle-standard/n02113799_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Reino Unido?", options: ["Labrador", "Golden Retriever", "Cocker Spaniel", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    { question: "¿Qué raza es originaria de Rusia?", options: ["Husky Siberiano", "Samoyedo", "Borzoi", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/husky/n02110185_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Japón?", options: ["Shiba Inu", "Akita", "Hokkaido", "Kai Ken"], answer: "Shiba Inu", image: "https://images.dog.ceo/breeds/shiba/shiba-8.jpg" },
    { question: "¿Qué raza es conocida por su cara arrugada?", options: ["Shar Pei", "Bulldog", "Pug", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/sharpei/IMG_0124.jpg" },
    { question: "¿Cuál es la raza más popular en Australia?", options: ["Labrador", "Golden Retriever", "Border Collie", "Pastor Alemán"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    { question: "¿Qué raza es originaria de China?", options: ["Chow Chow", "Shar Pei", "Pekingese", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/chow/n02112137_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Canadá?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Husky"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    // 21-30
    { question: "¿Qué raza es conocida por su pelaje blanco y esponjoso?", options: ["Samoyedo", "Husky", "Malamute", "Pomerania"], answer: "Samoyedo", image: "https://images.dog.ceo/breeds/samoyed/n02111889_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Alemania?", options: ["Pastor Alemán", "Labrador", "Golden Retriever", "Doberman"], answer: "Pastor Alemán", image: "https://images.dog.ceo/breeds/germanshepherd/n02106662_1024.jpg" },
    { question: "¿Qué raza es originaria de Italia?", options: ["Cane Corso", "Mastín Napolitano", "Spinone", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/mastiff-bull/n02108422_1024.jpg" },
    { question: "¿Cuál es la raza más popular en España?", options: ["Pastor Alemán", "Labrador", "Golden Retriever", "Bulldog"], answer: "Pastor Alemán", image: "https://images.dog.ceo/breeds/germanshepherd/n02106662_1024.jpg" },
    { question: "¿Qué raza es conocida por su pelaje largo y sedoso?", options: ["Afgano", "Setter Irlandés", "Golden Retriever", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/retriever-golden/n02099601_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Francia?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    { question: "¿Qué raza es originaria de México?", options: ["Chihuahua", "Xoloitzcuintli", "Mexican Hairless", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/chihuahua/n02085620_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Brasil?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    { question: "¿Qué raza es conocida por su pelaje corto y brillante?", options: ["Doberman", "Rottweiler", "Boxer", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/doberman/n02107142_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Argentina?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    // 31-40
    { question: "¿Qué raza es originaria de Escocia?", options: ["Scottish Terrier", "Border Collie", "Shetland", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/collie-border/n02106166_1024.jpg" },
    { question: "¿Cuál es la raza más popular en México?", options: ["Chihuahua", "Labrador", "Golden Retriever", "Pastor Alemán"], answer: "Chihuahua", image: "https://images.dog.ceo/breeds/chihuahua/n02085620_1024.jpg" },
    { question: "¿Qué raza es conocida por su pelaje negro y fuego?", options: ["Doberman", "Rottweiler", "Doberman Pinscher", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/doberman/n02107142_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Chile?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    { question: "¿Qué raza es originaria de Irlanda?", options: ["Setter Irlandés", "Terrier Irlandés", "Wolfhound", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/setter-irish/n02100877_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Colombia?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    { question: "¿Qué raza es conocida por su pelaje tricolor?", options: ["Bernese Mountain Dog", "Beagle", "Border Collie", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/collie-border/n02106166_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Perú?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    { question: "¿Qué raza es originaria de Suiza?", options: ["San Bernardo", "Bernese Mountain Dog", "Appenzeller", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/stbernard/n02109525_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Venezuela?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    // 41-50
    { question: "¿Qué raza es conocida por su pelaje blanco y negro?", options: ["Border Collie", "Dalmatian", "Great Pyrenees", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/collie-border/n02106166_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Uruguay?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    { question: "¿Qué raza es originaria de Noruega?", options: ["Elkhound", "Lundehund", "Buhund", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/elkhound-norwegian/n02091467_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Paraguay?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    { question: "¿Qué raza es conocida por su pelaje rojo?", options: ["Golden Retriever", "Setter Irlandés", "Vizsla", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/retriever-golden/n02099601_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Ecuador?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    { question: "¿Qué raza es originaria de Suecia?", options: ["Vallhund", "Lapphund", "Jämthund", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/retriever-golden/n02099601_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Bolivia?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    { question: "¿Qué raza es conocida por su pelaje gris?", options: ["Weimaraner", "Siberian Husky", "Great Dane", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/husky/n02110185_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Panamá?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    // 51-60
    { question: "¿Qué raza es originaria de Finlandia?", options: ["Spitz Finlandés", "Lapphund", "Karelian Bear Dog", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/retriever-golden/n02099601_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Costa Rica?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    { question: "¿Qué raza es conocida por su pelaje marrón?", options: ["Labrador", "Golden Retriever", "Vizsla", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Guatemala?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    { question: "¿Qué raza es originaria de Dinamarca?", options: ["Broholmer", "Old Danish Pointer", "Danish-Swedish Farmdog", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/retriever-golden/n02099601_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Honduras?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    { question: "¿Qué raza es conocida por su pelaje negro?", options: ["Labrador", "Newfoundland", "Flat-Coated Retriever", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Nicaragua?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    { question: "¿Qué raza es originaria de Holanda?", options: ["Keeshond", "Dutch Shepherd", "Stabyhoun", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/retriever-golden/n02099601_1024.jpg" },
    { question: "¿Cuál es la raza más popular en El Salvador?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    // 61-70
    { question: "¿Qué raza es conocida por su pelaje blanco?", options: ["Samoyedo", "Great Pyrenees", "Maltese", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/samoyed/n02111889_1024.jpg" },
    { question: "¿Cuál es la raza más popular en República Dominicana?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    { question: "¿Qué raza es originaria de Bélgica?", options: ["Pastor Belga", "Bouvier", "Schipperke", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/germanshepherd/n02106662_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Puerto Rico?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    { question: "¿Qué raza es conocida por su pelaje atigrado?", options: ["Boxer", "Bull Terrier", "Staffordshire", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/retriever-golden/n02099601_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Cuba?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    { question: "¿Qué raza es originaria de Austria?", options: ["Austrian Pinscher", "Austrian Black and Tan Hound", "Tyrolean Hound", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/retriever-golden/n02099601_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Jamaica?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    { question: "¿Qué raza es conocida por su pelaje dorado?", options: ["Golden Retriever", "Setter Irlandés", "Vizsla", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/retriever-golden/n02099601_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Bahamas?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    // 71-80
    { question: "¿Qué raza es originaria de Hungría?", options: ["Vizsla", "Komondor", "Puli", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/retriever-golden/n02099601_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Trinidad y Tobago?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    { question: "¿Qué raza es conocida por su pelaje plateado?", options: ["Weimaraner", "Siberian Husky", "Great Dane", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/husky/n02110185_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Barbados?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    { question: "¿Qué raza es originaria de Polonia?", options: ["Polish Lowland Sheepdog", "Tatra Sheepdog", "Polish Hound", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/retriever-golden/n02099601_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Granada?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    { question: "¿Qué raza es conocida por su pelaje crema?", options: ["Golden Retriever", "Labrador", "Chesapeake Bay Retriever", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/retriever-golden/n02099601_1024.jpg" },
    { question: "¿Cuál es la raza más popular en Santa Lucía?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" },
    { question: "¿Qué raza es originaria de República Checa?", options: ["Cesky Terrier", "Cesky Fousek", "Bohemian Shepherd", "Todas las anteriores"], answer: "Todas las anteriores", image: "https://images.dog.ceo/breeds/retriever-golden/n02099601_1024.jpg" },
    { question: "¿Cuál es la raza más popular en San Vicente?", options: ["Labrador", "Golden Retriever", "Pastor Alemán", "Bulldog"], answer: "Labrador", image: "https://images.dog.ceo/breeds/labrador/n02099712_1024.jpg" }
  ]
};

const THEMATICS = Object.keys(QUESTIONS);
const QUESTION_COUNTS = [10, 20, 30];

// Imágenes ilustrativas para cada temática (puedes reemplazar por URLs propias si quieres)
const THEME_IMAGES = {
  "Harry Potter": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Harry_Potter_wordmark.svg",
  "Fútbol": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Football_%28soccer_ball%29.svg",
  "Game of Thrones": "https://fakeimg.pl/320x120/?text=GOT&font=lobster&font_size=70&bg=222&fg=fff&font_color=ffcc00",
  "Razas de Perros": "https://images.dog.ceo/breeds/retriever-golden/n02099601_1024.jpg"
};

// Animaciones CSS-in-JS
const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes popIn {
  0% { transform: scale(0.7); opacity: 0; }
  80% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); }
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
  40%, 43% { transform: translate3d(0, -30px, 0); }
  70% { transform: translate3d(0, -15px, 0); }
  90% { transform: translate3d(0, -4px, 0); }
}
`;

function shuffle(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function getStoredVictories() {
  return JSON.parse(localStorage.getItem("victories") || "{}")
}

function setStoredVictories(victories) {
  localStorage.setItem("victories", JSON.stringify(victories));
}

export default function App() {
  const [step, setStep] = useState(0); // 0: inicio, 1: jugando, 2: resultado
  const [names, setNames] = useState(["", ""]); // Dos jugadores
  const [thematic, setThematic] = useState(THEMATICS[0]);
  const [count, setCount] = useState(QUESTION_COUNTS[0]);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState([0, 0]);
  const [turn, setTurn] = useState(0); // 0 o 1
  const [victories, setVictories] = useState(getStoredVictories());
  const [dogImages, setDogImages] = useState({}); // Cache para imágenes de perros
  const [loadingImages, setLoadingImages] = useState(false); // Estado de carga de imágenes
  const [themeImage, setThemeImage] = useState(THEME_IMAGES[thematic]); // Imagen dinámica de la temática
  const audioRef = useRef();

  useEffect(() => {
    setStoredVictories(victories);
  }, [victories]);

  // Cargar imágenes de perros cuando se seleccione la temática
  useEffect(() => {
    setThemeImage(THEME_IMAGES[thematic]);
    if (thematic === "Razas de Perros") {
      getDogImagesForQuestions();
      // Actualizar la imagen de la temática con una imagen aleatoria de perro
      getDogImage('retriever-golden').then(imageUrl => {
        if (imageUrl) {
          setThemeImage(imageUrl);
        }
      });
    }
  }, [thematic]);

  // Función para obtener imagen de perro por raza
  async function getDogImage(breed) {
    try {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status === "success" && data.message) {
        return data.message;
      }
    } catch (error) {
      console.error('Error fetching dog image for breed:', breed, error);
    }
    // Fallback a imagen genérica
    return "https://images.dog.ceo/breeds/retriever-golden/n02099601_1024.jpg";
  }

  // Función para verificar si una imagen existe
  async function checkImageExists(url) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  // Función para obtener múltiples imágenes de perros
  async function getDogImagesForQuestions() {
    setLoadingImages(true);
    const breeds = [
      'retriever-golden', 'chihuahua', 'germanshepherd', 'collie-border',
      'chow', 'akita', 'labrador', 'basenji', 'poodle-standard', 
      'dane-great', 'samoyed', 'doberman', 'setter-irish', 
      'sharpei', 'husky', 'shiba', 'stbernard'
    ];
    
    const newImages = {};
    for (const breed of breeds) {
      if (!dogImages[breed]) {
        const imageUrl = await getDogImage(breed);
        newImages[breed] = imageUrl;
        // Pequeña pausa para evitar sobrecargar la API
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    if (Object.keys(newImages).length > 0) {
      setDogImages(prev => ({ ...prev, ...newImages }));
    }
    setLoadingImages(false);
  }

  // Función para obtener la imagen correcta para una pregunta de razas
  function getDogImageForQuestion(question) {
    const breedMap = {
      'Golden Retriever': 'retriever-golden',
      'Chihuahua': 'chihuahua',
      'Pastor Alemán': 'germanshepherd',
      'Border Collie': 'collie-border',
      'Chow Chow': 'chow',
      'Akita': 'akita',
      'Labrador': 'labrador',
      'Basenji': 'basenji',
      'Poodle': 'poodle-standard',
      'Gran Danés': 'dane-great',
      'Samoyedo': 'samoyed',
      'Doberman': 'doberman',
      'Setter Irlandés': 'setter-irish',
      'Shar Pei': 'sharpei',
      'Husky': 'husky',
      'Shiba Inu': 'shiba',
      'San Bernardo': 'stbernard',
      'Samoyed': 'samoyed',
      'German Shepherd': 'germanshepherd',
      'Great Dane': 'dane-great',
      'Irish Setter': 'setter-irish',
      'Siberian Husky': 'husky'
    };

    // Buscar la raza en la pregunta y opciones
    const questionText = question.toLowerCase();
    for (const [breedName, breedKey] of Object.entries(breedMap)) {
      if (questionText.includes(breedName.toLowerCase())) {
        // Usar imagen cacheada si existe, sino usar una URL confiable
        return dogImages[breedKey] || `https://images.dog.ceo/breeds/${breedKey}/n02099601_1024.jpg`;
      }
    }
    
    // Buscar en las opciones de la pregunta actual
    if (questions[current] && questions[current].options) {
      for (const option of questions[current].options) {
        const optionText = option.toLowerCase();
        for (const [breedName, breedKey] of Object.entries(breedMap)) {
          if (optionText.includes(breedName.toLowerCase())) {
            return dogImages[breedKey] || `https://images.dog.ceo/breeds/${breedKey}/n02099601_1024.jpg`;
          }
        }
      }
    }
    
    // Si no encuentra una raza específica, usar una imagen genérica confiable
    return "https://images.dog.ceo/breeds/retriever-golden/n02099601_1024.jpg";
  }

  function startGame() {
    if (!names[0].trim() || !names[1].trim()) return alert("¡Poné ambos nombres!");
    const all = QUESTIONS[thematic];
    let selected = shuffle(all).slice(0, count);
    setQuestions(selected);
    setCurrent(0);
    setScores([0, 0]);
    setTurn(0);
    setStep(1);
    
    // Cargar imágenes de perros si es la temática de razas
    if (thematic === "Razas de Perros") {
      getDogImagesForQuestions();
    }
  }

  function answer(option) {
    const isCorrect = option === questions[current].answer;
    setScores((prev) => {
      const next = [...prev];
      if (isCorrect) next[turn]++;
      return next;
    });
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setTurn((t) => 1 - t); // alterna turno
    } else {
      setStep(2);
      // Guardar victoria al que más puntos tenga
      const [s0, s1] = [
        scores[0] + (turn === 0 && isCorrect ? 1 : 0),
        scores[1] + (turn === 1 && isCorrect ? 1 : 0)
      ];
      let winner = null;
      if (s0 > s1) winner = names[0];
      else if (s1 > s0) winner = names[1];
      if (winner) {
        setVictories((prev) => {
          const v = { ...prev };
          v[winner] = (v[winner] || 0) + 1;
          return v;
        });
      }
    }
  }

  function reset() {
    setStep(0);
    setQuestions([]);
    setCurrent(0);
    setScores([0, 0]);
    setTurn(0);
  }

  function resetScores() {
    setVictories({});
    setStoredVictories({});
  }

  // Música al finalizar
  useEffect(() => {
    if (step === 2) {
      if (thematic === "Game of Thrones") {
        audioRef.current.src = "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/4e/Game_of_Thrones_Theme_-_Cello_Cover.ogg/Game_of_Thrones_Theme_-_Cello_Cover.ogg.mp3";
      } else if (scores[0] === scores[1]) {
        audioRef.current.src = "https://upload.wikimedia.org/wikipedia/commons/transcoded/3/3c/Service_bell.ogg/Service_bell.ogg.mp3";
      } else {
        audioRef.current.src = scores[0] > scores[1] ?
          "https://upload.wikimedia.org/wikipedia/commons/transcoded/8/8e/Short_triumphal_fanfare.ogg/Short_triumphal_fanfare.ogg.mp3" :
          "https://upload.wikimedia.org/wikipedia/commons/transcoded/2/2b/Sad_Trombone-Joe_Lamb.ogg/Sad_Trombone-Joe_Lamb.ogg.mp3";
      }
      // No play automático aquí
    } else {
      if (audioRef.current) audioRef.current.pause();
    }
  }, [step, thematic, scores]);

  // Reproduce el audio solo tras acción del usuario
  function playEndAudio() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      try {
        audioRef.current.play();
      } catch (e) {
        // Silenciar error de audio no soportado
        // console.warn('No se pudo reproducir el audio:', e);
      }
    }
  }

  return (
    <div style={styles.bg}>
      <style>{keyframes + mobileStyles}</style>
      <audio ref={audioRef} style={{display:'none'}} />
      <div style={{...styles.container, animation: 'fadeInUp 1s cubic-bezier(.23,1.01,.32,1)'}} className="trivia-container">
        {thematic === "Game of Thrones" ? (
          <div style={{position:'relative', width:280, marginBottom:16, display:'flex', justifyContent:'center', alignItems:'center'}}>
            {/* Dragón izquierdo animado */}
            <svg width="60" height="60" viewBox="0 0 60 60" style={{position:'absolute', left:-50, top:15, animation: 'float 3s ease-in-out infinite'}}>
              <path d="M30 55 Q20 45 25 35 Q10 30 15 20 Q8 15 20 12 Q15 5 30 8 Q35 3 45 8 Q50 5 50 15 Q60 18 50 25 Q55 35 40 35 Q45 45 30 55" fill="#8B0000" stroke="#222" strokeWidth="2"/>
              <circle cx="20" cy="20" r="3" fill="#FFD700" />
              <circle cx="20" cy="20" r="1.5" fill="#222" />
              <path d="M15 10 Q10 5 15 0" stroke="#FFD700" strokeWidth="2" fill="none"/>
            </svg>
            {/* Cartel GOT mejorado */}
            <svg width="280" height="120" viewBox="0 0 280 120" style={{display:'block', animation: 'bounce 1s ease-in-out'}}>
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:'#FFD700', stopOpacity:1}} />
                  <stop offset="50%" style={{stopColor:'#FFA500', stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:'#FFD700', stopOpacity:1}} />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <rect width="280" height="120" rx="20" fill="#1a1a1a" stroke="#FFD700" strokeWidth="3"/>
              <rect x="10" y="10" width="260" height="100" rx="15" fill="#2a2a2a"/>
              <text x="50%" y="45%" textAnchor="middle" fontFamily="Impact, Arial Black, sans-serif" fontSize="45" fill="url(#goldGradient)" filter="url(#glow)" dy=".3em">GAME OF</text>
              <text x="50%" y="75%" textAnchor="middle" fontFamily="Impact, Arial Black, sans-serif" fontSize="45" fill="url(#goldGradient)" filter="url(#glow)" dy=".3em">THRONES</text>
              {/* Corona decorativa */}
              <path d="M120 25 L130 15 L140 25 L150 15 L160 25 L170 15 L180 25 L190 15 L200 25 L190 35 L180 45 L170 35 L160 45 L150 35 L140 45 L130 35 L120 25" fill="#FFD700" stroke="#FFA500" strokeWidth="1"/>
            </svg>
            {/* Dragón derecho animado */}
            <svg width="60" height="60" viewBox="0 0 60 60" style={{position:'absolute', right:-50, top:15, transform:'scaleX(-1)', animation: 'float 3s ease-in-out infinite 1.5s'}}>
              <path d="M30 55 Q20 45 25 35 Q10 30 15 20 Q8 15 20 12 Q15 5 30 8 Q35 3 45 8 Q50 5 50 15 Q60 18 50 25 Q55 35 40 35 Q45 45 30 55" fill="#8B0000" stroke="#222" strokeWidth="2"/>
              <circle cx="20" cy="20" r="3" fill="#FFD700" />
              <circle cx="20" cy="20" r="1.5" fill="#222" />
              <path d="M15 10 Q10 5 15 0" stroke="#FFD700" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        ) : (
          <img
            src={themeImage}
            alt={thematic}
            style={{
              width: "100%",
              maxWidth: 220,
              borderRadius: 12,
              marginBottom: 16,
              objectFit: "cover",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              animation: 'popIn 0.8s cubic-bezier(.23,1.01,.32,1)'
            }}
            onError={e => { 
              e.target.onerror = null; 
              e.target.src = "https://images.dog.ceo/breeds/retriever-golden/n02099601_1024.jpg"; 
            }}
          />
        )}
        <h1 style={{...styles.title, animation: 'fadeInUp 1.2s 0.2s both'}} className="trivia-title">🎯 Trivia App 🎯</h1>
        {step === 0 && (
          <>
            <input
              style={styles.input}
              placeholder="Nombre Jugador 1"
              value={names[0]}
              onChange={e => setNames([e.target.value, names[1]])}
              maxLength={20}
            />
            <input
              style={styles.input}
              placeholder="Nombre Jugador 2"
              value={names[1]}
              onChange={e => setNames([names[0], e.target.value])}
              maxLength={20}
            />
            <div style={styles.selectRow}>
              <select style={styles.select} value={thematic} onChange={e => setThematic(e.target.value)}>
                {THEMATICS.map(t => <option key={t}>{t}</option>)}
              </select>
              <select style={styles.select} value={count} onChange={e => setCount(Number(e.target.value))}>
                {QUESTION_COUNTS.map(q => <option key={q} value={q}>{q} preguntas</option>)}
              </select>
            </div>
            <button style={styles.button} onClick={startGame}>🎮 ¡Jugar! 🎮</button>
            <button style={{...styles.button, background:'#e74c3c'}} onClick={resetScores}>🗑️ Resetear scores</button>
            <h2 style={{...styles.subtitle, animation: 'fadeInUp 0.8s ease-out 0.5s both'}}>🏆 Victorias 🏆</h2>
            <ul style={styles.victoryList}>
              {Object.entries(victories).length === 0 && <li style={styles.victoryItem}>Sin victorias aún</li>}
              {Object.entries(victories).map(([n, v]) => (
                <li key={n} style={styles.victoryItem}><b>{n}</b>: {v}</li>
              ))}
            </ul>
          </>
        )}
        {step === 1 && questions[current] && (
          <>
            <h2 style={{...styles.subtitle, animation: 'slideInLeft 0.8s ease-out'}}>Turno de: <span style={{color:'#764ba2', fontWeight: 'bold'}}>{names[turn]}</span></h2>
            <h3 style={{...styles.subtitle, animation: 'slideInRight 0.8s ease-out 0.2s both'}}>Puntaje: {names[0]} {scores[0]} - {scores[1]} {names[1]}</h3>
            <h2 style={{...styles.subtitle, animation: 'fadeInUp 0.8s ease-out 0.4s both'}}>Pregunta {current + 1} de {questions.length}</h2>
            {thematic === "Razas de Perros" && loadingImages ? (
              <div style={{
                width: 220,
                height: 140,
                borderRadius: 12,
                marginBottom: 12,
                background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "pulse 1.5s ease-in-out infinite"
              }}>
                <div style={{fontSize: 16, color: "#666"}}>🐕 Cargando imagen...</div>
              </div>
            ) : (
              <img
                src={thematic === "Razas de Perros" ? getDogImageForQuestion(questions[current].question) : questions[current].image}
                alt="Imagen de la pregunta"
                style={{
                  width: 220,
                  height: 140,
                  borderRadius: 12,
                  marginBottom: 12,
                  objectFit: "cover",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  animation: 'popIn 0.8s ease-out 0.6s both'
                }}
                              onError={e => { 
                e.target.onerror = null; 
                e.target.src = thematic === "Razas de Perros" 
                  ? "https://images.dog.ceo/breeds/retriever-golden/n02099601_1024.jpg"
                  : "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80"; 
              }}
              />
            )}
            <div style={{...styles.question, animation: 'fadeInUp 0.8s ease-out 0.8s both'}}>{questions[current].question}</div>
            <div style={styles.options}>
              {questions[current].options.map((opt, idx) => (
                <button
                  key={opt + idx}
                  style={{
                    ...styles.optionButton,
                    animation: `slideInLeft 0.6s ease-out ${1 + idx * 0.1}s both`
                  }}
                  className="option-button"
                  onClick={() => answer(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h2 style={{...styles.subtitle, animation: 'bounce 1s ease-in-out'}}>🎉 ¡Fin del juego! 🎉</h2>
            <h3 style={{...styles.subtitle, animation: 'fadeInUp 0.8s ease-out 0.3s both'}}>Puntaje final: {names[0]} {scores[0]} - {scores[1]} {names[1]}</h3>
            {scores[0] === scores[1] ? (
              <div style={{...styles.result, animation: 'pulse 2s ease-in-out infinite'}}>🤝 ¡Empate! 🤝</div>
            ) : (
              <div style={{...styles.result, animation: 'bounce 1s ease-in-out 0.5s both'}}>
                🏆 Ganó: <b>{scores[0] > scores[1] ? names[0] : names[1]}</b> 🏆
              </div>
            )}
            <button style={styles.button} onClick={() => { reset(); playEndAudio(); }}>🔄 Volver al inicio</button>
          </>
        )}
      </div>
      <footer style={{...styles.footer, animation: 'fadeInUp 1s ease-out 1.5s both'}}>
        Hecho con ❤️ por tu AI 🤖
      </footer>
    </div>
  );
}

const styles = {
  bg: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
  container: {
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
    padding: 32,
    minWidth: 320,
    maxWidth: 400,
    margin: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90vw",
    boxSizing: "border-box",
  },
  title: {
    fontSize: 32,
    fontWeight: 900,
    marginBottom: 16,
    color: "#764ba2",
    letterSpacing: 1
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 700,
    margin: "24px 0 8px 0",
    color: "#667eea"
  },
  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 16,
    marginBottom: 16,
    width: "100%"
  },
  selectRow: {
    display: "flex",
    gap: 12,
    marginBottom: 16,
    width: "100%"
  },
  select: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 16
  },
  button: {
    background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "14px 36px",
    fontSize: 18,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 8,
    marginBottom: 16,
    boxShadow: "0 4px 15px rgba(118,75,162,0.3)",
    transition: "all 0.3s ease",
    transform: "translateY(0)",
    position: "relative",
    overflow: "hidden"
  },
  question: {
    fontSize: 20,
    fontWeight: 600,
    margin: "16px 0",
    color: "#333"
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    width: "100%"
  },
  optionButton: {
    background: "linear-gradient(135deg, #f3f3fa 0%, #e8e8f5 100%)",
    color: "#764ba2",
    border: "2px solid #764ba2",
    borderRadius: 12,
    padding: "12px 0",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginBottom: 8,
    boxShadow: "0 2px 8px rgba(118,75,162,0.1)",
    transform: "translateY(0)",
    position: "relative",
    overflow: "hidden"
  },
  score: {
    marginTop: 16,
    fontSize: 18,
    color: "#667eea"
  },
  result: {
    fontSize: 22,
    fontWeight: 700,
    color: "#764ba2",
    margin: "16px 0"
  },
  victoryList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    width: "100%"
  },
  victoryItem: {
    fontSize: 16,
    color: "#333",
    padding: "2px 0"
  },
  footer: {
    marginTop: 32,
    color: "#fff",
    fontWeight: 400,
    fontSize: 16
  }
};

// Media query para mobile
const mobileStyles = `
  @media (max-width: 600px) {
    .trivia-container {
      padding: 12px !important;
      min-width: unset !important;
      max-width: 98vw !important;
      border-radius: 10px !important;
    }
    .trivia-title {
      font-size: 24px !important;
    }
    .trivia-subtitle {
      font-size: 16px !important;
    }
    .trivia-question {
      font-size: 16px !important;
    }
    .trivia-option {
      font-size: 14px !important;
      padding: 8px 0 !important;
    }
  }
  
  /* Efectos hover para botones */
  button:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 20px rgba(118,75,162,0.4) !important;
  }
  
  button:active {
    transform: translateY(0) !important;
    box-shadow: 0 2px 10px rgba(118,75,162,0.3) !important;
  }
  
  /* Efectos hover para botones de opciones */
  .option-button:hover {
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%) !important;
    color: white !important;
    transform: translateY(-1px) !important;
    box-shadow: 0 4px 12px rgba(118,75,162,0.3) !important;
  }
  
  .option-button:active {
    transform: translateY(0) !important;
  }
`; 