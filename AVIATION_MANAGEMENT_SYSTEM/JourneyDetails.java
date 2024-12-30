package airlinemanagementsystem;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.sql.*;
import java.awt.event.*;
import net.proteanit.sql.DbUtils;

public class JourneyDetails extends JFrame implements ActionListener {
    private JTable table;
    private JTextField pnr;
    private JButton show;
    
    public JourneyDetails() {
        setTitle("Journey Details");
        getContentPane().setBackground(Color.WHITE);
        setLayout(new BorderLayout()); // Use BorderLayout
        
        // Panel for input and button
        JPanel inputPanel = new JPanel();
        inputPanel.setBackground(Color.WHITE);
        inputPanel.setLayout(new FlowLayout(FlowLayout.CENTER, 20, 10));
        
        JLabel lblpnr = new JLabel("PNR Details:");
        lblpnr.setFont(new Font("Tahoma", Font.PLAIN, 16));
        inputPanel.add(lblpnr);
        
        pnr = new JTextField(20); // Set preferred width
        inputPanel.add(pnr);
        
        show = new JButton("Show Details");
        show.setBackground(Color.BLACK);
        show.setForeground(Color.WHITE);
        show.addActionListener(this);
        inputPanel.add(show);
        
        add(inputPanel, BorderLayout.NORTH); // Add inputPanel to the top
        
        // Table for displaying details
        table = new JTable();
        table.setFillsViewportHeight(true);  // Ensures the table fills the viewport
        table.setEnabled(false); // Make JTable non-editable
        
        JScrollPane jsp = new JScrollPane(table);
        add(jsp, BorderLayout.CENTER); // Add JScrollPane with table to center
        
        // Frame settings
        setSize(1000, 650);
        setLocationRelativeTo(null); // Center on screen
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setVisible(true);
    }
    
    public void actionPerformed(ActionEvent ae) {
        try {
            Conn conn = new Conn();
            ResultSet rs = conn.s.executeQuery("SELECT * FROM reservation WHERE PNR = '" + pnr.getText() + "'");
            
            if (!rs.isBeforeFirst()) {
                JOptionPane.showMessageDialog(this, "No Information Found");
                table.setModel(new DefaultTableModel()); // Clear table if no data found
                return;
            }
            
            table.setModel(DbUtils.resultSetToTableModel(rs));
        } catch(Exception e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(this, "An error occurred while fetching details.");
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new JourneyDetails());
    }
}
