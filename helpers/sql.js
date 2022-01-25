const { BadRequestError } = require('../expressError');

/** This function takes input dataToUpdate from the request body and 
 *  input jsToSql object containing user table column names.
 * 
 *  The function will get the keys from dataToUpdate and
 *  map over them creating a SQL query for each key. It will
 *  use the jsToSql input to match the correct column name
 *  to the correct index placeholder.
 * 
 *  It will then return an object with the setCols value
 *  being a string of SQL column input name placeholders
 *  and the values value being an object of the request body values.
 * */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
	const keys = Object.keys(dataToUpdate);
	if (keys.length === 0) throw new BadRequestError('No data');

	// {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
	const cols = keys.map((colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`);

	return {
		setCols : cols.join(', '),
		values  : Object.values(dataToUpdate),
	};
}

module.exports = { sqlForPartialUpdate };
