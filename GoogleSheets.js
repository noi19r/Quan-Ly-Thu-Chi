const { GoogleAuth } = require('google-auth-library')
const { google } = require('googleapis')
const fs = require('fs')
const auth = new GoogleAuth({
	keyFile: './credentials.json',
	scopes: 'https://www.googleapis.com/auth/spreadsheets',
})
const service = google.sheets({ version: 'v4', auth })

async function create(title) {
	const resource = {
		properties: {
			title,
		},
	}
	try {
		const spreadsheet = await service.spreadsheets.create({
			resource,
			fields: 'spreadsheetId',
		})
		console.log(`Spreadsheet ID: ${spreadsheet.data.spreadsheetId}`)

		return spreadsheet.data.spreadsheetId
	} catch (err) {
		// TODO (developer) - Handle exception

		throw err
	}
}

async function getValues(spreadsheetId, range) {
	try {
		const result = await service.spreadsheets.values.get({
			spreadsheetId,
			range,
		})
		const numRows = result.data.values ? result.data.values.length : 0
		console.log(`${numRows} rows retrieved.`)

		return result
	} catch (err) {
		// TODO (developer) - Handle exception
		throw err
	}
}

async function batchGetValues(spreadsheetId, _ranges) {
	let ranges = [
		// Range names ...
	]
	try {
		const result = await service.spreadsheets.values.batchGet({
			spreadsheetId,
			ranges,
		})
		console.log(`${result.data.valueRanges.length} ranges retrieved.`)
		return result
	} catch (err) {
		// TODO (developer) - Handle exception
		throw err
	}
}

async function batchUpdate(spreadsheetId, title, find, replacement) {
	const requests = []
	// Change the spreadsheet's title.
	requests.push({
		updateSpreadsheetProperties: {
			properties: {
				title,
			},
			fields: 'title',
		},
	})
	// Find and replace text.
	requests.push({
		findReplace: {
			find,
			replacement,
			allSheets: true,
		},
	})
	// Add additional requests (operations) ...
	const batchUpdateRequest = { requests }
	try {
		const response = await service.spreadsheets.batchUpdate({
			spreadsheetId,
			resource: batchUpdateRequest,
		})
		const findReplaceResponse = response.data.replies[1].findReplace
		console.log(`${findReplaceResponse.occurrencesChanged} replacements made.`)
		return response
	} catch (err) {
		// TODO (developer) - Handle exception
		throw err
	}
}
//create('abc')
getValues('19uKbuAnRvjU7pwTFdikh8Jhop_bc939Gpb4bRdFsm2M', 'Sheet1')
