import terrainGenerator from '.';
import Vector from './Vector';
import ModifyCellValue from './ModifyCellValue';
const { terrainBuilder } = terrainGenerator;


const CreateModifyCellValueFn: Record<string, (config) => ModifyCellValue> = {

    // TODO: Linear decay, linear growth
    ConcentratedOrigin: (origin: Vector) => {
        return (cell, grid) => {
            const { width, height } = grid;

            const distanceFromOrigin = Math.sqrt((origin.x - cell.x) ** 2 + (origin.y - cell.y) ** 2);
            const maxWorldDistance = Math.sqrt(width ** 2 + height ** 2);
            const percOfMaxDistance = distanceFromOrigin / maxWorldDistance;
            return cell.value * percOfMaxDistance;
        };
    }
};

describe('terrainGenerator', () => {

    // Using a constant seed to reduce possibility
    // of randomness between tests.
    const seed = 'test';
    describe('terrainBuilder', () => {

        test('should allow defining custom stuff', () => {
            const terrain = terrainBuilder({
                    width: 4,
                    height: 4,
                })
                .layer({
                    id: 'caves',
                    seed,
                    smoothness: 0.5,
                    threshold: 0.2,
                    modifyCellValueFns: [
                        CreateModifyCellValueFn.ConcentratedOrigin({
                            x: 0,
                            y: 0,
                        }),
                    ]
                }).build();

            expect(terrain).toEqual([
                    ["caves","caves",null, "caves"],
                    ["caves","caves",null, "caves"],
                    [null,    null,  null, "caves"],
                    [null,    null,  null, null],
                ]
            );
        });
    });

});
