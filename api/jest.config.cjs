/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
    return {
        verbose: true,
        testEnvironment: 'node',
        testMatch: ['**/**/*.test.js'],
        forceExit: true,
        //clearMocks: true
        coverageThreshold: {
            global: {
                branches: 80,
                functions: 80,
                lines: 80,
                statements: 80,
            },
        },
        collectCoverageFrom: [
            'src/**/*.{js,jsx}',
            '!src/**/*.test.{js,jsx}',
            '!src/index.js',
            '!src/reportWebVitals.js',
            '!src/setupTests.js',
        ],
    };
};
