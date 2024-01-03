"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function SquarePaymentFlow() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create card payment object and attach to page
        CardPay(document.getElementById('card-container'), document.getElementById('card-button'));
        // Create Apple pay instance
        ApplePay(document.getElementById('apple-pay-button'));
        // Create Google pay instance
        GooglePay(document.getElementById('google-pay-button'));
        // Create ACH payment
        ACHPay(document.getElementById('ach-button'));
    });
}
window.payments = Square.payments(window.applicationId, window.locationId);
window.paymentFlowMessageEl = document.getElementById('payment-flow-message');
window.showSuccess = function (message) {
    window.paymentFlowMessageEl.classList.add('success');
    window.paymentFlowMessageEl.classList.remove('error');
    window.paymentFlowMessageEl.innerText = message;
};
window.showError = function (message) {
    window.paymentFlowMessageEl.classList.add('error');
    window.paymentFlowMessageEl.classList.remove('success');
    window.paymentFlowMessageEl.innerText = message;
};
window.createPayment = function (token) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataJsonString = JSON.stringify({
            token,
            idempotencyKey: window.idempotencyKey
        });
        try {
            const response = yield fetch('process-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: dataJsonString
            });
            const data = yield response.json();
            if (data.errors && data.errors.length > 0) {
                if (data.errors[0].detail) {
                    window.showError(data.errors[0].detail);
                }
                else {
                    window.showError('Payment Failed.');
                }
            }
            else {
                const result = JSON.parse(data);
                let obj = {
                    "id": result.id,
                    "createdAt": result.createdAt,
                    "updatedAt": result.updatedAt,
                    "amountMoney": result.amountMoney,
                    "totalMoney": result.totalMoney,
                    "approvedMoney": result.approvedMoney,
                    "status": result.status,
                    "sourceType": result.sourceType,
                    "orderId": result.orderId,
                    "receiptNumber": result.receiptNumber,
                    "receiptUrl": result.receiptUrl,
                };
                let obj1 = JSON.stringify(obj);
                window.location.href = `http://barbershop.com.s3-website-us-east-1.amazonaws.com/appointment/services?paymentReceivedData=${obj1}`;
                window.showSuccess('Payment Successful!');
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
};
// Hardcoded for testing purpose, only used for Apple Pay and Google Pay
window.getPaymentRequest = function () {
    return {
        countryCode: window.country,
        currencyCode: window.currency,
        lineItems: [
            { amount: '1.23', label: 'Cat', pending: false },
            { amount: '4.56', label: 'Dog', pending: false },
        ],
        requestBillingContact: false,
        requestShippingContact: true,
        shippingContact: {
            addressLines: ['123 Test St', ''],
            city: 'San Francisco',
            countryCode: 'US',
            email: 'test@test.com',
            familyName: 'Last Name',
            givenName: 'First Name',
            phone: '1111111111',
            postalCode: '94109',
            state: 'CA',
        },
        shippingOptions: [
            { amount: '0.00', id: 'FREE', label: 'Free' },
            { amount: '9.99', id: 'XP', label: 'Express' },
        ],
        total: { amount: '1.00', label: 'Total', pending: false },
    };
};
SquarePaymentFlow();
