export const RazorPayOptions = (price) => {
    var options = {
        "key": "rzp_test_Wruhg2TQ1hmIYU", // Enter the Key ID generated from the Dashboard
        "amount": (price * 100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Project Jugaad", //your business name
    };

    return options;
}