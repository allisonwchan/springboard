describe("Testing accuracy of payment calculations", function() {
    beforeEach(function () {

        // initialization logic
        billAmtInput = 10;
        tipAmtInput = 1;
    });
  
    it('should add new row to payment info table', function () {
        submitPaymentInfo();

        //   expect(paymentTbody.rows[0].cells.length).toEqual(3);
        expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments['payment1'].billAmt).toEqual('10');
        expect(allPayments['payment1'].tipAmt).toEqual('1');
        expect(allPayments['payment1'].tipPercent).toEqual('10');
    });

    it('should not add new row to payment info if empty input', function() {
        billAmtInput.value = '';
        submitPaymentInfo();

        expect(Object.keys(allPayments).length).toEqual(0);
    })

    it('should add new row to payme')
  
    // testing if new table row added
    it('should add new row to table after appendPaymentTable()', function() {
        let payment = createCurPayment();
        allPayments['payment1'] = payment;
        appendPaymentTable(payment);

        let tableData = document.querySelectorAll('#paymentTable tbody tr td');

        updateServerTable();
    
        expect(tableData.length).toEqual(4);
        expect(tableData[0].innerText).toEqual('$10');
        expect(tableData[1].innerText).toEqual('$1');
        expect(tableData[2].innerText).toEqual('%10');
        expect(tableData[3].innerText).toEqual('X');
    })

    it('should create new payment', function() {
        let expectedPayment = {
            billAmt: '10',
            tipAmt: '1',
            tipPercent: 10
        }

        expect(createCurPayment().toEqual(expectedPayment));
    })

    it('should not create new payment with empty input', function() {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        let payment = createCurPayment();

        expect(payment).toEqual(undefined);
    })
  
    afterEach(function() {
        // teardown logic
        billAmtInput.value = '';
        tipAmtInput.value = '';
        paymentTbody.innerHTML = '';
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
        serverTbody.innerHTML = '';
        paymentId = 0;
        allPayments = {};
    });
  });
  