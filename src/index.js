import './index.html';
import './index.less';
import dva from 'dva';

// 1. Initialize
const app = dva();

// 2. Model   按需加载
//app.model(require('./models/users'));

// 3. Router
app.router(require('./router'));

// 4. Start
app.start('#root');
