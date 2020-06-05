import terrainGenerationUtils from '../../src/terrainGeneration/terrainGenerationUtils';
import { GameObject, Game, createGame } from '../../src';
import physics from '../../physics';

// UI Spec
// Start with one noise function/layer by default
// Slider that controls step size
// Slider that controls threshold for rendering
// Render that shows result of change
// One slider to control step size

setupGame();

async function setupGame() {

    let width = 20;
    let height = 20;
    let smoothness = 0.5;
    let threshold = 0.5;
    document.body.append(
        createSlider({
            name: 'Width',
            min: 1,
            max: 100,
            step: 1,
            defaultValue: width,
            onChange(value) {
                width = value;
                updateTerrainPreview(game);
            }
        }),
        createSlider({
            name: 'Height',
            min: 1,
            max: 100,
            step: 1,
            defaultValue: width,
            onChange(value) {
                height = value;
                updateTerrainPreview(game);
            }
        }),
        createSlider({
            name: 'Smoothness',
            min: 0.01,
            max: 1,
            step: 0.01,
            defaultValue: smoothness,
            onChange(value) {
                smoothness = value;
                updateTerrainPreview(game);
            }
        }),
        createSlider({
            name: 'Threshold',
            min: 0.01,
            max: 1,
            step: 0.01,
            defaultValue: threshold,
            onChange(value) {
                threshold = value;
                updateTerrainPreview(game);
            }
        }),
        createElement('div', {
            attrs: {
                id: 'terrain-preview'
            }
        })
    )

    const game = await createGame<GameState>({
        width: 800,
        height: 600,
        container: document.querySelector('#terrain-preview'),
        state: {
            getWorld(state) {
                return [
                    ...state.terrain,
                ];
            },
            events: {
                gameInitialized(state, game: Game<GameState>) {
                    Object.assign(state, {
                        game,
                    });
                    updateTerrainPreview(game);
                },
            },

        },
    });


    game.start();

    function updateTerrainPreview(game) {
        game.store.state.terrain = generateTerrain(game, {
            width,
            height,
            threshold,
            smoothness,
        })
    }
}


interface GenerateTerrainOptions {
    width: number;
    height: number;
    threshold: number;
    smoothness: number;
}
function generateTerrain(game: Game<GameState>, options: GenerateTerrainOptions) {
    const { terrainBuilder } = terrainGenerationUtils;
    const grid = terrainBuilder<string>({
        width: options.width,
        height: options.height,
    })
    .dirt({
        threshold: 1,
        smoothness: 1,
    })
    .cave({
        threshold: options.threshold,
        smoothness: options.smoothness,
    })
    .build();

    console.log(grid)

    // Assuming terrain fills viewport
    const terrainOriginY = 100;
    const numHorizontalBlocks = grid.length;
    const numVerticalBlocks = grid[0].length;
    const blockWidth = game.width / numHorizontalBlocks;
    const blockHeight = (game.height - terrainOriginY) / numVerticalBlocks;

    const terrainBlocks = [];
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            const block = grid[x][y];
            const body = physics.Bodies.rectangle({
                x: x * blockWidth,
                y: terrainOriginY + (y * blockHeight),
                width: blockWidth,
                height: blockHeight,
            })
            terrainBlocks.push(
                game.createGameObject({
                    type: block,
                    body,
                    renderBody: {
                        shape: body,
                        color: {
                            // fill: `rgba(17, 255, 0, ${block})`
                            // `rgb(255, 227, 179, ${block})`

                            // `hsl(100,100%,${block * 100}%)`
                            fill: block === 'cave' ? 'black' : '#573B0C',
                        }

                    }
                })
            );
        }
    }

    return terrainBlocks;
}

interface GameState {
    game?: Game<GameState>;
    terrain: GameObject[];
}

function createSlider(options: SliderOptions) {
    const valueSpan = createElement('span', {
        children: [String(options.defaultValue)],
    });

    return createElement('div', {
            attrs: {
                class: 'slidecontainer',
            },
            children: [
                createElement('label', {
                    children: [options.name],
                }),
                createElement('input', {
                    attrs: {
                        type: 'range',
                        min: String(options.min),
                        max: String(options.max),
                        step: String(options.step),
                        value: String(options.defaultValue),
                        class: 'slider',
                    },
                    events: {
                        input(event) {
                            // @ts-ignore
                            const newValue = event.target.value;

                            valueSpan.innerText = newValue;
                            options.onChange(newValue);
                        }
                    }
                }),
                valueSpan,
            ]
        }
    );
}

interface CreateElementOptions {
    attrs?: Record<string, string>;
    events?: Record<any, (event: Event) => void>;
    children?: (HTMLElement | string)[];
}
function createElement(tagName: string, options: CreateElementOptions) {

    const el = document.createElement(tagName);
    if (options.attrs) {
        Object.keys(options.attrs).forEach((key) => {
            if (options.attrs[key] != null) {
            el.setAttribute(key, options.attrs[key]);
            }
        });
    }

    if (options.events) {
        Object.keys(options.events).forEach((key) => {
            el.addEventListener(key, options.events[key]);
        });
    }

    if (options.children) {
        el.append(...options.children)
    }


    return el;
}

interface SliderOptions {
    name: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    onChange: (newValue: number) => void;
}
