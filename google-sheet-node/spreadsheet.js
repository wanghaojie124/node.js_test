const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');

const creds = require('./client_secret.json');

async function accessSpreadsheet(){
	const doc = new GoogleSpreadsheet('1fv3v1RDvcDPAYV0kULINf2W7TiAT85RqYm4Oy6FD5KE');
	await promisify(doc.useServiceAccountAuth)(creds);
	const info = await promisify(doc.getInfo)();
	const sheet = info.worksheets[0];
	console.log('title: ${ sheet.title }, Rows: ${ sheet.rowcount }');
	

	const rows = {
		album_id: 1,
		username: 'John',
		title: 'Happy weekend'
	}
	await promisify(sheet.addrow)(row);
}

accessSpreadsheet();