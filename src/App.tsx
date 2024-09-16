import { Button } from 'antd';

import { loginUrl } from './spotify';

const App = () => (
	<div className="App">
		<h1>Hello World!</h1>
		<Button type="primary" href={loginUrl}>
			Log in to Spotify
		</Button>
	</div>
);

export default App;
