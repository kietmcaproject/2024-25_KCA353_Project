package airlinemanagementsystem;

import javax.swing.*;
import java.awt.*;
import java.sql.*;
import net.proteanit.sql.DbUtils;

public class FlightInfo extends JFrame {

    public FlightInfo() {
        getContentPane().setBackground(Color.WHITE);
        setLayout(null);

        JTable table = new JTable();

        try {
            Conn conn = new Conn();

            // Execute the query
            ResultSet rs = conn.s.executeQuery("SELECT * FROM flight");

            // Use DbUtils to set the table model
            table.setModel(DbUtils.resultSetToTableModel(rs));

            // Close the ResultSet and Statement
            rs.close();
            conn.s.close();
        } catch (Exception e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(this, "Error loading flight information.", "Error", JOptionPane.ERROR_MESSAGE);
        }

        JScrollPane jsp = new JScrollPane(table);
        jsp.setBounds(0, 0, 800, 500);
        add(jsp);

        setSize(800, 500);
        setLocation(400, 200);
        setVisible(true);
    }

    public static void main(String[] args) {
        new FlightInfo();
    }
}
