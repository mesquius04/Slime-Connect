# Welcome to Slime-Connect 🎉

This repository contains **Slime-Connect**, a project I created during my second year of Computer Science studies. It was my second project in JavaScript and the first one built entirely with vanilla JS. While it might not follow all best practices, it represents a key milestone in my journey as a developer, and I am very proud of it.

![slime](https://github.com/user-attachments/assets/e048dd1e-7fe6-4477-a078-5e85e7904302)

## Introduction
In **Slime-Connect**, you can choose the **bet amount**, which is the 'money' you are willing to spend per spin. The rewards adjust accordingly, but the Return to Player (RTP) remains the same. You can also enable **Auto Spin** mode for 10, 20, 50, or 100 automatic spins. Additionally, you can select the spin speed: **Normal**, **Fast**, or **Fast++**.

Occasionally, a **Special Spin** occurs, during which slimes grow and offer better rewards:

- **Darkness Slimes** can combine with other slimes and provide multipliers such as **x2**, **x5**, **x10**, or **x25**.
- **Heaven Slimes** can also combine with other slimes. A large Heaven Slime can expand vertically within its column.
- Other slimes do not have special abilities, but they follow a ranking: **Green > Yellow > Blue = Red > Brown**.

Additionally, there is the **Bonus Feature**, which is rare but can be triggered by landing three *King Slimes* in a single spin. This bonus awards a set of **Free Spins**, accompanied by *Mini-Slimes* that provide additional benefits. During the bonus round, *Darkness Slimes* can expand within their column, **including their multiplier**.

## Getting Started

To start using **Slime-Connect**, simply clone this repository, find `index.html` file and run it with **Live Server** in your preferred code editor (e.g., VSCode). No additional setup is required.

## Technical Key Points

1. **Function Logic Review**
   - The project follows a modular approach, with well-defined functions for each responsibility. For example, in `/src/js/gameLogic.js`, the *check* function handles:
     - Validation of the combinations of slimes.
     - Applying game rules and modifiers (e.g., multipliers from special slimes).
     - Calculating and returning rewards based on the player's bet.
   - This separation of concerns makes the code easier to maintain and debug.

2. **Rendering Module**
   - The game uses the **Canvas API** for drawing and animating the slimes, providing a smooth visual experience without relying on external libraries. The rendering module:
     - Handles sprite drawing and animations for each slime type.
     - Optimizes rendering by redrawing only when necessary, minimizing performance overhead.
     - Includes a custom animation loop to control the spin speed (Normal, Fast, Fast++).
     - Visually highlights slime combinations detected by the *check* function, as seen in the *linear_paint* function in `/src/js/visuals.js`.

3. **Statistical Optimization**
   - The game logic includes statistical elements to ensure balanced gameplay. Key optimizations include:
     - Adjusting the probability of different slime types appearing to match the desired RTP (Return to Player).
     - Special logic for handling **Special Spins** and **Bonus Features** to maintain excitement without making the game too predictable.
     - Avoiding external scripting, ensuring a purely probabilistic game experience that enhances randomness and fairness.

4. **Bonus Feature Implementation**
   - The **Bonus Feature** is a key part of the game, triggered by landing three *King Slimes*. The bonus mode includes:
     - Awarding a number of **Free Spins** depending on the number of *King Slimes* found.
     - Introducing *Mini-Slimes* that provide additional boosts during the bonus round.
     - Enhancing the behavior of *Darkness Slimes*, allowing them to expand vertically with their multiplier applied.
   - The implementation uses a state machine to handle transitions between normal gameplay and bonus mode, ensuring a smooth user experience.

## Gallery
![image](https://github.com/user-attachments/assets/7ec498e1-29ca-4f89-81c5-16557ca69266)

![image](https://github.com/user-attachments/assets/254224a0-f3a7-4adb-b085-3b1fcf83e647)

![image](https://github.com/user-attachments/assets/7246a7ca-69d0-4a72-9859-d795b90f16b2)

![image](https://github.com/user-attachments/assets/63cf0494-0dcc-4f2e-8f2c-08b6d3c0318e)
