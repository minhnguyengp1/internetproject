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
                branches: 40,
                functions: 40,
                lines: 40,
                statements: 40,
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
