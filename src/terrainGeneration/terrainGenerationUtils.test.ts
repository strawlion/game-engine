import terrainGenerationUtils from './terrainGenerationUtils';

describe('terrainGenerationUtils', () => {

    describe('generateSimplexGrid', () => {
        test('it should allow you to fill cells with custom values', () => {
            const grid = terrainGenerationUtils.generateSimplexGrid({
                            width: 2,
                            height: 2,
                            seed: 'test',
                            fillCellValue: noiseValue => {
                                if (noiseValue < 0.33) {
                                    return 'low';
                                }
                                else if (noiseValue < 0.66) {
                                    return 'medium';
                                }
                                else {
                                    return 'high';
                                }
                            }
                        });

            expect(grid).toEqual([
                ['medium', 'low'],
                ['low', 'high'],
            ]);
        });
    });

});
