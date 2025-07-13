import React, { useState, useEffect } from "react";
import { useRef } from "react";

// Preguntas de ejemplo para cada temática
const QUESTIONS = {
  "Harry Potter": [
    {
      question: "¿Cómo se llama la lechuza de Harry?",
      options: ["Hedwig", "Crookshanks", "Scabbers", "Fawkes"],
      answer: "Hedwig",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" // búho
    },
    {
      question: "¿Quién es el director de Hogwarts?",
      options: ["Snape", "Dumbledore", "McGonagall", "Voldemort"],
      answer: "Dumbledore",
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" // anciano sabio
    },
    {
      question: "¿Qué casa ganó la Copa de las Casas en el primer año de Harry?",
      options: ["Slytherin", "Gryffindor", "Hufflepuff", "Ravenclaw"],
      answer: "Gryffindor",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" // grupo de amigos
    },
    {
      question: "¿Quién es el padrino de Harry?",
      options: ["Remus Lupin", "Sirius Black", "Arthur Weasley", "Alastor Moody"],
      answer: "Sirius Black",
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80" // perro
    },
    {
      question: "¿Qué objeto es una de las Reliquias de la Muerte?",
      options: ["La varita de saúco", "El giratiempo", "La snitch dorada", "El giratiempo"],
      answer: "La varita de saúco",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" // varita
    },
    {
      question: "¿Quién mató a Dumbledore?",
      options: ["Bellatrix", "Snape", "Voldemort", "Draco"],
      answer: "Snape",
      image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80" // poción
    },
    {
      question: "¿Cómo se llama el tren que va a Hogwarts?",
      options: ["Expreso de Hogwarts", "Tren Mágico", "Expreso de Londres", "Tren de las Brujas"],
      answer: "Expreso de Hogwarts",
      image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=400&q=80" // tren
    },
    {
      question: "¿Quién es el guardabosques de Hogwarts?",
      options: ["Hagrid", "Filch", "Snape", "Dobby"],
      answer: "Hagrid",
      image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=400&q=80" // bosque
    },
    {
      question: "¿Qué animal representa a Ravenclaw?",
      options: ["Águila", "Serpiente", "Tejón", "León"],
      answer: "Águila",
      image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=400&q=80" // ave
    },
    {
      question: "¿Quién es el mejor amigo de Harry?",
      options: ["Ron", "Neville", "Draco", "Cedric"],
      answer: "Ron",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" // amigos
    }
  ],
  "Fútbol": [
    {
      question: "¿En qué país se originó el fútbol?",
      options: ["Inglaterra", "Brasil", "Italia", "Alemania"],
      answer: "Inglaterra",
      image: "https://images.unsplash.com/photo-1505843271152-2547c2ec0f8c?auto=format&fit=crop&w=400&q=80" // pelota
    },
    {
      question: "¿Cuántos jugadores tiene un equipo de fútbol en cancha?",
      options: ["11", "10", "9", "12"],
      answer: "11",
      image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=400&q=80" // cancha
    },
    {
      question: "¿Quién ganó el Mundial 2014?",
      options: ["Alemania", "Argentina", "Brasil", "España"],
      answer: "Alemania",
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80" // festejo
    },
    {
      question: "¿Qué país tiene más Copas del Mundo?",
      options: ["Brasil", "Alemania", "Italia", "Argentina"],
      answer: "Brasil",
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" // bandera
    },
    {
      question: "¿Quién es el máximo goleador de la historia?",
      options: ["Cristiano Ronaldo", "Pelé", "Messi", "Miroslav Klose"],
      answer: "Cristiano Ronaldo",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" // jugador
    },
    {
      question: "¿Qué club ganó más Champions League?",
      options: ["Real Madrid", "Barcelona", "Bayern Munich", "Liverpool"],
      answer: "Real Madrid",
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" // estadio
    },
    {
      question: "¿En qué año se jugó el primer Mundial?",
      options: ["1930", "1950", "1920", "1940"],
      answer: "1930",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" // grupo
    },
    {
      question: "¿Quién es conocido como 'La Pulga'?",
      options: ["Messi", "Maradona", "Neymar", "Mbappé"],
      answer: "Messi",
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80" // jugador
    },
    {
      question: "¿Qué selección ganó la Copa América 2021?",
      options: ["Argentina", "Brasil", "Uruguay", "Chile"],
      answer: "Argentina",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" // copa
    },
    {
      question: "¿Qué país organizó el Mundial 2018?",
      options: ["Rusia", "Qatar", "Francia", "Alemania"],
      answer: "Rusia",
      image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80" // estadio
    }
  ],
  "Game of Thrones": [
    {
      question: "¿Quién es conocido como la 'Madre de Dragones'?",
      options: ["Daenerys", "Cersei", "Arya", "Sansa"],
      answer: "Daenerys",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" // dragón (fantasía)
    },
    {
      question: "¿Cuál es el lema de la casa Stark?",
      options: ["Se acerca el invierno", "Fuego y sangre", "Nuestra es la furia", "Ours is the Fury"],
      answer: "Se acerca el invierno",
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" // lobo (invierno)
    },
    {
      question: "¿Quién mató a Joffrey Baratheon?",
      options: ["Olenna Tyrell", "Tyrion Lannister", "Sansa Stark", "Petyr Baelish"],
      answer: "Olenna Tyrell",
      image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80" // veneno
    },
    {
      question: "¿Cómo se llama el lobo de Jon Snow?",
      options: ["Ghost", "Nymeria", "Summer", "Grey Wind"],
      answer: "Ghost",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" // lobo
    },
    {
      question: "¿Quién se sienta en el Trono de Hierro al final de la serie?",
      options: ["Bran", "Jon", "Daenerys", "Sansa"],
      answer: "Bran",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" // trono
    },
    {
      question: "¿Qué personaje es apodado 'El Perro'?",
      options: ["Sandor Clegane", "Gregor Clegane", "Bronn", "Podrick"],
      answer: "Sandor Clegane",
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80" // perro
    },
    {
      question: "¿Quién es el padre de Jon Snow?",
      options: ["Rhaegar Targaryen", "Ned Stark", "Robert Baratheon", "Tywin Lannister"],
      answer: "Rhaegar Targaryen",
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" // corona
    },
    {
      question: "¿Cómo se llama la espada de Arya?",
      options: ["Aguja", "Hielo", "Garra", "Veneno"],
      answer: "Aguja",
      image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=400&q=80" // espada
    },
    {
      question: "¿Quién mató al Rey de la Noche?",
      options: ["Arya", "Jon", "Bran", "Daenerys"],
      answer: "Arya",
      image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80" // noche
    },
    {
      question: "¿Cuál es la ciudad más grande de Poniente?",
      options: ["Desembarco del Rey", "Invernalia", "Braavos", "Altojardín"],
      answer: "Desembarco del Rey",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" // ciudad
    }
  ]
};

