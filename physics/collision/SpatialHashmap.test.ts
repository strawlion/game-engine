import SpatialHashmap from './SpatialHashmap';
import Bodies from '../body/Bodies';

describe('SpatialHashmap', () => {
    describe('constructor', () => {
        test('should generate correct grid', () => {
            const testCases = [
                {
                    config: { width: 20, height: 20, cellSize: 2 },
                    expected: { numCols: 2, numRows: 2 },
                }
            ];

            for (const testCase of testCases) {
                const map = new SpatialHashmap(testCase.config);
                expect(map.grid.length).toEqual(testCase.expected.numCols);
                expect(map.grid[0].length).toEqual(testCase.expected.numRows);
            }
        });
    });

    describe('add', () => {

        test('should put inbounds objects in overlapping cells', () => {
            // TODO:
        });

        test('should put out of bounds objects in closest cells', () => {
            const map = new SpatialHashmap({
                width: 20,
                height: 20,
                cellSize: 3,
            });

            map.add({
                body: Bodies.rectangle({
                    x: 0,
                    y: -1,
                    width: 20,
                    height: 1,
                })
            })
            const cellIds = map.filterCell(cell => cell.objects.length)
                             .map(v => v.id);
            expect(cellIds).toEqual(['0,0', '1,0', '2,0']);
        });

    });

});
