module.exports = {
	dialect: 'postgres',
	host: 'localhost',
	username: 'postgres',
	password: 'docker',
	database: 'gymdb',
	define: {
		timestamps: true,
		underscored: true,
		underscoredAll: true,
	},
};
