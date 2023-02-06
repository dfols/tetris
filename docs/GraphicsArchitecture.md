# Game Architecture

This page is a high-level overview of the game architecture. There are two primary structures for the game, the Board React component and the Game class. The Board component handles graphics and user input. The Game class handles all the game logic like movement and scoring.

## Board Component
The Board component first loads in the graphics. It starts by loading a square bitmap that is white with rounded edges. Alpha effects may be added to the bitmap at a later time. After the bitmap file is loaded, the board creates new colors by multiplying a color value with the bitmap. The component registers keyboard hooks to listen for keyboard input to pass to the Game class. After the graphics are loaded, it triggers the start of the game. Graphics drawing occurs in a redraw callback. When the Game class determines the board state has changed, it calls the redraw callback with the new board state.

## Game Logic
The Game class handles all piece movement and scoring. Game updates the board state based on timer callbacks. Each time 'onTick' is called, the game state is updated, such as by moving the active piece one spot down. Logic that is specific to piece types is handled in individual piece classes. These piece classes determine if a piece can move left and right or if they can drop any more. The piece class also adds its squares to a board when requested by the game logic. Active piece movement is also handled in timer callbacks that are separate from the main update timer callback and are started when a movement command is sent by the Board componenet.

### Redraw Cycle
For each redraw cycle, the game logic makes a copy of the game board (which only contains static blocks) into a temporary board, it then calls the active piece to add its squares to that temporary board. The temporary board is then sent to the Board component redraw callback.
