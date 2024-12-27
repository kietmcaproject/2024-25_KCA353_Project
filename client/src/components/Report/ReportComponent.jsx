import React, { useState, useEffect, useRef } from 'react';
import { FileText, X } from 'lucide-react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ReportComponent = ({ setTransactionComponent }) => {
    const [transactionsData, setTransactionsData] = useState([]);
    const tableRef = useRef(null); // Reference to the table for PDF export

    useEffect(() => {
        axios.get('http://localhost:3000/transactions').then((response) => {
            setTransactionsData(response.data);
        });
    }, []);

    // Function to export the table to PDF
    const exportToPDF = () => {
        const input = tableRef.current;
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('l', 'mm', 'a4');
            const imgWidth = 297; // A4 width in mm
            const pageHeight = 210; // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('transaction_report.pdf');
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-max p-8 bg-white rounded-lg shadow-2xl">
                <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={() => setTransactionComponent(false)} aria-label="Close report"
                >
                    <X size={24} />
                </button>
                <div className="flex items-center mb-6">
                    <FileText className="mr-2 text-blue-600" />
                    <h2 className="text-2xl font-semibold text-gray-800">Transaction Report</h2>
                </div>
                <button
                    className="mb-4 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors duration-200"
                    onClick={exportToPDF}
                >
                    Export to PDF
                </button>
                <div ref={tableRef}>
                    <table className="max-w-4xl m-auto border-collapse bg-gray-50 rounded-lg overflow-hidden shadow-md">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="p-3 text-left border-b">Transaction ID</th>
                                <th className="p-3 text-left border-b">Date</th>
                                <th className="p-3 text-left border-b">Product ID</th>
                                <th className="p-3 text-left border-b">Request Owner</th>
                                <th className="p-3 text-left border-b">Product Owner</th>
                                <th className="p-3 text-right border-b">Amount</th>
                                <th className="p-3 text-left border-b">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionsData.map((transaction) => (
                                <tr key={transaction.id} className="hover:bg-blue-50 transition-colors duration-200">
                                    <td className="p-3 border-b">{transaction._id}</td>
                                    <td className="p-3 border-b">{new Date(transaction.createdAt).toLocaleDateString()}</td>
                                    <td className="p-3 border-b">{transaction.ProductID}</td>
                                    <td className="p-3 border-b">{transaction.ProductUploadedBy}</td>
                                    <td className="p-3 border-b">{transaction.ImageUploadedBy}</td>
                                    <td className="p-3 text-right border-b">Rs.{transaction.Amount.toFixed(2)}</td>
                                    <td className="p-3 border-b">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${transaction.TransactionStatus.toLowerCase() === 'success' ? ' text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
                                            {transaction.TransactionStatus}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReportComponent;