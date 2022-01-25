const { BadRequestError } = require('../expressError');
const { sqlForPartialUpdate } = require('./sql');

dataToUpdate = {
	firstName : 'Andre',
	lastName  : 'Kolber',
	password  : '123123',
	email     : 'email@email.com',
};

jsToSql = {
	firstName : 'first_name',
	lastName  : 'last_name',
	isAdmin   : 'is_admin',
};

describe('sqlForPartialUpdate', () => {
	test('returns object containing setCols and values', () => {
		const results = sqlForPartialUpdate(dataToUpdate, jsToSql);
		console.log(results);
		expect(results).toHaveProperty('setCols', expect.any(String));
		expect(results).toHaveProperty('values', expect.any(Array));
		expect(results.setCols).toEqual('"first_name"=$1, "last_name"=$2, "password"=$3, "email"=$4');
		expect(results.values).toEqual([ 'Andre', 'Kolber', '123123', 'email@email.com' ]);
	});

	test('throws BadRequestError if data is not provided', () => {
		expect(() => {
			sqlForPartialUpdate({}, jsToSql);
		}).toThrowError(BadRequestError);
	});
});
