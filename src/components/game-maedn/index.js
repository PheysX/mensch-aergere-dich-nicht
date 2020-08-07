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

                const fieldFigure = this.activePlayer.figures.filter((figure) => {
                    return figure.id === this.playerHomeEntranceField.figure
                })[0]

                return !fieldFigure;
            }

            return false
        },

        useHomeFigure() {
            return this.diceQuantity === 6 &&
                this.firstFigureAtHome !== null &&
                (
                    this.playerHomeEntranceField.figure === null ||
                    this.playerHomeEntranceFieldUsedByEnemy === true
                );
        }
    },

    methods: {
        playerFiguresOnField() {
            return this.activePlayer.figures.filter((figure) => {
                return figure.isHome === false
            }).length
        },

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

        nextPlayer() {
            console.log('Zug zuende')
            
            if (this.activePlayerIndex === (this.playersQuantity - 1)) {
                this.activePlayerIndex = 0;

                return
            }

            this.activePlayerIndex++
        },

        replaceFigure() {
            console.log('Figur automatisch replacen')

            this.nextPlayer()
        },

        diceRoll() {
            this.diceQuantity = Math.floor((Math.random() * 6) + 1)

            if (this.useHomeFigure) {
                this.placeFigureOnGameField(this.firstFigureAtHome, this.playerHomeEntranceField)
            } else if (this.playerFiguresOnField() > 1) {
                console.log('Figur selber replacen')
            } else if (this.playerFiguresOnField() > 0) {
                this.replaceFigure()
            } else {
                this.nextPlayer()
            }
        },

        placeFigureOnGameField(figure, field) {
            figure.isHome = false
            figure.field = field.id
            field.figure = figure.id
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