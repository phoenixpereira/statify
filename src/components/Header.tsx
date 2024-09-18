import { Button, Space } from 'antd';

interface HeaderProps {
	userName?: string;
	onLogout?: () => void;
	loggedIn: boolean;
}

const Header = ({ userName, onLogout, loggedIn }: HeaderProps) => {
	return (
		<header className="mb-16 flex items-center justify-between rounded-lg bg-steel p-4 text-white shadow-md">
			<div className="flex items-center">
				<img src="/statify-white.svg" alt="Statify Logo" className="mr-4 h-8" />
				<h1 className="text-3xl font-semibold">Statify</h1>
			</div>
			{loggedIn && (
				<div className="flex items-center">
					<h3 className="mr-4 text-lg font-semibold">Welcome {userName}!</h3>
					<Space>
						<Button
							type="primary"
							onClick={onLogout}
							className="bg-apricot font-bold text-black"
						>
							Logout
						</Button>
					</Space>
				</div>
			)}
		</header>
	);
};

export default Header;
