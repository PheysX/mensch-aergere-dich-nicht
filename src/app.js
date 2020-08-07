import GameMaedn from './components/game-maedn/game-maedn.vue'
import {v4 as uuidv4} from 'uuid'

export default {
    name: 'App',
    components: {
        GameMaedn
    },
    data() {
        return {
            gameFieldSize: 4,
            playersQuantity: 4,
            players: []
        }
    },

    created() {
        const color = ['#039dff', '#00bf02', '#fefd00', '#ff0000'];

        for (let i = 0; i < this.playersQuantity; i++) {
            const playerId = uuidv4();
            this.players[i] = {
                id: playerId,
                figuresAtStartHome: true,
                color: color[i],
                figures: []
            }
        }
    }
}