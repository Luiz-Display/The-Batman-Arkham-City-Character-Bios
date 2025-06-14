document.addEventListener("DOMContentLoaded", () => {
  //Puxa os IDs dos personagens por meio da API do Batman
  const characters = {
    batman: { id: 1, name: "Batman", image: "assets/batman.png" },
    catwoman: { id: 2, name: "Catwoman", image: "assets/catwoman.png" },
    pinguim: { id: 11, name: "Penguin", image: "assets/penguin.png" },
    riddler: { id: 12, name: "Riddler", image: "assets/riddler.png" },
  };

  //Declarar os atributos
  const imageel = document.getElementById("character-image");
  const titlename = document.getElementById("character-title");
  const displaychar = document.getElementById("character-display");
  const panelel = document.getElementById("character-panel");
  const panelcontent = document.getElementById("panel-content");
  const paneltitle = document.getElementById("panel-title");
  const panelbuttons = document.querySelectorAll(".panel-btn");
  const audiobtn = document.querySelector(".audio-btn");
  const audiomove = new Audio("assets/audiomove.mp3");
  const audioselect = new Audio("assets/audioselect.mp3");
  const audioplay = new Audio("assets/audioplay.mp3");

  function playsound(sound) {
    if (!sound) return;
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }

  let panelopen = false;
  let focusedSquareIndex = 0;
  let focusedTabIndex = 0;
  let currentaudio = null;
  const squareEls = Array.from(document.querySelectorAll(".square"));
  const gridcols = 2;

  function updateSquareFocus() {
    //O quadrado faz uma piscada ao mexer no wasd (Ficar parecido com o jogo)
    squareEls.forEach((el, i) => {
      el.classList.toggle("highlight", i === focusedSquareIndex);
      if (i === focusedSquareIndex) {
        const flash = document.createElement("div");
        flash.className = "flash-overlay";
        el.appendChild(flash);
        setTimeout(() => flash.remove(), 1000);
      }
    });

    // Atualizar nome e imagem com base no personagem focado
    const square = squareEls[focusedSquareIndex];
    const portraitClass = Array.from(square.classList).find((cls) =>
      cls.startsWith("portrait-")
    );
    if (portraitClass) {
      const type = portraitClass.replace("portrait-", "");
      const character = characters[type];
      if (character) {
        currenttype = type;
        titlename.textContent = character.name;
        titlename.hidden = false;
        imageel.src = character.image;
        imageel.alt = character.name;
        displaychar.hidden = false;
      }
    }
  }

  function updateTabFocus() {
    panelbuttons.forEach((btn, i) => {
      btn.classList.toggle("active", i === focusedTabIndex);
    });
    const btn = panelbuttons[focusedTabIndex];
    if (btn) updatePanelContent(btn.getAttribute("data-tab"));
  }

  function hidesquares() {
    squareEls.forEach((el) => (el.style.display = "none"));
    squaresHidden = true;
  }

  //Quadrados = Blocos dos personagens
  function showsquares() {
    squareEls.forEach((el) => (el.style.display = "block"));
    squaresHidden = false;
  }

  function openpanel() {
    panelel.hidden = false;
    paneltitle.hidden = false;
    panelcontent.hidden = false;
    panelbuttons.forEach((btn) => (btn.hidden = false));
    if (["batman", "riddler"].includes(currenttype)) {
      audiobtn.hidden = false;
    }

    panelopen = true;
    hidesquares();
  }

  function closepanel() {
    panelel.hidden = true;
    paneltitle.hidden = true;
    panelcontent.hidden = true;
    panelbuttons.forEach((btn) => (btn.hidden = true));
    audiobtn.hidden = true;
    panelopen = false;
    showsquares();
  }

  function handleKeyNavigation(e) {
    // Função para usar as teclas wasd que são comumente usadas para mexer, andar e etc

    //Setas do teclado também servem como um meio de replicar o wasd (Facilitar para determinados teclados)
    const keyMap = {
      ArrowUp: "w",
      ArrowDown: "s",
      ArrowLeft: "a",
      ArrowRight: "d",
    };

    const key = keyMap[e.key] || e.key;

    if (!panelopen) {
      if (["a", "d", "w", "s"].includes(key)) {
        const rowLength = gridcols;
        const colLength = Math.ceil(squareEls.length / rowLength);
        const row = Math.floor(focusedSquareIndex / rowLength);
        const col = focusedSquareIndex % rowLength;

        if (key === "a" && col > 0) focusedSquareIndex--;
        else if (key === "d" && col < rowLength - 1) focusedSquareIndex++;
        else if (key === "w" && row > 0) focusedSquareIndex -= rowLength;
        else if (key === "s" && row < colLength - 1)
          focusedSquareIndex += rowLength;

        focusedSquareIndex =
          (focusedSquareIndex + squareEls.length) % squareEls.length;
        updateSquareFocus();
        playsound(audiomove);
      } else if (e.key === "Enter") {
        squareEls[focusedSquareIndex].click();
        playsound(audioselect);
      }
    } else {
      if (e.key === "Escape") {
        //Escape é o esc
        const audioWasPlaying = currentaudio && !currentaudio.paused;
        if (audioWasPlaying) ignoreNextPause = true;
        closepanel();
        playsound(audioselect);

        if (audioWasPlaying) {
          setTimeout(() => {
            const audiobtn = document.querySelector(
              '.panel-btn[data-tab="audio"]'
            );
            if (audiobtn) {
              audiobtn.classList.add("active");
              focusedTabIndex = Array.from(panelbuttons).indexOf(audiobtn);
            }
          }, 0);
        }
      } else if (["a", "d"].includes(key)) {
        //Limitar na parte dos botões do painel
        focusedTabIndex =
          (focusedTabIndex + (key === "d" ? 1 : -1) + panelbuttons.length) %
          panelbuttons.length;
        updateTabFocus();
        playsound(audiomove);
      } else if (e.key === "Enter") {
        const tab = panelbuttons[focusedTabIndex].getAttribute("data-tab");
        if (tab === "audio") {
          const playBtn = document.getElementById("play-button");
          if (playBtn) {
            playBtn.click();
          }
        }
      }
    }
  }

  document.addEventListener("keydown", handleKeyNavigation);

  const iconMap = {
    info: "icon-info.png",
    description: "icon-description.png",
    abilities: "icon-abilities.png",
    audio: "icon-audio.png",
  };

  panelbuttons.forEach((btn) => {
    const tab = btn.getAttribute("data-tab");
    const iconFile = iconMap[tab];
    if (iconFile) {
      btn.innerHTML = `<img src="assets/${iconFile}" alt="${tab}" style="width: 24px; height: 24px;" />`;
    }
  });

  let currentData = null;
  let currenttype = null;

  function activateBars() {
    document.querySelectorAll(".bar").forEach((bar) => {
      bar.classList.add("bounce");
      bar.style.opacity = "1";
    });
  }

  function deactivatebars() {
    document.querySelectorAll(".bar").forEach((bar) => {
      bar.classList.remove("bounce");
      bar.style.height = "4px";
      bar.style.opacity = "0.3";
    });
  }

  async function loadcharacter(type) {
    const character = characters[type];
    if (!character) return;

    //Diskicon é para quem tem áudio (Batman e Charada)
    currenttype = type;
    openpanel();
    document.querySelectorAll(".disk-icon").forEach((el) => el.remove());

    ["batman", "riddler"].forEach((t) => {
      const square = document.querySelector(`.portrait-${t}`);
      if (square && !square.querySelector(".disk-icon")) {
        const disk = document.createElement("img");
        disk.src = "assets/icon-disk.png";
        disk.className = "disk-icon";
        square.appendChild(disk);
      }
    });

    titlename.textContent = character.name;
    titlename.hidden = false;
    imageel.src = character.image;
    imageel.alt = character.name;
    displaychar.hidden = false;
    panelel.hidden = false;

    titlename.textContent = character.name;
    titlename.hidden = false;
    titlename.classList.remove("fade-in");
    void titlename.offsetWidth; // Forçar reflow para reiniciar a animação
    titlename.classList.add("fade-in");

    imageel.src = character.image;
    imageel.alt = character.name;
    displaychar.hidden = false;

    try {
      const url = `https://api.batmanapi.com/v1/characters/${character.id}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("API error");

      const json = await response.json();
      currentData = json.data.attributes;

      audiobtn.hidden = !["batman", "riddler"].includes(type);
      panelbuttons.forEach((btn) => btn.classList.remove("active"));
      const infoBtn = document.querySelector('.panel-btn[data-tab="info"]');
      if (infoBtn) infoBtn.classList.add("active");
      updatePanelContent("info");
    } catch (error) {
      console.error("Error to load character:", error);
      panelcontent.textContent = "Error to load character.";
    }
  }

  function updatePanelContent(tab) {
    const tabTitles = {
      info: "Infos",
      description: "Description",
      abilities: "Abilities",
      audio: "Audio",
    };
    paneltitle.textContent = tabTitles[tab] || "???";

    if (!currentData) {
      panelcontent.textContent = "No data available.";
      return;
    }

    switch (
      tab //Switch dos botões serve para quando selecionar um botão do painel carregar as informações
    ) {
      case "info":
        panelcontent.innerHTML = `
          <p><strong>Real Name:</strong> ${currentData.name}</p>
          <p><strong>Alias:</strong> ${currentData.alias}</p>
          <p><strong>Role:</strong> ${currentData.role}</p>
          <p><strong>Gender:</strong> ${currentData.gender}</p>
          <p><strong>Status:</strong> ${
            currentData.alive ? "Alive" : "Deceased"
          }</p>
          <p><strong>Creator:</strong> ${currentData.creator}</p>
          <p><strong>First Appearance:</strong> ${
            currentData.first_appearance
          }</p>
        `;
        deactivatebars();
        break;

      case "description":
        panelcontent.textContent =
          currentData.description || "No description available.";
        deactivatebars();
        break;

      case "abilities":
        if (currentData.abilities && currentData.abilities.length > 0) {
          panelcontent.innerHTML = `<ul>${currentData.abilities
            .map((a) => `<li>${a}</li>`)
            .join("")}</ul>`;
        } else {
          panelcontent.textContent = "No abilitie registered.";
        }
        deactivatebars();
        break;

      case "audio": //Audio não depende da API
        if (["batman", "riddler"].includes(currenttype)) {
          const audioSrc = `assets/${
            currenttype === "batman" ? "audiobatman" : "audioriddler"
          }.mp3`;

          panelcontent.innerHTML = `
            <div class="audio-container">
              <button id="play-button" class="audio-play-button">▶</button>
              <audio id="audio" src="${audioSrc}"></audio>
              <div class="visualizer">
                ${Array.from(
                  { length: 8 },
                  (_, i) => `<div class="bar" style="--i:${i + 1}"></div>`
                ).join("")}
              </div>
            </div>
          `;

          const playButton = document.getElementById("play-button");
          const audio = document.getElementById("audio");
          const diskIcon = document.querySelector(
            `.portrait-${currenttype} .disk-icon`
          );
          currentaudio = audio;

          function startrotation() {
            if (diskIcon) diskIcon.classList.add("rotating");
          }
          function stoprotation() {
            if (diskIcon) diskIcon.classList.remove("rotating");
          }

          playButton.addEventListener("click", () => {
            if (audio.paused) {
              audio.play();
              playButton.textContent = "⏸";
              activateBars();
              startrotation();
            } else {
              audio.pause();
              playButton.textContent = "▶";
              deactivatebars();
              stoprotation();
            }
            playsound(audioplay);
          });

          audio.addEventListener("ended", () => {
            playButton.textContent = "▶";
            deactivatebars();
            stoprotation();
            playsound(audioplay);
          });

          audio.addEventListener("pause", () => {
            playButton.textContent = "▶";
            deactivatebars();
            stoprotation();
          });

          deactivatebars();
          stoprotation();
        } else {
          audiobtn.hidden = true;
          panelcontent.textContent = "Audio Unavailable.";
        }
        break;

      default:
        panelcontent.textContent = "Select a valid one.";
        deactivateBars();
    }
  }

  panelbuttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!currentData) return;
      panelbuttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      updatePanelContent(button.getAttribute("data-tab"));
      playsound(audiomove);
    });
  });

  document.querySelectorAll(".square").forEach((square) => {
    square.addEventListener("click", async () => {
      const badge = square.querySelector(".badge-new");
      if (badge) badge.remove();

      document
        .querySelectorAll(".square")
        .forEach((s) => s.classList.remove("selected"));
      square.classList.add("selected");

      const classList = Array.from(square.classList);
      const portraitClass = classList.find((cls) =>
        cls.startsWith("portrait-")
      );
      if (!portraitClass) return;

      const type = portraitClass.replace("portrait-", "");
      await loadcharacter(type);
      openpanel();
      playsound(audioselect);
    });

    square.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        square.click();
      }
    });
  });

  // Detecta botão "voltar" no celular e simula a tecla ESC
  window.addEventListener("popstate", function () {
    const escEvent = new KeyboardEvent("keydown", { key: "Escape" });
    document.dispatchEvent(escEvent);
  });

  if (window.history && window.history.pushState) {
    window.history.pushState({}, "");
  }

  // Inicializa com imagem e nome do Batman (Com a intenção de ficar inspirado no jogo)
  const batman = characters.batman;
  currenttype = "batman";
  titlename.textContent = batman.name;
  titlename.hidden = false;
  imageel.src = batman.image;
  imageel.alt = batman.name;
  displaychar.hidden = false;
  panelel.hidden = true;
  paneltitle.hidden = true;
  panelcontent.hidden = true;
  panelbuttons.forEach((btn) => (btn.hidden = true));
  audiobtn.hidden = true;
  showsquares();
});
