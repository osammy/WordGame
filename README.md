# Project: Word-Game 

This project is a word game, that will be fully featured, word game. Where a player can play against either the `computer` as an opponent or play against a friend online(This will be the strecth task). This game will be built by several developers working as a team, from one repo. As such care needs to be taken so as not to undermine the work of another. Based on this, certain guidelines follow.

## Guidelines

**Read these guidelines carefully. Feel free to contact me, if you have any questions.**

### Commits

- [ ] Commit your code regularly and meaningfully. This helps other members working on the same module pick right from where you left off.
- [ ] Do not install any packages outside those that are already on the package.json, having differenc package.json file will make ot difficult to merge code without conflict, If there is any need to install any particular package other than those selected for the project, let the PM, and the team know so that it can be added to the master.

### Description
A player can Initiate a game between him/her and the    `computer` or `human opponent`(stretch task). Once a game is instantiated, Then game  begins a count down (The initiator of the game has the chance to set a time alloted for a player to finish a complete word before he lose's his turn)
the system will generate say four rows of n-boxes where (n can be anything  from 4 - 10). The Players are provided with an intelligent random set of tiles(I say intelligent because the random tiles must include enough letters to actually have several options of different word combinations possible), each tile carrying a letter(Think of it like the tiles in scrabble). The player is required to fill up the empty box making a correct word in the process, after which the `computer` or an `opponent` is required to play next. On completing a succesful word, the player is awarded a score, and then it becomes the opponent's turn to play. Failure to make up a correct word, a player can either choose to skip a turn or refresh his tiles, both the latter and the former will mean the player loose's a turn. When a player cant seem to form a word after the countdown timer reaches zero, the other opponent is declared the winner.

## Project Eependencies

This list will be modified before project kicks-off fully

Frontend

- [ ] Redux (This will be a good way to practice next week's stuffs)
- [ ] A UI-framework either semantic-ui or material-ui (The UI team will pick this) excellent utility UI elements
- [ ] Animate.css aid with animations
- [ ] react-icons Excellent for icons
- [ ] Style-components
- [ ] Formik  Excellent for forms
- [ ] Axios good ajax calls

Backend (stretch)

- [ ] Nodejs
- [ ] Express
- [ ] SocketIO
- [ ] Redis or nedb for in-memory database

## Minimum Viable Product

- [ ] A working game with the play against computer options

### Project Duration

This Project is designed to be intense, engaging and rewarding as well. It will stretch us, and also help us become comfortable with designing and building out a relatively complex application bit by bit. As such this project should be delivered in under 3 weeks aside form teh stretch which can extems the project durations by no more than 2 weeks.




