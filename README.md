<img src="./assets/thebatmanarkhamcitylogo.png" alt="logo" width="360"/>

# Arkham Encontra a Vingança

Lançada em 2008, a franquia de jogos Arkham inspirou diversas outras mídias, como jogos, filmes e outras histórias como, por exemplo, *The Batman*, até certo ponto. Não é de se surpreender, já que o segundo jogo, intitulado *Batman: Arkham City*, recebeu o prêmio de Melhor Jogo de Ação em 2012 pela VGA.

Um dos elementos clássicos da saga é sua interface distinta, entre eles o sistema de biografias dos personagens. O intuito desse recurso é explicar e detalhar informações dos personagens que Batman ou seus aliados encontram durante a história, facilitando a compreensão do jogador sobre quem são essas figuras.

Com o sucesso do filme *The Batman*, a série do *Pinguim*, e com *The Batman – Parte II* chegando aos cinemas, seria interessante imaginar como seria a tela de biografia do jogo *Batman: Arkham City*, adaptada para os personagens e o visual da chamada “A Saga The Batman”.

# Arkham Meets Vengeance

Released in 2008, the *Arkham* game franchise has inspired various other media, such as games, films, and stories for example, *The Batman*, to some extent. It's no surprise, considering the second game, titled *Batman: Arkham City*, won the award for Best Action Game in 2012.

One of the classic elements of the saga is its distinct interface, including the character biography screen. The purpose of this feature is to explain and provide details about characters that Batman or his allies encounter throughout the story, helping players understand who they are without much difficulty.

With the success of *The Batman* film, the *Penguin* series, and *The Batman – Part II* set to hit theaters, it’s interesting to imagine how the biography screen from *Batman: Arkham City* would look if adapted to the characters and design of the so-called "The Batman Saga".

| <div align="center">Desktop</div> |
|:--:|
| <img src="./preview/images/preview-desktop.png" alt="Preview Desktop" width="800"/> |

---
<div style="display: flex; justify-content: space-between; align-items: center;">
  <img src="./preview/images/preview-tv.png" alt="Preview TV" style="height: 250px; width: auto;"/>
  <img src="./preview/images/preview-ipadpro.png" alt="Preview IPad Pro" style="height: 250px; width: auto;"/>
  <img src="./preview/images/preview-phone.png" alt="Preview Celular" style="height: 250px; width: auto;"/>
</div>

<p style="text-align: center; font-style: italic; margin-top: 8px;">
  TV, IPad Pro, and phone.
</p>

---


# 🔍 Como buscar as informações?

Para obter as informações, foi usada uma API chamada **Batman API**.

Ela fornece praticamente todos os dados que aparecem no painel de biografia de todos os personagens disponíveis.

Como o projeto exige detalhes como "Primeira Aparição" e "Habilidades" para retratar a obra original, essa API foi necessária.

Levando em conta que, no jogo, o Batman busca essas informações via banco de dados, faz sentido também chamar uma API para receber dados externos.

**Detalhe 1:** O nome verdadeiro do Charada no filme é Edward Nashton, porém a API utiliza seu nome original, Edward Nigma.

**Detalhe 2:** Similar ao problema do nome do Charada, a API retrata as armas de guarda-chuva do Pinguim original em alguns tópicos.

**Detalhe 3:** Para fazer jus à nomenclatura do próprio Batman, não seria interessante chamar essa API de BatApi? (Brincadeira)

Link para a API: https://batmanapi.com/


# 🔍 How to fetch the information?

To retrieve the data, an API called **Batman API** was used.

It provides almost all the information shown on the biography panel of all available characters.

Since the project requires details like "First Appearance" and "Abilities" to accurately portray the source material, this API was necessary.

Considering that in the game Batman pulls this data from a database, it makes sense to also call an API to receive external information.

**Detail 1:** The real name of the Riddler in the movie is Edward Nashton, but the API uses his original name, Edward Nigma.

**Detail 2:** Similar to the issue with the Riddler’s name, the API reflects the original Penguin’s umbrella weapons in some topics.

**Detail 3:** To honor Batman’s own naming style, wouldn’t it be interesting to call this API BatApi? (Just Kidding)

Link to the API: https://batmanapi.com/

---

# 🔥 Novo estilo, mesmas funções

A tela de biografia de *Arkham City* focava em replicar o visual da WayneTech, com cores voltadas para o azul e tons monocromáticos. Apesar de bem executado, o projeto tomou outro rumo: adotou o estilo e design vistos em *The Batman* (2022), com tons em vermelho, alaranjado e preto, buscando representar melhor a atmosfera dos pôsteres e da identidade visual do filme.

A inspiração principal continua sendo a tela de biografia de *Arkham City*, mas também foram incorporadas ideias de outros jogos: os efeitos sonoros de *Arkham Asylum*, a transição mais abrupta dos personagens em *Arkham Origins*, e as bordas animadas de *Arkham Knight*. Assim, o projeto não se limita a um único jogo, explorando ao máximo diferentes possibilidades.

Sobre as bordas: ao invés de manter a textura tecnológica do *Arkham Knight*, decidiu-se representar um momento-chave do enredo do filme, o resgate durante a inundação, com o uso do sinalizador.

# 🔥 New style, same functions

The biography screen in *Arkham City* aimed to replicate the WayneTech interface, featuring blue and monochromatic tones. While it was well-executed, this project took a different path, adopting the style and design of *The Batman* (2022), with red, orange, and black tones to better reflect the atmosphere and aesthetics of the film's posters.

The primary inspiration is still the *Arkham City* biography screen, but elements from other games were also incorporated: the sound effects from *Arkham Asylum*, the sharper character transitions from *Arkham Origins*, and the animated borders from *Arkham Knight*. The goal was not to stick to a single game, but to explore all possible creative directions.

Regarding the borders: instead of following the tech-textured style from *Arkham Knight*, the idea was to represent a key moment from the film’s plot, the rescue during the flood, marked by the use of the flare.

| <div align="center">Arkham City X Wireframe</div> |
|:--:|
| <img src="./wireframes/3-comparasion.png" alt="Preview Desktop" width="500"/> |

| <div align="center">Border Style</div> |
|:--:|
| <img src="./wireframes/4-borders.png" alt="Preview Desktop" width="500"/> 

---

## 🖥️ Elementos da Interface

- A tela de biografia possui alguns recursos, como o aviso "NEW" nos retratos, indicando que um perfil foi desbloqueado, semelhante ao que ocorre em *Arkham City*.

- Um visualizador de áudio representa as frequências sonoras. Ao retornar para a tela dos personagens, o disco dos repectivos personagens começa a girar, indicando que o áudio ainda está ativo. (Somente o Batman e o Charada possuem áudio)

- Por fim, a interface foi adaptada para funcionar tanto com teclado quanto com tela sensível ao toque.

## 🖥️ Interface Elements

- The biography screen includes features like the "NEW" badge on portraits, indicating an unlocked profile, similar to what you see in *Arkham City*.

- An audio visualizer displays the sound frequencies. When returning to the character screen, the respective character's disc begins to spin, indicating that the audio is still playing. (Only Batman and Riddler have audio)

- Finally, the interface has been adapted to support both keyboard and touchscreen input.

| Function |  Image |
|------|--------|
| NEW Badge | <img src="./preview/gifs/preview-newbadge.gif" width="200px"> |
| Audio Visualizer | <img src="./preview/gifs/preview-visualizer.gif" width="200px"> |

---

| <div align="center">Interface (IPad Pro)</div> |
|:--:|
| <img src="./preview/gifs/testingipadpro-preview.gif" alt="Interface Teste" height="500"/> |

---


