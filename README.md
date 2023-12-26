# Black Jack Game

## How to start project
  1. In termainal run **"npm i"** to install all needed node modules.
  2. In terminal run **"npm run build"**. Webpack will build the progect in **dist/** folder.
  3. In terminal run **"npm run start"**. http-server will be launched on **http://localhost:8081/** and default browser window will open the Black Jack Game.

## How to run test
  1. In terminal run **"npm run test"**. All test suites will be runned and in the end you will see test coverage.

## How to read and generate progect documentation
  Documentation is generated automaticaly by using jsDoc 3 tool.

  To read documentaion in terminal run **"npm run doc"**. http-server will be launched on **http://localhost:3030/** and default browser window will progect documentation.
 
  To generate documentation please forward next steps
  1. In terminal run **"npm install -g jsdoc"**.
  2. In terminal run **"npm run doc"** and documentation will be gerated in **out/** folder. Depending on what operation is used some manipulations should be done. All related can be found here **https://www.npmjs.com/package/jsdoc**.

## How to play the game
  1. When user opens site in browser he will see empty table with 2 empty sections **"Dealer:"** and **"Player:"**. In the bottom part of the screen user can find button section with button **Start Game**
  2. When user presses the **Start Game** button he will see 2 cards in **Dealer section** (first dealer card will be hidden) and 2 cards in **Player section**. In button section instead of **Start Game** button user will find 2 butoons **Hit** and **Stay**.
  3. When user clicks **Hit** he receives 1 more card. User can click **Hit** till sum of his points lower than 22. If player score is more than 21 the Game ends, dealer hidden card is rotated and global scores are shown for both Player and Dealer. In the top of the screen user will see **"You loose!"** msg. In button section instead of **Hit** and **Stay** buttons user will see **Start Game** button.
  **Importan note:** if user gets 21 points he still has ability to press hit button.
  4. When user understands that he got enough poits he can press **Stay**. After that dealer hidden card is rotated and **dealer logic** starts
     ### Dealer logic
       1. Dealer takes card till dealer score is lower than player score and not equal 21.
       2. If dealer score is more than 21 then the Game ends, global scores are shown for both Player and Dealer. In the top of the screen user will see **"You win!"** msg. In button section instead of **Hit** and **Stay** buttons user will see **Start Game** button.
       3. If dealer score and player score equal 21 then the Game ends, global scores are shown for both Player and Dealer. In the top of the screen user will see **"Draw!"** msg. In button section instead of **Hit** and **Stay** buttons user will see **Start Game** button.
       4. If dealer score is more than player score and lower than 22 the Game ends, global scores are shown for both Player and Dealer. In the top of the screen user will see **"You loose!"** msg. In button section instead of **Hit** and **Stay** buttons user will see **Start Game** button.
  5. When user clicks **Start Game** button the new Game begins.