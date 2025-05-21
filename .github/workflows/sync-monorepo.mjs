import { sync } from 'monorepo-sync';

sync()
	.then(() => {
		console.log('Sync completed successfully');
		process.exit(0);
	})
	.catch((error) => {
		console.error('Error during sync:', error);
		process.exit(1);
	});