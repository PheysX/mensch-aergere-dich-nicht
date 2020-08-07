import {v4 as uuidv4} from 'uuid'

export default {
    name: 'GameMaedn',

    props: {
        gameFieldSize: {
            type: Number,
            default: 4

        },
        playersQuantity: {
            type: Number,
            required: true,
            default: 4
        },
        initPlayers: {
            type: Array,
            required: true,
        }
    },

    data() {
        return {
            figureQuantity: 4,
            fieldQuantity: 40,
            fields: [],
            diceQuantity: null,
            gameFieldPrepared: false,
            activePlayerIndex: 0,
            gameIsOver: false,
            gameWinner: null,
            players: null,

        }
    },

    created() {
        this.players = this.initPlayers

        this.preparePlayers()
        this.prepareFields()

        this.gameFieldPrepared = true
    },

    computed: {
        getPlayers() {
            return this.players
        },

        activePlayer() {
            return this.players[this.activePlayerIndex]
        },

        firstFigureAtHome() {
            if (this.players[this.activePlayerIndex].figuresAtStartHome) {
                return this.players[this.activePlayerIndex].figures.filter((figure) => {
                    return figure.isHome === true
                })[0]
            }

            return null
        },

        playerHomeEntranceField() {
            return this.fields.filter((field) => {
                return field.playerId === this.activePlayer.id
            })[0]
        },

        playerHomeEntranceFieldUsedByEnemy() {
            if (this.playerHomeEntranceField.figure !== null) {

                console.log(this.playerHomeEntranceField.figure)
                console.log(this.activePlayer.figures)

                const fieldFigure = this.activePlayer.figures.filter((figure) => {
                    return figure.id === this.playerHomeEntranceField.figure
                })[0]

                return !fieldFigure;
            }

            return false
        }
    },

    methods: {
        preparePlayers() {
            this.players.forEach((player) => {
                for (let i = 0; i < this.figureQuantity; i++) {
                    player.figures[i] = {
                        id: uuidv4(),
                        position: i,
                        field: null,
                        isHome: true
                    }
                }
            })
        },

        prepareFields() {
            let playerIncrement = 0;

            for (let i = 0; i < 40; i++) {
                this.fields[i] = {
                    id: uuidv4(),
                    figure: null,
                    playerStart: false
                }

                if (i % 10 === 0) {
                    this.fields[i].playerStart = true
                    this.fields[i].playerId = this.players[playerIncrement].id
                    this.fields[i].playerIncrement = playerIncrement

                    playerIncrement++
                }
            }
        },

        diceRoll() {
            // let asd = true

            // for (let i = 0; i < 10; i++) {
            //     setTimeout(() => {
            //         this.diceQuantity = Math.floor((Math.random() * 6) + 1)
            //         console.log(this.diceQuantity)
            //     }, 750)
            // }

            this.diceQuantity = Math.floor((Math.random() * 6) + 1)

            /**
             * 6 gewürfelt
             * min. 1 Figur im Start Home
             * Eintrittsfeld frei
             */
            if (this.diceQuantity === 6 &&
                this.firstFigureAtHome !== null &&
                (
                    this.playerHomeEntranceField.figure === null ||
                    this.playerHomeEntranceFieldUsedByEnemy === true
                )
            ) {
                console.log('6')
            }
        },

        fieldStyle(index) {
            const field = this.fields[index]

            if (field.playerStart) {
                const player = this.players[field.playerIncrement]

                return 'background-color:' + player.color
            }
        }
    }
}