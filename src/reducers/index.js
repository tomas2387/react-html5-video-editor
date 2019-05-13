import { combineReducers } from 'redux';

import images from './images';
import crop_end from './crop_end';
import crop_start from './crop_start';

const rootReducer = combineReducers({ crop_end, crop_start, images });

export default rootReducer;
