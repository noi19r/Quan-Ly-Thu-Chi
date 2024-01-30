const { google } = require('googleapis')

const sheets = google.sheets('v4')
const serviceAccount = require('./credentials.json') // Thay đổi đường dẫn đến tệp JSON của tài khoản dịch vụ của bạn

// Khởi tạo Sheets API với tài khoản dịch vụ.
const sheetsApi = sheets.spreadsheets.values

// Cài đặt thông tin xác thực từ tệp JSON của tài khoản dịch vụ.
const jwtClient = new google.auth.JWT(serviceAccount.client_email, null, serviceAccount.private_key, ['https://www.googleapis.com/auth/spreadsheets'])

// Đảm bảo thông tin xác thực hợp lệ và sau đó thực hiện các hoạt động trên Sheets.
jwtClient.authorize((err) => {
	if (err) {
		console.error('Lỗi xác thực:', err)
		return
	}

	// Bây giờ bạn có thể sử dụng Sheets API để thao tác với Sheets.
	// Ví dụ: Đọc giá trị từ một ô
	sheetsApi.get(
		{
			spreadsheetId: 'YOUR_SPREADSHEET_ID',
			range: 'Sheet1!A1', // Thay đổi Sheet1!A1 thành phạm vi mà bạn muốn đọc
			auth: jwtClient,
		},
		(err, response) => {
			if (err) {
				console.error('Lỗi khi đọc dữ liệu:', err)
				return
			}
			console.log('Giá trị của ô A1:', response.data.values[0][0])
		}
	)
})
