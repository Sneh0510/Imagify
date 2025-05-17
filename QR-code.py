import qrcode 

# Taking upi id as a input

upi_id = input("Enter your UPI ID = ")

# Defining the payment URL based on the UPI ID and the payment app
# You can modify these URLs based on the payment apps you want to support

phonepe_url = f'upi://pay?pa={upi_id}&pn=Recipient%20Name&mc=1234'
Google_pay_url = f'upi://pay?pa={upi_id}&pn=Recipient%20Name&mc=1234'
Paytm_url = f'upi://pay?pa={upi_id}&pn=Recipient%20Name&mc=1234'


# craete qr codes for each payment apps

phone_qr = qrcode.make(phonepe_url)
google_pay_qr = qrcode.make(Google_pay_url)
paytm_qr = qrcode.make(Paytm_url)

# save the qr - code to image
phone_qr.save('phonepe_qr.png')
google_pay_qr.save('google_qr.png')
paytm_qr.save('paytm_qr.png')

# Display the qr codes (install pillow library)

phone_qr.show()
paytm_qr.show()
google_pay_qr.show()

