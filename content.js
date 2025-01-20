(function () {
  console.log("Westpac Credit Card Balance Spent running...");

  $(document).ready(function () {
    try {
      const creditLimit = 20000;

      const $creditCardTile = $('li[data-analytics-productgroupname="CreditCard"]');

      if ($creditCardTile.length) {
        $creditCardTile.find("dt.AvailableBalance").remove();

        const $availableBalanceElement = $creditCardTile.find(".AvailableBalance .available-balance");

        if ($availableBalanceElement.length) {
          const availableBalanceText = $availableBalanceElement.text().replace(/[^0-9.-]/g, "");
          const availableBalance = parseFloat(availableBalanceText);

          if (!isNaN(availableBalance)) {
            const spentAmount = creditLimit - availableBalance;
			
			  const formattedSpentAmount = spentAmount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
			
			  const formattedCreditLimitAmount = creditLimit.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });

            $availableBalanceElement.text(`Spent: $${formattedSpentAmount} of $${formattedCreditLimitAmount}`);
          } else {
            console.warn("Unable to parse available balance value.");
          }
        } else {
          console.warn("Available balance element not found in the credit card tile.");
        }
      } else {
        console.warn("Credit card tile not found.");
      }
    } catch (error) {
      console.error("Error modifying the balance:", error);
    }
  });
})();
