class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getGameState();
  } 

  getGameState() {
    return {
      generalStats: {
        xp: 0, 
        elements: [1, 1, 1],
        starter: "Bob",
        moves: [],
        passives: []
      },
      battleStats: null,
      inBattle: false
    }
  }
}