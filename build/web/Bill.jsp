 <html lang="da">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Saathi | Bill </title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
        <style>
            body {
                font-family: 'Roboto', sans-serif;
                background-color: #f1f2f3;
                padding: 20px;
                margin: 0;
                user-select: none;
            }

            .material-symbols-rounded {
                font-variation-settings:
                    'FILL' 1,
                    'wght' 400,
                    'GRAD' 0,
                    'opsz' 24;
            }

            .header {
                display: flex;
                align-items: center;
            }

            .header span {
                margin-right: 10px;
                color: black;
            }

            .header:hover span,
            .header:hover h1 {
                color: grey;
            }

            .invoice {
                max-width: 800px;
                margin: auto;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
                padding: 40px;
            }

            h1 {
                margin: 0;
                color: black;
                cursor: pointer;
            }

            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
                background-color: #fff;
            }

            th,
            td {
                border-bottom: 1px solid #e0e0e0;
                padding: 16px;
                text-align: left;
            }

            th {
                background-color: #fff;
                color: black;
            }

            td {
                background-color: #fff;
                text-align: right;
            }

            .description-col {
                width: 35%;
            }

            .quantity-col,
            .price-col {
                width: 20%;
            }

            .total-col {
                width: 25%;
                text-align: right;
            }

            .totals {
                text-align: right;
                margin-top: 20px;
                position: relative;
            }

            .no-print {
                display: none;
            }

            @media print {
                .no-print {
                    display: none !important;
                }
            }

            input[type="text"],
            input[type="number"] {
                width: calc(100%);
                box-sizing: border-box;
                word-wrap: break-word;
                margin-top: 4px;
                margin-bottom: 4px;
                border: none;
                border-bottom: 2px solid #f5f5f5;
                outline: none;
                background-color: transparent;
            }

            .add-row-btn,
            .rmw-row-btn,
            .print-row-btn,
            button {
                display: inline-block;
                margin-top: 20px;
                float: left;
                padding: 14px 28px;
                position: left;
                margin-right: 5px;
                color: white;
                border: none;
                border-radius: 3px;
                cursor: pointer;
                font-size: 1em;
                transition: background-color 0.3s ease, transform 0.3s ease;
            }

            .add-row-btn {
                background-color: #189bcc;
            }

            .add-row-btn:hover {
                background-color: #4b4e6c;
            }

            .rmw-row-btn {
                background-color: #f68b70;
            }

            .rmw-row-btn:hover {
                background-color: #f35a33;
            }

            .print-row-btn {
                background-color: darkgrey;
            }

            .print-row-btn:hover {
                background-color: grey;
            }

            button {
                margin-top: 20px;
                display: block;
            }

            .footer {
                text-align: center;
                margin-top: 40px;
                font-size: 0.8em;
                color: #666;
            }

            .tax-field strong {
                margin-right: 10px;
                white-space: nowrap;
            }

            .tax-field input {
                width: 80px;
                margin-left: 5px;
            }

            .tax {
                display: flex;
            }
        </style>
    </head>

    <body>
        <div class="invoice">
            <div class="header">
              
                <h1 id="invoice-type" onclick="toggleInvoiceType()"><span>Saathi</span></h1>
            </div>
            <p>Saathi Pvt. Ltd.</p>
            <p>Address : Atarpura Chopla </p>
            <p>Hapur</p>
            <p>94562-54251</p>

            <table id="invoice-table">
                <thead>
                    <tr>
                        <th class="description-col">Beskrivelse</th>
                        <th class="quantity-col">Antal</th>
                        <th class="price-col">Pris</th>
                        <th class="total-col">Total</th>
                        <th class="no-print">Handlinger</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" placeholder="Beskrivelse"></td>
                        <td><input type="number" placeholder="Antal" oninput="calculateTotal(this)"></td>
                        <td><input type="number" placeholder="Pris" oninput="calculateTotal(this)"></td>
                        <td class="total">0,00 DKK</td>
                        <td class="no-print"><button class="material-icons remove-row" onclick="removeRow(this)">delete</button></td>
                    </tr>
                </tbody>
            </table>

            <div class="totals">
                <button class="add-row-btn no-print" onclick="addRow()"><span class="material-symbols-rounded">
                        docs_add_on
                    </span></button>
                <button class="rmw-row-btn no-print" onclick="removeLastRow()"><span class="material-symbols-rounded">
                        delete
                    </span></button>
                <button class="print-row-btn no-print" onclick="window.print()"><span class="material-symbols-rounded">
                        print
                    </span></button>

                <div class="tax-field">
                    <p><span style="vertical-align: middle; color: red; font-size: 2em;" class="material-symbols-rounded">
                            arrow_drop_up
                        </span><input type="number" id="tax" placeholder="Moms %" oninput="updateTotals()"></p>
                </div>

                <div class="tax-field">
                    <p><span style="vertical-align: middle; color: green; font-size: 2em;" class="material-symbols-rounded">
                            arrow_drop_down
                        </span><input type="number" id="discount" placeholder="Rabat %" oninput="updateTotals()"></p>
                </div>

                <p style="color: grey; font-size: 0.8em;"><strong>Subtotal:</strong> <span id="subtotal">0,00 DKK</span></p>
                <p style="color: grey; font-size: 0.8em;"><strong>Moms udgør:</strong> <span id="tax-amount">0,00 DKK</span></p>
                <p style="color: grey; font-size: 0.8em;"><strong>Besparelse:</strong> <span id="discount-amount">0,00 DKK</span></p>
                <p style="color: darkblue; font-size: 1.3em; font-weight: bold;"><strong>Total:</strong> <span id="total">0,00 DKK</span></p>
            </div>
        </div>

        <div class="footer">
            <p>Designed By : Jatin Gupta<span style= "vertical-align: middle; font-size: 1.3em;" class="material-symbols-rounded">

                </span> | 2024</p>
        </div>


    </body>

</html>
