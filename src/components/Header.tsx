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
				<img
					src={`${import.meta.env.BASE_URL}statify-white.svg`}
					alt="Statify Logo"
					className="mr-2 h-6 lg:mr-4 lg:h-8"
				/>
				<h1 className="text-xl font-semibold lg:text-3xl">Statify</h1>
			</div>
			{loggedIn && (
				<div className="flex items-center">
					<h3 className="mr-4 text-sm font-semibold lg:text-lg">
						Welcome {userName}!
					</h3>
					<button
						onClick={onLogout}
						className="rounded-md bg-rose px-2 py-2 font-bold text-white shadow-lg transition-colors hover:bg-apricot hover:text-black lg:px-4"
					>
						Logout
					</button>
				</div>
			)}
		</header>
	);
}
