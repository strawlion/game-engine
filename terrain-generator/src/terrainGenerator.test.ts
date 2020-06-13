import terrainGenerator from '.';
import Vector from './Vector';
import ModifyThreshold from './ModifyThreshold';
const { terrainBuilder } = terrainGenerator;


const CreateModifyThresholdFn: Record<string, (config) => ModifyThreshold> = {

    // TODO: Linear decay, linear growth
    ConcentratedOrigin: (origin: Vector) => {
        return (cell, worldInfo) => {
            const { width, height } = worldInfo;

            const distanceFromOrigin = Math.sqrt((origin.x - cell.x) ** 2 + (origin.y - cell.y) ** 2);
            const maxWorldDistance = Math.sqrt(width ** 2 + height ** 2);
            const percOfMaxDistance = distanceFromOrigin / maxWorldDistance;
            const closenessToOrigin = 1 - percOfMaxDistance;
            return cell.threshold * closenessToOrigin;
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
                    modifyThresholdFns: [
                        CreateModifyThresholdFn.ConcentratedOrigin({
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
