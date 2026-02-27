/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'ios-blue': '#007AFF',
				'ios-bg': '#F2F2F7',
				'ios-red': '#FF3B30',
				'ios-green': '#34C759',
				'ios-darkCard': '#1C1C1E'
			},
			padding: {
				'safe-top': 'env(safe-area-inset-top)',
				'safe-bottom': 'env(safe-area-inset-bottom)'
			},
			animation: {
				'shake': 'shake 0.4s cubic-bezier(.36,.07,.19,.97) both',
			},
			keyframes: {
				shake: {
					'10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
					'20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
					'30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
					'40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
				}
			}
		}
	},
	plugins: []
};
