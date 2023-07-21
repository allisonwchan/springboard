describe("Testing helper functions", function() {
    beforeEach(function() {
        billAmtInput.value = 10;
        tipAmtInput.value = 1;
        submitPaymentInfo();
    })

    it('should add tip amts using sumPaymentTotal()', function() {
        expect(sumPaymentTotal('tipAmt')).toEqual(1);

        billAmtInput.value = 50;
        tipAmtInput.value = 5;

        submitPaymentInfo();

        expect(sumPaymentTotal('tipAmt')).toEqual(6);
    })

    it('should get total bill using sumPaymentTotal()', function() {
        expect(sumPaymentTotal('billAmt')).toEqual(10);

        billAmtInput.value = 50;
        tipAmtInput.value = 5;

        submitPaymentInfo();

        expect(sumPaymentTotal('billAmt')).toEqual(60);
    })

    it('should get total tip percent using sumPaymentTotal()', function() {
        expect(sumPaymentTotal('tipPercent')).toEqual(10);

        billAmtInput.value = 50;
        tipAmtInput.value = 5;

        submitPaymentInfo();

        expect(sumPaymentTotal('tipPercent')).toEqual(20);
    })

    it('should calculate tip percent correctly with calculateTipPercent', function() {
        expect(calculateTipPercent(100, 23)).toEqual(23);
        expect(calculateTipPercent(111, 11)).toEqual(10);
    })

    it('should generate new td from value and append to tr on appendTd(tr, value)', function () {
        let newTr = document.createElement('tr');
    
        appendTd(newTr, 'test');
    
        expect(newTr.children.length).toEqual(1);
        expect(newTr.firstChild.innerHTML).toEqual('test');
      });
    
      it('should generate delete td and append to tr on appendDeleteBtn(tr, type)', function () {
        let newTr = document.createElement('tr');
    
        appendDeleteBtn(newTr);
    
        expect(newTr.children.length).toEqual(1);
        expect(newTr.firstChild.innerHTML).toEqual('X');
      });
    
      afterEach(function() {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        paymentTbody.innerHTML = '';
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
        serverTbody.innerHTML = '';
        allPayments = {};
        paymentId = 0;
      });
})