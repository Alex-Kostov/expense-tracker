import app from './app';
import { config } from './config';

app.listen(config.port, () => {
	console.log('Server is up on port ' + config.port);
});