(function () {
  console.log("Westpac Credit Card Balance Modifier running...");

  $(document).ready(function () {
    try {
      const $creditCardTile = $('li[data-analytics-productgroupname="CreditCard"]');
      const $dataAttribute = $('[data-credit-card-identifier]');

      if ($creditCardTile.length === 0 && $dataAttribute.length === 0) {
        console.log("No matching credit card tile or data attribute found. Exiting...");
        return;
      }

      const creditLimit = 20000;

      if ($creditCardTile.length) {
        console.log("Modifying credit card tile...");
        modifyAvailableBalance($creditCardTile, creditLimit);
      }
	  
      if ($dataAttribute.length) {
        console.log("Modifying elements with 'data-credit-card-identifier'...");
        modifyAvailableBalance($dataAttribute, creditLimit);
      }
    } catch (error) {
      console.error("Error modifying the balance:", error);
    }
  });

  function modifyAvailableBalance($target, creditLimit) {
    $target.find("dt.AvailableBalance").remove();

    $target.find(".AvailableBalance .available-balance").each(function () {
      const $availableBalanceElement = $(this);

      const availableBalanceText = $availableBalanceElement.text().replace(/[^0-9.-]/g, "");
      const availableBalance = parseFloat(availableBalanceText);

      if (!isNaN(availableBalance)) {
        const spentAmount = creditLimit - availableBalance;

        const formattedSpentAmount = spentAmount.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        const formattedCreditLimit = creditLimit.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
		
		const formattedAvailableBalance = availableBalance.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        $availableBalanceElement.text(`Spent: $${formattedSpentAmount} out of $${formattedCreditLimit}`);
      } else {
        console.warn("Unable to parse available balance value.");
      }
    });
  }
})();
