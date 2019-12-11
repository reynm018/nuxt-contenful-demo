const middleware = {}

middleware['cache-management'] = require('../middleware/cache-management.js');
middleware['cache-management'] = middleware['cache-management'].default || middleware['cache-management']

export default middleware
