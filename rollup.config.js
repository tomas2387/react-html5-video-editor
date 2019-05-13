// rollup.config.js

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';

export default {
    input: 'src/RdxVideo.js',
    output: {
        file: 'dist/react-html5-video-editor.js',
        format: 'cjs',
    },
    plugins: [
        babel({
            exclude: 'node_modules/**',
        }),
        resolve(),
        commonjs({
            // non-CommonJS modules will be ignored, but you can also
            // specifically include/exclude files
            include: 'node_modules/**', // Default: undefined
            // exclude: ['node_modules/foo/**', 'node_modules/bar/**'], // Default: undefined
            // these values can also be regular expressions
            // include: /node_modules/
            namedExports: {
                'node_modules/react/index.js': [
                    'Component',
                    'PureComponent',
                    'Fragment',
                    'Children',
                    'createElement',
                    'useLayoutEffect',
                    'useEffect',
                    'useContext',
                    'useMemo',
                    'useRef',
                    'useReducer',
                ],
                'node_modules/react-is/index.js': [
                    'isValidElementType',
                    'isContextConsumer',
                ],
                'node_modules/react-dom/index.js': ['unstable_batchedUpdates'],
            },
        }),
        replace({
            'process.NODE_ENV': '"production"',
            'window.__REDUX_DEVTOOLS_EXTENSION__': 'false',
        }),

        uglify(),
    ],
};