const THEMATICS = Object.keys(QUESTIONS);
const QUESTION_COUNTS = [10, 20, 30];

// Imágenes ilustrativas para cada temática (puedes reemplazar por URLs propias si quieres)
const THEME_IMAGES = {
  "Harry Potter": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Harry_Potter_wordmark.svg",
  "Fútbol": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Football_%28soccer_ball%29.svg",
  "Game of Thrones": "https://fakeimg.pl/320x120/?text=GOT&font=lobster&font_size=70&bg=222&fg=fff&font_color=ffcc00"
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
  const audioRef = useRef();

  useEffect(() => {
    setStoredVictories(victories);
  }, [victories]);

  function startGame() {
    if (!names[0].trim() || !names[1].trim()) return alert("¡Poné ambos nombres!");
    const all = QUESTIONS[thematic];
    let selected = shuffle(all).slice(0, count);
    setQuestions(selected);
    setCurrent(0);
    setScores([0, 0]);
    setTurn(0);
    setStep(1);
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
          <div style={{position:'relative', width:220, marginBottom:16, display:'flex', justifyContent:'center', alignItems:'center'}}>
            {/* Dragoncito izquierdo */}
            <svg width="48" height="48" viewBox="0 0 48 48" style={{position:'absolute', left:-38, top:18}}>
              <path d="M24 44 Q18 38 20 32 Q10 30 12 22 Q8 18 14 16 Q12 10 20 12 Q22 8 28 10 Q34 8 34 16 Q40 18 36 22 Q38 30 28 32 Q30 38 24 44" fill="#4b2e83" stroke="#222" strokeWidth="2"/>
              <circle cx="18" cy="18" r="2" fill="#fff" />
              <circle cx="18" cy="18" r="1" fill="#222" />
            </svg>
            {/* Cartel GOT */}
            <svg width="220" height="90" viewBox="0 0 220 90" style={{display:'block', animation: 'popIn 0.8s cubic-bezier(.23,1.01,.32,1)'}}>
              <rect width="220" height="90" rx="18" fill="#222" />
              <text x="50%" y="55%" textAnchor="middle" fontFamily="Comic Sans MS, Comic Sans, Lobster, cursive" fontSize="60" fill="#ffcc00" stroke="#fff" strokeWidth="3" dy=".3em">GOT</text>
            </svg>
            {/* Dragoncito derecho (espejado) */}
            <svg width="48" height="48" viewBox="0 0 48 48" style={{position:'absolute', right:-38, top:18, transform:'scaleX(-1)'}}>
              <path d="M24 44 Q18 38 20 32 Q10 30 12 22 Q8 18 14 16 Q12 10 20 12 Q22 8 28 10 Q34 8 34 16 Q40 18 36 22 Q38 30 28 32 Q30 38 24 44" fill="#4b2e83" stroke="#222" strokeWidth="2"/>
              <circle cx="18" cy="18" r="2" fill="#fff" />
              <circle cx="18" cy="18" r="1" fill="#222" />
            </svg>
          </div>
        ) : (
          <img
            src={THEME_IMAGES[thematic]}
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
          />
        )}
        <h1 style={{...styles.title, animation: 'fadeInUp 1.2s 0.2s both'}} className="trivia-title">Trivia App</h1>
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
            <button style={styles.button} onClick={startGame}>¡Jugar!</button>
            <button style={{...styles.button, background:'#e74c3c'}} onClick={resetScores}>Resetear scores</button>
            <h2 style={styles.subtitle}>Victorias</h2>
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
            <h2 style={styles.subtitle}>Turno de: <span style={{color:'#764ba2'}}>{names[turn]}</span></h2>
            <h3 style={styles.subtitle}>Puntaje: {names[0]} {scores[0]} - {scores[1]} {names[1]}</h3>
            <h2 style={styles.subtitle}>Pregunta {current + 1} de {questions.length}</h2>
            <img
              src={questions[current].image}
              alt="Imagen de la pregunta"
              style={{
                width: 220,
                height: 140,
                borderRadius: 12,
                marginBottom: 12,
                objectFit: "cover",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
              }}
              onError={e => { e.target.onerror = null; e.target.src = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"; }}
            />
            <div style={styles.question}>{questions[current].question}</div>
            <div style={styles.options}>
              {questions[current].options.map((opt, idx) => (
                <button
                  key={opt + idx}
                  style={styles.optionButton}
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
            <h2 style={styles.subtitle}>¡Fin del juego!</h2>
            <h3 style={styles.subtitle}>Puntaje final: {names[0]} {scores[0]} - {scores[1]} {names[1]}</h3>
            {scores[0] === scores[1] ? (
              <div style={styles.result}>¡Empate!</div>
            ) : (
              <div style={styles.result}>Ganó: <b>{scores[0] > scores[1] ? names[0] : names[1]}</b></div>
            )}
            <button style={styles.button} onClick={() => { reset(); playEndAudio(); }}>Volver al inicio</button>
          </>
        )}
      </div>
      <footer style={styles.footer}>
        Hecho con ❤️ por tu AI
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
    borderRadius: 8,
    padding: "12px 32px",
    fontSize: 18,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 8,
    marginBottom: 16,
    boxShadow: "0 2px 8px rgba(118,75,162,0.1)",
    transition: "background 0.2s"
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
    background: "#f3f3fa",
    color: "#764ba2",
    border: "2px solid #764ba2",
    borderRadius: 8,
    padding: "10px 0",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.2s, color 0.2s",
    marginBottom: 4
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
`; 