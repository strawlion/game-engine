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
    const Color = {
        dirtBrown: '#573B0C',
        water: '#063fb2',
    };

    const world = {
        width: 50,
        height: 50,
        noMatchingLayerColor: 'black',
    };

    const layers = [
        createLayer({
            id: 'dirt',
            seed: 'seed',
            color: Color.dirtBrown,
            onChange(layerConfig) {
                updateTerrainPreview(game);
            }
        })
    ];

    document.body.append(
        createSlider({
            name: 'Width',
            min: 1,
            max: 100,
            step: 1,
            defaultValue: world.width,
            onChange(value) {
                world.width = value;
                updateTerrainPreview(game);
            }
        }),
        createSlider({
            name: 'Height',
            min: 1,
            max: 100,
            step: 1,
            defaultValue: world.height,
            onChange(value) {
                world.height = value;
                updateTerrainPreview(game);
            }
        }),
        ...layers.map(layer => layer.element),
        createElement('div', { attrs: { id: 'terrain-preview' } }),
    );

    const game = await createGame<GameState>({
        targetGameLogicFrameRate: 10,
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
            width: world.width,
            height: world.height,
            layers: layers.map(layer => layer.config),
            noMatchingLayerColor: world.noMatchingLayerColor,
        });
    }
}


interface GenerateTerrainOptions {
    width: number;
    height: number;
    layers: LayerConfig[];
    noMatchingLayerColor: string;
}
function generateTerrain(game: Game<GameState>, options: GenerateTerrainOptions) {
    const { terrainBuilder } = terrainGenerationUtils;
    const grid = terrainBuilder<string>({
        width: options.width,
        height: options.height,
    })
    .layers(options.layers)
    .build()

    const layerToColor = options.layers.reduce((layerToColor, layer) => {
        layerToColor[layer.id] = layer.color;
        return layerToColor;
    }, {});

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
            });

            terrainBlocks.push(
                game.createGameObject({
                    type: block,
                    body,
                    renderBody: {
                        shape: body,
                        color: {
                            fill: layerToColor[block] || options.noMatchingLayerColor,
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

function createTextInput(options: { name: string, defaultValue: string; onChange: (value: string) => void }) {

    return createElement('div', {
        attrs: {
            class: 'inputcontainer',
        },
        children: [
            createElement('label', {
                children: [options.name],
            }),
            createElement('input', {
                    attrs: {
                        type: 'text',
                        value: options.defaultValue,
                    },
                    events: {
                        input(event) {
                            // @ts-ignore
                            options.onChange(event.target.value);
                        }
                    }
                }
            )
        ]
    });
}


function createColorPicker(options: { defaultValue: string; onChange: (value: string) => void }) {

    return createElement('div', {
        attrs: {
            class: 'colorpickercontainer',
        },
        children: [
            createElement('label', {
                children: ['Color'],
            }),
            createElement('input', {
                    attrs: {
                        type: 'color',
                        value: String(options.defaultValue),
                    },
                    events: {
                        input(event) {
                            // @ts-ignore
                            options.onChange(event.target.value);
                        }
                    }
                }
            )
        ]
    });
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

function createRandomSeed() {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let seed = '';
    for (let i = 0; i < 5; i++) {
        seed += characters[Math.floor(Math.random() * characters.length)];
    }
    return seed;
}

function createRandomHex() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}


interface LayerConfig {
    id: string;
    seed: string;
    color: string;
    smoothness: number;
    threshold: number;
    scalingFactor: number;
}


interface CreateLayerConfig {
    id: string;
    seed?: string;
    color?: string;
    onChange: (layerConfig: LayerConfig) => void;
}

function createLayer(options: CreateLayerConfig) {

    const layerConfig: LayerConfig = {
        id: options.id,
        seed: options.seed || createRandomSeed(),
        color: options.color || createRandomHex(),
        smoothness: 0.32,
        threshold: 0.38,
        scalingFactor: 1,
    };

    return {
        config: layerConfig,
        element: createElement('div', {
            attrs: {
                class: 'layer',
            },
            children: [
                createTextInput({
                    name: 'Seed',
                    defaultValue: layerConfig.seed,
                    onChange(value) {
                        layerConfig.seed = value || undefined;
                        options.onChange(layerConfig);
                    }
                }),
                createColorPicker({
                    defaultValue: options.color,
                    onChange(value) {
                        options.color = value;
                        options.onChange(layerConfig);
                    }
                }),
                createSlider({
                    name: 'Smoothness',
                    min: 0.01,
                    max: 1,
                    step: 0.01,
                    defaultValue: layerConfig.smoothness,
                    onChange(value) {
                        layerConfig.smoothness = value;
                        options.onChange(layerConfig);
                    }
                }),
                createSlider({
                    name: 'Threshold',
                    min: 0.01,
                    max: 1,
                    step: 0.01,
                    defaultValue: layerConfig.threshold,
                    onChange(value) {
                        layerConfig.threshold = value;
                        options.onChange(layerConfig);
                    }
                }),
                createSlider({
                    name: 'ScalingFactor',
                    min: 0.01,
                    max: 4,
                    step: 0.01,
                    defaultValue: layerConfig.scalingFactor,
                    onChange(value) {
                        layerConfig.scalingFactor = value;
                        options.onChange(layerConfig);
                    }
                }),
            ]
        })
    };

}
