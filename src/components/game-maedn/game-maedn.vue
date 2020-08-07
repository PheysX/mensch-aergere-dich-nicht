<template>
  <div class="game-maedn">
    <div class="game-field" v-if="gameFieldPrepared">
      <div class="homes start">
        <div class="home"
             v-for="player in getPlayers"
             :player-home="player.id"
             :key="player.id">
          <div class="field"
               :style="'background-color:' + player.color"
               v-for="(loop, index) in figureQuantity" :key="loop">
            <span class="figure"
                  v-if="player.figures[index].isHome"
                  :key="player.figures[index].id"></span>
          </div>
        </div>
      </div>
      <div class="homes finish">
        <div class="home"
             v-for="player in getPlayers"
             :player-finish="player.id"
             :key="player.id">
          <div class="field"
               :style="'background-color:' + player.color"
               v-for="loop in figureQuantity" :key="loop"></div>
        </div>
      </div>
      <div class="fields">
        <div class="field"
             v-for="(field, index) in fields"
             :style="fieldStyle(index)"
             :player-home="field.playerId"
             :key="field.id"></div>
      </div>
    </div>
    <div :style="'width: 50px; height: 50px; background-color:' + getPlayers[activePlayerIndex].color">
    </div>
    <div class="dice-container">
      <button class="dice-action" @click="diceRoll">Würfeln</button>
      {{ diceQuantity }}
      <div class="dice-display" :data-quantity="diceQuantity">
        <span class="eye"
              v-for="eye in diceQuantity"
              :key="eye"></span>
      </div>
    </div>
    <div v-if="gameIsOver" class="">{{ gameWinner }} hat gewonnen</div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./style.scss"></style>