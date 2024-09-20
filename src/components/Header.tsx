interface HeaderProps {
	userName?: string;
	onLogout?: () => void;
	loggedIn: boolean;
}

export default function Header({
	userName,
	onLogout,
	loggedIn,
}: HeaderProps): JSX.Element {
	return (
		<header className="mb-16 flex items-center justify-between rounded-lg bg-steel p-4 text-white shadow-md">
			<div className="flex items-center">
				<img src="/statify-white.svg" alt="Statify Logo" className="mr-4 h-8" />
				<h1 className="text-3xl font-semibold">Statify</h1>
			</div>
			{loggedIn && (
				<div className="flex items-center">
					<h3 className="mr-4 text-lg font-semibold">Welcome {userName}!</h3>
					<button
						onClick={onLogout}
						className="rounded-md bg-rose px-4 py-2 font-bold text-white transition-colors hover:bg-apricot hover:text-black"
					>
						Logout
					</button>
				</div>
			)}
		</header>
	);
}
